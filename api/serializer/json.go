package serializer

import (
	"encoding/json"
	"fmt"

	"github.com/corecritter/vueCrossword/api/requests"
)

// Serializer .. Convert response structs to strings to be returned by the lambda function
type Serializer interface {
	Deserialize(*[]byte) (*requests.Request, error)
	Serialize(interface{}) (*[]byte, error)
}

// JSONSerializer ..
type JSONSerializer struct {
}

// Serialize ..
func (s *JSONSerializer) Serialize(response interface{}) (*[]byte, error) {
	b, err := json.Marshal(response)
	if err != nil {
		fmt.Println("Failed to marshal response : ", response)

		return nil, err
	}

	return &b, nil
}

// Deserialize ..
func (s *JSONSerializer) Deserialize(data *[]byte) (*requests.Request, error) {
	request := new(requests.Request)
	err := json.Unmarshal(*data, &request)

	if err != nil {
		return nil, err
	}

	return request, nil
}
