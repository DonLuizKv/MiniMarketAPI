import { Server as HTTPServer } from 'http';
import { Server, Socket } from "socket.io";
import { Logger } from '../logger/Logger';
import { ActiveUsers } from '../types/websocket';

export class WebSocketServer {
    private static instance: WebSocketServer;
    protected io: Server;
    private ActiveUsers: Map<string, Set<string>> = new Map<string, Set<string>>();

    private constructor(server: HTTPServer) {
        this.io = new Server(server, {
            cors: {
                origin: "*",
            },
        });
    }

    public static getInstance(io: HTTPServer) {
        if (!WebSocketServer.instance) {
            WebSocketServer.instance = new WebSocketServer(io);
        }
        return WebSocketServer.instance;
    }

    private registerUser(userUID: string, socketId: string) {
        if (!this.ActiveUsers.has(userUID)) {
            this.ActiveUsers.set(userUID, new Set());
        }

        this.ActiveUsers.get(userUID)!.add(socketId);
    }

    private removeUser(userUID: string, socketId: string) {
        const sockets = this.ActiveUsers.get(userUID);

        if (!sockets) return;

        sockets.delete(socketId);

        if (sockets.size === 0) {
            this.ActiveUsers.delete(userUID);
        }
    }

    getActiveUsers(): ActiveUsers[] {
        return Array.from(this.ActiveUsers.entries()).map(([userUID, sockets]) => ({
            userUID,
            sockets: Array.from(sockets.values()),
        }));
    }

    Initialize() {
        Logger.socket("WebSocketServer Server is running", { prefix: "\n" });

        this.io.on('connection', (socket: Socket) => {
            Logger.socket(`Client connected: ${socket.id}`);
            this.registerUser(socket.id, socket.id);

            socket.on('disconnect', () => {
                this.removeUser(socket.id, socket.id);
                Logger.socket(`Client disconnected: ${socket.id}`);
            });

            socket.on("error", (data: Error) => {
                console.log(data);
                socket.emit("error", data);
            });
        });
    }
}
