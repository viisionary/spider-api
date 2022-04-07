import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import {UserController} from "./UserController";
import {Server} from "../../Server";

describe("UserController", () => {
    let request: SuperTest.SuperTest<SuperTest.Test>;

    beforeEach(PlatformTest.bootstrap(Server, {
        mount: {
            "/api": [UserController]
        }
    }));
    beforeEach(() => {
        request = SuperTest(PlatformTest.callback());
    });

    afterEach(PlatformTest.reset);
    //
    it("should call POST /user/login", async () => {
        const response = await request.post("/api/user/login").send({
            username: "visionary",
            password: "zxcvbnmm"
        }).expect(200);
        expect(response.text).toEqual("624e76bab51522ac282c3bc1");
    });

    it("should call POST /signup", async () => {
        const response = await request.post("/signup").expect(200);
        console.log(response);
    });
});
