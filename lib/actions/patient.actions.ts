"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
    try {

        console.log(user)

        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
    } catch (error: any) {

        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email]),
            ]);

            return documents?.users[0]
        }
    }
}