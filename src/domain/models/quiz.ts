interface questions {
  title: string;
  answers: string[];
  id: string;
}
interface quiz {
  id: string;
  name: string;
  categories: string[];
  questions: questions[];
  correct: number;
}
