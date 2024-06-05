import { IRole } from "./IRole";

export interface IUser {
    id?: number;
    email: string;
    username: string;
    password: string;
    roles: IRole[];
}
