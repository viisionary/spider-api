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
    // it("should call POST /api/login", async () => {
    //     console.log(123)
    //     const response = await request.post("/api/login").expect(200);
    //
    //     console.log(response)
    //     expect(response.text).toEqual("hello");
    // });
    it('should call POST /signup', async function () {
            const response = await request.post('/signup').expect(200);
            console.log(response)
    });
});
