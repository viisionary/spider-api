import {Property} from "@tsed/schema";

export default class UserModel {
    @Property()
    _id: string;
    // id: string;
    // username: string;
    // password: string;

    @Property()
    token: string;
}

// @Configuration({
//     componentsScan: [
//         `${process.cwd()}/protocols/*.ts` // scan protocols directory
//     ],
//     passport: {
//         userInfoModel: CustomUserInfoModel
//     }
// });