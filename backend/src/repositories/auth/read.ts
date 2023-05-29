import { Result } from "@badrap/result";
import client from "../client";
import { genericError } from "../common/types";
import type { AuthReadData, AuthReadResult } from "./types";



const read = async(data: AuthReadData) : AuthReadResult => {
    try {
        const id = data.req.session.user!.id;
        const user = await client.user.findUnique({
            where: {
                id,
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
        });
        return Result.ok(user);
    } catch(e) {
      return genericError;
    }
}

export default read;