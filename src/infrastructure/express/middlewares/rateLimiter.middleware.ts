import rateLimit, { RateLimiterMemory } from "rate-limiter-flexible";
import { Request } from "express";
import { Time } from "../../utils/utils";

// cuando termine de entender redis y termine de sentar la base del proyecto
// hago este rate limit

// export const GlobalLimiter = rateLimit({
//     windowMs: Time.minute(10), // min de tiempo para hacer peticiones
//     max: 10, // numero de peticiones para hacer en ese tiempo de arriba
//     message: { error: "Too many requests, please try again later." },
//     standardHeaders: true,
//     legacyHeaders: false,
//     skip: (req: Request) => req.path === "/auth/verify",
// });

// export const AuthLimiter = rateLimit({
//     windowMs: Time.minute(10),
//     max: 10,
//     message: { error: "Too many authentications, please try again later." },
//     standardHeaders: true,
//     legacyHeaders: false,
//     skip: (req: Request) => req.path === "/auth/verify",
// });

const rateLimiter = new RateLimiterMemory({
    points: 10,      // número de requests
    duration: 60     // por 60 segundos
});