import http from "http";
import { Database } from "./infrastructure/db/Database";
import { WebSocketServer } from "./infrastructure/sockets/WebSocket.server";
import { ExpressServer } from "./infrastructure/express/express.server";

export async function loadDatabase() {
    const database = Database.getInstance();
    await database.Initialize();
    return database;
}

export async function loadExpress(database: Database, origins: string[]) {
    const express = new ExpressServer({
        origins: origins,
        db: database
    });
    express.setup();
    return express;
}

export async function loadHttpServer(express: ExpressServer) {
    const httpServer = http.createServer(express.getApp());
    return httpServer;
}

export async function loadWebSockets(httpServer: http.Server) {
    const webSockets = WebSocketServer.getInstance(httpServer);
    webSockets.Initialize();
    return webSockets;
}

