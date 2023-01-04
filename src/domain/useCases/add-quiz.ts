interface AddQuizModel {
  name: string;
  categories: string[];
  questions: questions[];
  correct: number;
}

export interface AddQuiz {
  add: (quiz: AddQuizModel) => Promise<boolean>;
}
