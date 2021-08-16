import {IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {BodyParams, Get, PathParams} from "@tsed/common";
import {User} from "./db/user/user";

@SocketService("/api/socket.io")
export class MySocketService {
    @Nsp nsp: SocketIO.Namespace;

    // @Nsp("/")
    // nspOther: SocketIO.Namespace; // communication between two namespace
    constructor(@IO private io: SocketIO.Server) {
    }

    $onNamespaceInit(nsp: SocketIO.Namespace) {
        nsp.send('i m ready')
    }

    /**
     * Triggered when a new client connects to the Namespace.
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        socket.on('join-room', (roomId, userId) => {
            console.log('room', socket.rooms);
            const beforeUser = {};
            socket.broadcast.to(roomId).emit('user-connected', userId)
            socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected', userId)
            })
        });
        socket.on("message", (data) => {
            if (data === 'how r u') {
                socket.send("i m fine, thank u, and u?");
                return;
            }
            socket.send('server received ur message: ' + data);
        });
    }

    $onDisconnect(@Socket socket: SocketIO.Socket) {
        console.log('Disconnect')
    }

    /**
     * test ： 给所有连接用户发送
     */
    helloAll() {
        console.log(this.nsp)
        this.nsp.send("hi", "everyone!");
    }

}
