import fs from "fs";
import path from "path";

export function makeModule(name: string) {
    try {
        const className = capitalize(name);
        const basePath = path.join(process.cwd(), "src/modules", className);

        console.log(`\x1b[36mStarting creation of module: \x1b[33m${className}\x1b[0m`);

        if (fs.existsSync(basePath)) {
            console.error(`\x1b[31mError: The module \x1b[33m${className}\x1b[31m already exists.\x1b[0m`);
            process.exit(1);
        }

        console.log(`\x1b[34mCreating directories...\x1b[0m`);
        fs.mkdirSync(basePath, { recursive: true });

        console.log(`\x1b[34mGenerating files...\x1b[0m`);

        fs.writeFileSync(
            path.join(basePath, `${name}.module.ts`),
            `import { Router } from "express";
import { ${className}Repository } from "./${name}.repository";
import { ${className}Service } from "./${name}.service";
import { ${className}Controller } from "./${name}.controller";
import { create${className}Routes } from "./${name}.routes";
import { Database } from "../../infrastructure/db/Database";\n
interface ${className}Dependences {
    db: Database;
}
export class ${className}Module {
    static create(dependences: ${className}Dependences): Router {
        const repository = new ${className}Repository(dependences.db);
        const service = new ${className}Service(repository);
        const controller = new ${className}Controller(service);

        const router = create${className}Routes(controller);

        return router;
    }
}`
        );

        fs.writeFileSync(
            path.join(basePath, `${name}.routes.ts`),
            `import { Router } from "express";
import { asyncHandler } from "../../shared/utils";
import { ${className}Controller } from "./${name}.controller";\n
export function create${className}Routes(controller: ${className}Controller) {
    const router = Router();

    router.get("/", asyncHandler(controller.getAll));
    router.get("/:id",  asyncHandler(controller.getById));
    router.post("/", asyncHandler(controller.create));
    router.put("/:id", asyncHandler(controller.update));
    router.patch("/:id", asyncHandler(controller.updateUniqueField));
    router.delete("/:id", asyncHandler(controller.delete));

    return router;
}`
        );

        fs.writeFileSync(
            path.join(basePath, `${name}.service.ts`),
            `import { ${className}Repository } from "./${name}.repository";\n
export class ${className}Service {
    constructor(
        private repository: ${className}Repository
    ) {}
}
\n`
        );

        fs.writeFileSync(
            path.join(basePath, `${name}.repository.ts`),
            `import { Repository } from "../../infrastructure/db/Repository";
import { Database } from "../../infrastructure/db/Database";\n
export class ${className}Repository extends Repository<unknown> {
    constructor(private db: Database) {
        super("", db);
    }
}\n`
        );

        fs.writeFileSync(
            path.join(basePath, `${name}.controller.ts`),
            `import { Request, Response } from "express";
import { ${className}Service } from "./${name}.service";\n
export class ${className}Controller {
    constructor(
        private service: ${className}Service
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
}\n`
        );

        console.log(`\x1b[32mModule "${name}" has been created successfully!\x1b[0m`);
        console.log(`\x1b[36mReady to use in: \x1b[33msrc/modules/${className}\x1b[0m\n`);
    } catch (error) {
        console.error(`\x1b[31mUnexpected error while creating module "${name}":\x1b[0m`);
        console.error(error);
        process.exit(1);
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}