package models

// Guess .. 
type Guess struct {
	Answer Answer `json:"answer"`
	Question Question `json:"question"`
	IsRight bool `json:"is-right"`
}