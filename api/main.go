package main

import (
	"github.com/corecritter/vueCrossword/api/application"
	"github.com/corecritter/vueCrossword/api/handlers"
	"github.com/corecritter/vueCrossword/api/serializer"
)

func main() {
	app := new(application.ServerlessApplication)
	app.Engine = new(handlers.Engine)
	app.Serializer = new(serializer.JSONSerializer)

	app.Start()
}