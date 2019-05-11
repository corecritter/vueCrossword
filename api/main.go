package main

import (
	"errors"
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type HandlerRequest struct {
	Type string `json:"type"`
	Data interface{} `json:"data"`
}

func main() {
	// engine := new(handlers.Engine)
	// seializer := new(JsonSerializer)

	handler := func(ctx context.Context, request events.APIGatewayProxyRequest) (*[]byte, error) {
		return nil, errors.New("not implemented")
	}

	lambda.Start(handler)
}
