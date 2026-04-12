import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
    constructor(
        private service: AuthService
    ) {}

    async getAll(req: Request, res: Response) {
        
    }

    async getById(req: Request, res: Response) {
        
    }

    async create(req: Request, res: Response) {
        
    }

    async update(req: Request, res: Response) {
        
    }

    async updateUniqueField(req: Request, res: Response) {
        
    }

    async delete(req: Request, res: Response) {
        
    }
}
