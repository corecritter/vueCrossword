package requests

import "github.com/corecritter/vueCrossword/api/models"

const GetCategoriesRequestName = "get-categories-request"
const GetCategoriesResponseName = "get-categories-response"

type GetCategoriesRequest struct {
	ReturnQuestions *bool `json:"return-questions`
	NumQuestions    *int  `json:"num-questions"`
}

type GetCategoriesResponse struct {
	Categories []models.Category  `json:"items"`
	Questions  *[]models.Question `json:"questions"`
}
