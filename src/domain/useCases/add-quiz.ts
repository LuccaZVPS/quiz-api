interface AddQuizModel {
  name: string;
  categories: string[];
  questions: addQuizQuestions[];
  correct: number;
}
interface addQuizQuestions {
  title: string;
  answers: string[];
}
export interface AddQuiz {
  add: (quiz: AddQuizModel) => Promise<boolean>;
}
