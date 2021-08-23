import {IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {BodyParams, Get, PathParams} from "@tsed/common";
import {User} from "./db/user/user";
import {isEmpty} from "@tsed/core";

@SocketService("/api/socket.io")
export class MySocketService {
    @Nsp nsp: SocketIO.Namespace;

    // @Nsp("/")
    // nspOther: SocketIO.Namespace; // communication between two namespace
    constructor(@IO private io: SocketIO.Server) {
    }

    $onNamespaceInit(nsp: SocketIO.Namespace) {
        nsp.send("i m ready");
    }

    /**
     * Triggered when a new client connects to the Namespace.
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        console.log("socket建立");
        socket.on("join-room", async (roomId, userId) => {
            socket.data.userId = userId;
            socket.data.roomId = roomId;
            socket.join(roomId);

            const sockets = await this.nsp.fetchSockets();
            const beforeUser = sockets.filter(item => item.data.roomId === roomId && item.data.userId !== userId).map(item => (item.data.userId));
            if (!isEmpty(beforeUser)) {
                // 获取之前的用户
                console.log("beforeUser", beforeUser);
                socket.emit("user-list", beforeUser);
            }


            console.log("广播", roomId, userId);
            socket.broadcast.to(roomId).emit("user-connected", userId);
            socket.on("disconnect", () => {
                socket.broadcast.to(roomId).emit("user-disconnected", userId);
            });
        });
        socket.on("leave-room", async (roomId, userId) => {
            socket.broadcast.to(roomId).emit("user-disconnected", userId);
        });
        socket.on("message", (data) => {
            console.log("收到消息", data);
            if (data === "how r u") {
                socket.send("i m fine, thank u, and u?");

                return;
            }
            socket.send("server received ur message: " + data);
        });
    }

    $onDisconnect(@Socket socket: SocketIO.Socket) {
        console.log("Disconnect");
    }

    /**
     * test ： 给所有连接用户发送
     */
    helloAll() {
        console.log(this.nsp);
        this.nsp.send("hi", "everyone!");
    }

    async getBeforeUsers() {
        const sockets = await this.nsp.fetchSockets();
        console.log(sockets[0].data.username); // "alice"

    }

}
