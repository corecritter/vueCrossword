package main

import "errors"

// ISerializer ... Convert response structs to strings to be returned by the lambda function
type ISerializer interface {
	Serialize(interface{}) (string, error)
}

type JsonSerializer struct {
}

func (s *JsonSerializer) Serialize(response interface{}) (string, error) {
	//json.Marshal(response)
	return "", errors.New("not implementd")
}