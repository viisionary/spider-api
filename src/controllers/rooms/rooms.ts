import {BodyParams, Controller, Get, PathParams} from "@tsed/common";
import {MySocketService} from "../../socket";
import {User} from "../../db/user/user";

@Controller("/rooms")
export class Rooms {
    constructor(private mySocketService: MySocketService) {
        // mySocketService = new MySocketService();

    }
    @Get("/:roomId")
    joinRoom(@BodyParams("payload") payload:Pick<User, 'id'>,@PathParams("roomId") roomId: string){
        console.log(payload, roomId)

    }

    // createRoom
    // leaveRoom
    // getParticipants

    @Get("/allo")
    allo() {
        console.log(123)
        this.mySocketService.helloAll();
        return "is sent";
    }
}
