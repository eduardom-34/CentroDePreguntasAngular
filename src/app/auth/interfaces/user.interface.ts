export interface User {
  userId:       number;
  firstName:    string;
  lastName:     string;
  userName:     string;
  passwordHash: string;
  passwordSalt: string;
}
