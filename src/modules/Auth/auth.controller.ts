import { Request, Response, Router } from "express";
import { AuthService } from "./auth.service";
import { Time } from "../../infrastructure/utils/utils";

export class AuthController {
    public router = Router();

    constructor(private service: AuthService) {
        // set routes
        this.router.post("/login", this.Login);
        this.router.post("/register", this.Register);
        this.router.get("/verify", this.Verify);
        this.router.post("/logout", this.Logout);
    }

    private async Login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const { token, user } = await this.service.Login(email, password);

        res.cookie("session_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: Time.hour(24)
        })

        res.status(200).json({ success: true, token, user });
    }

    private async Register(req: Request, res: Response): Promise<void> {
        const { username, email, password, phone } = req.body;

        const result = await this.service.Register({ email, password, phone, username });

        res.status(200).json({ success: true, result });
    }

    private Verify(req: Request, res: Response): void {
        const token = req.cookies.session_token;

        const result = this.service.Verify(token);

        res.status(200).json({ success: true, message: "User verified successfully", user: result });
    }

    private Logout(req: Request, res: Response): void {
        res.clearCookie("session_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    }

}
