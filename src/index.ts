import { config } from "dotenv";
import Express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { serverENV } from "./config/env";
import { corsOptions } from "./config/config";
import { Logger } from "./infrastructure/logger/Logger";
import { Database } from "./infrastructure/db/Database";
import { WebSocketServer } from "./infrastructure/sockets/WebSocketServer";

config();

const app: Express.Application = Express();
const server: http.Server = http.createServer(app);

// const database: Database = Database.getInstance();
// database.Initialize();

const webSocket: WebSocketServer = WebSocketServer.getInstance(server);
webSocket.Initialize();
webSocket.getActiveUsers();

app.use(Logger.httpMiddleware());
// app.use(cors(corsOptions));
app.use(Express.json());
app.use(cookieParser());

app.use("/test", (req: Request, res: Response) => {
    res.send("holaaaaaaaaaaaa")
})

app.use("/", (req: Request, res: Response) => {
    res.send("Welcome to the MiniMarket API")
})

server.listen(serverENV.PORT, () => {
    Logger.info(`Server running on port ${serverENV.PORT}`);
});