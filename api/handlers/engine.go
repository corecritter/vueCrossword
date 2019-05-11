package handlers

import (
	"errors"

	"github.com/corecritter/vueCrossword/api/requests"
)

// Engine ... Handler of api requests
type Engine struct {
}

// Handle ... Handle incoming API requests, it is possible for the response to be an error response
func (engine *Engine) Handle(request *requests.Request) (response interface{}, err error) {
	return nil, errors.New("not implemented")
}
