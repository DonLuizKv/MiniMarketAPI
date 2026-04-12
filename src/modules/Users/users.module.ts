import { Router } from "express";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { createUsersRoutes } from "./users.routes";
import { Database } from "../../infrastructure/db/Database";

interface UsersDependences {
    db: Database;
}
export class UsersModule {
    static create(dependences: UsersDependences): Router {
        const repository = new UsersRepository(dependences.db);
        const service = new UsersService(repository);
        const controller = new UsersController(service);

        const router = createUsersRoutes(controller);

        return router;
    }
}