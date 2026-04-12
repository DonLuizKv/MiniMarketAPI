import { AuthRepository } from "./auth.repository";

export class AuthService {

    constructor(
        private repository: AuthRepository = new AuthRepository()
    ) { }

    public async Login(email: string, password: string): Promise<{ token: string, user: string }> {
        return {
            token: "token",
            user: "user"
        }
    }

    public async Register(data: any) {
        return "holaaa";
    }

    public async Verify(token: string) {
        return "holaaa";
    }
}
