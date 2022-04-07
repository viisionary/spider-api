import {BodyParams, Controller, Get, HeaderParams, Patch, PathParams, Post} from "@tsed/common";
import {Forbidden, Unauthorized} from "@tsed/exceptions";
import {User} from "../../db/user/user";
import {isEmpty} from "@tsed/core";
import {createUser, getUser, getUserByAuth} from "../../db/mongodb";

type loginParams = Pick<User, "password" | "username">;
type signupParams = Pick<User, "password" | "username" | "firstName" | "lastName"> & { passcode: string };
type profileType = Omit<User, "password" | "phoneNumber">;

@Controller("/user")
export class UserController {
    @Post("/login")
    async login(@BodyParams("password") password: string,
                @BodyParams("username") username: string): Promise<string|undefined> {

        const user = await getUserByAuth({password, username});
        // @ts-ignore
        if (isEmpty(user)) {
            throw (new Unauthorized("密码错误🙅"));
        }
        console.log(user);

        return user._id;
    }


    @Get("/:id")
    async get(
        @PathParams("id") params: { id: string }
    ): Promise<profileType> {
        return await getUser(params.id);
    }

    @Patch("/logout")
    logout(@HeaderParams("x-token") token: string): string {
        console.log("token", token);

        return token;
    }

    @Post("/signup")
    async signup(
        @BodyParams("payload") payload: signupParams,
    ): Promise<string> {
        const {passcode, password, username, firstName, lastName} = payload;
        if (passcode !== "ok") {
            throw (new Forbidden("passcode error"));
        }

        const user = await createUser({password, username, firstName, lastName});

        return user.id;
    }

}
