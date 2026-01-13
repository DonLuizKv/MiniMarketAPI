import { Router } from "express";
import { UsersService } from "./users.service";

export class UsersController {
    public router = Router();
    constructor(private service: UsersService) {
        this.router.get("/", );
    }
}
