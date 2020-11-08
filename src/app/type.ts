export interface ILogin {
    username: string;
    password: string;
};

export interface ILoginResult {
    message: string;
    token: string;
    status: string;
}

export interface IResponse {
    message: string;
    status: string;
}

export const SUCCESS  = "SUCCESS";
export const FAILURE = "FAILURE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface IRole {
    name: string;
}

export  interface IUser {
    username: string;
    email: string;
    roles: IRole[]
}

