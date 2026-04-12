import { Express } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthModule {
    static Create(app: Express){
        // Create dependencies
        const Service = new AuthService();
        const Controller = new AuthController(Service);

        // Register routes
        app.use("/auth", Controller.router);
    }
}
