// asignar configuraciones del backend (cors, ratelimit, etc etc)

import { Time } from "../infrastructure/utils/utils";
import { serverENV } from "./env";

export const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || serverENV.ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export const rateLimitOptions = {
    windowMs: Time.minute(10), // 10 minutos
    max: 100,
    message: "Too many requests from this IP, please try again after 10 minutes",
};

export const authLimitOptions = {
    windowMs: Time.minute(5), // 5 minutos
    max: 5,
    message: "Too many login attempts from this IP, please try again after 5 minutes",
};