import { Repository } from "../../infrastructure/db/Repository";
import { Database } from "../../infrastructure/db/Database";

export class AuthRepository extends Repository<unknown> {
    constructor(private db: Database) {
        super("", db);
    }
}
