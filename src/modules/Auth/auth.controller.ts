import { Router } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
    public router = Router();
    constructor(private service: AuthService) {
        this.router.get("/", );
    }
}
