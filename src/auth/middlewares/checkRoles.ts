import { NextFunction, Request, Response } from "express";
import { IRole } from '../entities/IRole';
import { IUser } from "../entities/IUser";


export const checkRoles = (requiredRoles: IRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {roles}:IUser = (req as any).user

        // Check if all the requiredRoles are in user's roles array, 
        // it compares the roles with their ids
        const rolesId = roles.map((role: IRole) => role.id)

        if(requiredRoles.every( (requiredRole:IRole) => rolesId.includes(requiredRole.id) ))
            next()
        else
            return res.status(403).json({
                message: "Does not have all the roles needed"
            })
    }
}

