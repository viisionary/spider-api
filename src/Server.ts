import {Configuration, Inject} from "@tsed/common";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-koa"; // /!\ keep this import
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import cors from "@koa/cors";
import "@tsed/ajv";
import "@tsed/swagger";
import {config, rootDir} from "./config";
import {IndexCtrl} from "./controllers/pages/IndexController";
import './filters/HttpExceptionFilter'
import {join} from "path";

const methodOverride = require("koa-override");

console.info(rootDir)

@Configuration({
    ...config,
    httpPort: "127.0.0.1:8083",
    address: 'adf',
    acceptMimes: ["application/json"],
    httpsPort: false, // CHANGE
    mount: {
        "/api": [
            `${rootDir}/controllers/**/*.ts`
        ],
        "/auth": [],
        "/": [IndexCtrl]
    },
    statics: {
        "/": [
            {
                root: `${join(rootDir, "..")}/public`,
                // ... statics options
            }
        ]
    },
    swagger: [
        {
            path: "/v3/docs",
            specVersion: "3.0.1"
        }
    ],
    socketIO: {
        // ... see configuration
        path: '/socket.io'
    },
    exclude: [
        "**/*.spec.ts"
    ]
})
export class Server {
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    $beforeRoutesInit(): void {
        this.app
            .use(cors())
            .use(compress())
            .use(methodOverride())
            .use(bodyParser())
    }
}
