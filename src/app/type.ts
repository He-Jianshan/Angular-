export interface ILogin {
    username: string;
    password: string;
};

export interface ILoginResult {
    message: string;
    token: string;
    status: string;
}