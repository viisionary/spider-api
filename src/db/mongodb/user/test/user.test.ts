import {getUser } from "../../index";

describe("user db", () => {
    test("增改查", async () => {
        const user = await getUser("123");
        console.log(user);
    });
});