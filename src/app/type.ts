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

export enum IStatus {
    SUCCESS,
    FAILURE,
}

export interface IRole {
    name: string;
}

export  interface IUser {
    username: string;
    email: string;
    roles: IRole[]
}

