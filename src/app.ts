import http from "http";
import { loadDatabase, loadExpress, loadHttpServer, loadWebSockets } from "./loaders";
import { ExpressServer } from "./infrastructure/express/express.server";
import { Database } from "./infrastructure/db/Database";
import { WebSocketServer } from "./infrastructure/sockets/WebSocket.server";
import { Logger } from "./infrastructure/logger/Logger";

interface AppConfig {
    port: number;
    origins: string[];
}

export class App {
    private expressServer!: ExpressServer;
    private httpServer!: http.Server;
    private database!: Database;
    private sockets!: WebSocketServer;

    constructor(private config: AppConfig) { }

    public async load(): Promise<void> {
        this.database = await loadDatabase();
        this.expressServer = await loadExpress(this.database, this.config.origins);
        this.httpServer = await loadHttpServer(this.expressServer);
        this.sockets = await loadWebSockets(this.httpServer);
    }

    public start(): void {
        this.httpServer.listen(this.config.port, () => {
            Logger.info(`Server running on port ${this.config.port}`);
        });
    }

    // for tests
    public getHttpServer(): http.Server {
        return this.httpServer;
    }

}