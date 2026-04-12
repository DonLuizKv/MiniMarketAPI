import { App } from "./app";
import { Env } from "./config/env";

async function main() {
    const app = new App({
        port: Env.Global.PORT,
        origins: Env.Global.ORIGINS,
    });

    try {
        await app.load();
        app.start();
    } catch (error) {
        console.error("Error starting app:", error);
        process.exit(1);
    }
}

main();