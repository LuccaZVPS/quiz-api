export interface AddQuiz {
  add: (quiz: quiz) => Promise<boolean>;
}
