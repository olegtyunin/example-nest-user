export interface CreateBaseUserInterface {
  email: string;
}

export interface CreateUserInterface extends CreateBaseUserInterface {
  password: string;
}
