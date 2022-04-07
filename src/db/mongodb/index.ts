import {MongoClient} from "mongodb";
import {User} from "../user/user";

const uri = `mongodb+srv://visionary:${process.env.MONGODB_PASSWORD}@cluster0.hiwac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// OMXUudoNzDuyAl31CykYKxn4KqPJ9qMb9i6fqcaItPWCvB4IIqMD9qAigeuzWgp5
export const getUser: (userId: User["id"]) => Promise<User> = async () => {
    try {
        await client.connect();
        const database = client.db("auth");
        const users = database.collection("user");
        const query = {username: "visionary"};
        const options = {
            // sort matched documents in descending order by rating
            sort: {"imdb.rating": -1},
            // Include only the `title` and `imdb` fields in the returned document
            projection: {_id: 0, title: 1, imdb: 1},
        };

        return await users.findOne(query);
    } finally {
        await client.close();
    }
};
type createUserPayloadType = Pick<User, "username" | "password" | "phoneNumber" | "firstName" | "email" | "lastName">;

export const createUser: (payload: createUserPayloadType) => Promise<Pick<User, "id">> = async ({
                                                                                                    password,
                                                                                                    username,
                                                                                                    lastName,
                                                                                                    firstName
                                                                                                }) => {
    return {username: "1", id: "1", password: "2"};
};

type updateUserPayloadType = Pick<User, "username" | "avatar" | "email" | "firstName" | "lastName">;

export const updateUser: (userId: User["id"], {}: updateUserPayloadType) => Promise<User> = async (userId, {}) => {
    return {username: "1", id: "1", password: "2"};
};

export const getUserByAuth: (payload: Pick<User, "username" | "password">) => Promise<User> = async ({
                                                                                                         username,
                                                                                                         password
                                                                                                     }) => {
        try {
            await client.connect();
            const database = client.db("auth");
            const users = database.collection("user");
            const query = {username, password};

            return await users.findOne(query);
        } finally {
            await client.close();

        }
    }
;