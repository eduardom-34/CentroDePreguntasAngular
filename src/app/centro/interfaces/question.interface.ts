export interface Question {
  questionId:     number;
  content:        string;
  createdAt:      Date;
  isClosed:       boolean;
  questionUserId: number;
  firstName:      string;
  lastName:       string;
  userName:       string;
}
