export type SurveyAnswers = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  date: Date
  question: string
  answers: SurveyAnswers[]
}
