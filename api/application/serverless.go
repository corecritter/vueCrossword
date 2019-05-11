package application

import (
	"github.com/corecritter/vueCrossword/api/handlers"
	"github.com/corecritter/vueCrossword/api/serializer"

	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// ServerlessApplication .. An abstraction that allows the application to respond to events when running in the AWS lambda execution context
type ServerlessApplication struct {
	Engine     *handlers.Engine
	Serializer serializer.Serializer
}

// Start .. Run the application, nevers returns
func (app *ServerlessApplication) Start() {
	lambda.Start(app.handler)
}

func (app *ServerlessApplication) handler(ctx context.Context, request events.APIGatewayProxyRequest) *events.APIGatewayProxyResponse {
	if app.Serializer == nil {
		response := new(events.APIGatewayProxyResponse)
		response.StatusCode = 500
		return response
	}

	serializer := app.Serializer
	bodyBytes := []byte(request.Body)
	requestObj, err := serializer.Deserialize(&bodyBytes)
	if err != nil {
		log.Println("could not parse request object")
		response := new(events.APIGatewayProxyResponse)
		response.StatusCode = 400
		return response
	}

	responseObj, err := app.Engine.Handle(requestObj)
	if err != nil {
		response := new(events.APIGatewayProxyResponse)
		response.StatusCode = 500
		return response
	}

	responseData, err := serializer.Serialize(responseObj)
	if err != nil {
		log.Println("could not serialize response object")
		response := new(events.APIGatewayProxyResponse)
		response.StatusCode = 500
		return response
	}

	response := new(events.APIGatewayProxyResponse)
	response.StatusCode = 200
	response.Body = string(*responseData)

	return response
}
