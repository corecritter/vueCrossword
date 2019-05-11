package requests

type Request struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}
