package models

// Question ...
type Question struct {
	ID     int    `json:"id"`
	Value  string `json:"value"`
	Answer Answer `json:"answer"`
}
