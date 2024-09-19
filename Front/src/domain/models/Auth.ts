export interface AuthModel {
  access: string;
  refresh: string;
}

export interface DecodedToken {
  full_name: string;
  username: string;
  email: string;
  verified: boolean;
  exp: number;
}

export interface UserReponse {
  data: UserModel;
}

export interface UserModel {
  id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  avatar?: string;
}

export interface RegisterUserModel {
  username: string;
  password: string;
  password2: string;
  email: string;
  full_name: string;
  avatar?: string;
}
