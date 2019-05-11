package requests

import (
	"github.com/corecritter/vueCrossword/api/models"
)

const GetQuestionsRequestName = "get-questions-request"
const GetQuestionsResponseName = "get-questions-response"

type GetQuestionsRequest struct {
	CategoryID int `json:"category-id"`
	CategoryName string `json:"category-name"`
	QuestionCount int `json:"question-count"`
}

type GetQuestionsResponse struct {
	CategoryID int `json:"category-id"`
	CategoryName string `json:"category-name"`
	Questions []models.Question `json:"questions"`
}