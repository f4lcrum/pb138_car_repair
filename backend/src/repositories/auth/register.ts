import { Result } from "@badrap/result";
import client from "../../client";
import { genericError } from "../common/types";
import type { RegisterData, RegisterResult } from "./types";
import argon2 from 'argon2';


const registerUser = async(data: RegisterData) : RegisterResult => {
    try {
        const { password, ...userData} = data;
        const hash = await argon2.hash(password);
        const user = await client.user.create({
            data: {
                ...userData,
                password: hash,
                createdAt: new Date(),
                isVerified: false,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            }
        });
        return Result.ok(user);
    } catch(e) {
        console.log(e);
        return genericError;
    }
}

export default registerUser;
