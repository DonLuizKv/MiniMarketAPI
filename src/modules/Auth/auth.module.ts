import { Router } from "express";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { createAuthRoutes } from "./auth.routes";
import { Database } from "../../infrastructure/db/Database";

interface AuthDependences {
    db: Database;
}
export class AuthModule {
    static create(dependences: AuthDependences): Router {
        const repository = new AuthRepository(dependences.db);
        const service = new AuthService(repository);
        const controller = new AuthController(service);

        const router = createAuthRoutes(controller);

        return router;
    }
}