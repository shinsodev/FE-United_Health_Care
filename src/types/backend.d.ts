import { IUser } from "./next-auth";

export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        code: number | string;
        data?: T;
    }

    interface IUserBackend {
        access_token: string;
        refresh_token: string;
        user: IUser;
    }

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }
}
