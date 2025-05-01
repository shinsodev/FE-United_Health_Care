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

// Named exports for module imports
export interface Doctor {
  id?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  fullName: string;
}

export interface Specialty {
  id?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  name: string;
  code: string;
  doctors?: Doctor[];
}

export interface SpecialtyFormData {
  name: string;
  code: string;
}