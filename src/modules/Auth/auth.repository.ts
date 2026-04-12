import { Repository } from "../../infrastructure/db/Repository";

export class AuthRepository extends Repository<unknown> {
    constructor() {
        super();
    }

    public async FindByEmail(email: string) {
        return ;
    }
}
