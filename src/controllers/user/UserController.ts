import {BodyParams, Controller, Get, HeaderParams, Patch, PathParams, Post} from "@tsed/common";
import {Forbidden, Unauthorized} from "@tsed/exceptions";
import {createUser, getUser, getUserByAuth} from "../../db/user";
import {User} from "../../db/user/user";
import _ from "lodash";
import {isEmpty} from "@tsed/core";

type loginParams = Pick<User, 'password' | 'username'>
type signupParams = Pick<User, 'password' | 'username' | 'firstName' | 'lastName'> & { passcode: string }
type profileType = Omit<User, 'password' | 'phoneNumber'>;

@Controller("/user")
export class UserController {
    @Post("/login", )
    async login(@BodyParams("payload") payload: loginParams): Promise<profileType> {
        const {password, username} = payload;
        if (password === '123456') {
            throw (new Unauthorized('密码错误🙅'))
        }
        const users = await getUserByAuth({password, username})
        if (isEmpty(users)){
            throw (new Unauthorized('密码错误🙅'))
        }
       // @ts-ignore
        const user = _.mapValues(users.Items[0], 'S')
        return user
    }


    @Get("/:id")
    async get(
        @PathParams("id") params: { id: string }
    ): Promise<profileType> {
        const user = await getUser(params.id);
        return _.mapValues(user, 'S')
    }

    @Patch('/logout')
    logout(@HeaderParams("x-token") token: string): string {
        console.log("token", token);
        return token;
    }

    @Post('/signup')
    async signup(
        @BodyParams("payload") payload: signupParams,
    ): Promise<string> {
        const {passcode, password, username, firstName, lastName} = payload
        if (passcode !== 'ok') {
            throw (new Forbidden('passcode error'));
        }

        const user = await createUser({password, username, firstName, lastName})
        return user.id
    }

}
