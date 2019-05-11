package requests

import (
	"github.com/corecritter/vueCrossword/api/models"
)


const SubmitGuessesRequestName = "submit-guesses-request"
const SubmitGuessesResponseName = "submit-guesses-response"

type SubmitGuessesRequest struct {
	Guesses []models.Guess `json:"guesses"`
	ShowAnswers bool `json:"show-answers"`
}

type SubmitGuessesResponse struct {
	Guesses []models.Guess `json:"guesses"`
}