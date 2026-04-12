import fs from "fs";
import path from "path";

export function makeDomain(name: string) {
    try {
        const className = capitalize(name);
        const basePath = path.join(process.cwd(), "src/domains", name);

        console.log(`\x1b[36m🚀 Starting creation of domain: \x1b[33m${className}\x1b[0m`);

        if (fs.existsSync(basePath)) {
            console.error(`\x1b[31m❌ Error: The domain \x1b[33m${className}\x1b[31m already exists at: ${basePath}\x1b[0m`);
            process.exit(1);
        }

        console.log(`\x1b[34m📂 Creating directories...\x1b[0m`);
        fs.mkdirSync(path.join(basePath, "entities"), { recursive: true });
        fs.mkdirSync(path.join(basePath, "gateways"), { recursive: true });

        console.log(`\x1b[34m📄 Generating files...\x1b[0m`);

        fs.writeFileSync(
            path.join(basePath, "entities", `${name}.entity.ts`),
            `export class ${className}Entity {
    constructor(
        public id: string,
        // Add more properties here
    ) {}
}\n`
        );

        fs.writeFileSync(
            path.join(basePath, "gateways", `${name}.gateway.ts`),
            `import { ${className}Entity } from "../entities/${name}.entity";

export interface ${className}Gateway {
    getAll(): Promise<${className}Entity[]>;
    getById(id: string): Promise<${className}Entity | null>;
    create(data: Partial<${className}Entity>): Promise<${className}Entity>;
    update(id: string, data: Partial<${className}Entity>): Promise<${className}Entity>;
    delete(id: string): Promise<void>;
}\n`
        );

        console.log(`\x1b[32m✅ Domain "${name}" has been created successfully!\x1b[0m`);
        console.log(`\x1b[36m🎯 Ready to use in: \x1b[33msrc/domains/${name}\x1b[0m\n`);
    } catch (error) {
        console.error(`\x1b[31m❌ Unexpected error while creating domain "${name}":\x1b[0m`);
        console.error(error);
        process.exit(1);
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
