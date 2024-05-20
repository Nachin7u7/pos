import { IRole } from "./IRole";

export interface IUser {
    id: number;
    username: string;
    password: string;
    roles: IRole[];
}
