export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: Role;
  trackId?: string;
}

export enum Role {
  ChiefOwner = 'chief_owner',
  Mentor = 'mentor',
  Grader = 'grader',
  Intern = 'intern',
}