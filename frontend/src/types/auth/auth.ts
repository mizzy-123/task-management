import { Session } from "next-auth";

export interface ILoginResponse {
  code: number;
  message: string;
  data: {
    username: string;
    email: string;
    name: string;
    access_token: string;
  };
}

export interface IRegisterResponse {
  code: number;
  message: string;
  data: {
    username: string;
    name: string;
    email: string;
  };
}

// Interface untuk objek di dalam array "error"
export interface IRegisterFieldError {
  field: string;
  message: string;
}

// Interface untuk respons utama
export interface IRegisterErrorResponse {
  code: number;
  message: string;
  error: IRegisterFieldError[];
}

export interface SessionExtended extends Session {
  accessToken?: string;
}
