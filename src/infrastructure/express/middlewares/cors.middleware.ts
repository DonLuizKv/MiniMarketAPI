import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "../../logger/Logger";
import { ErrorManager, Errors } from "../../../shared/errors/ErrorManager";

export const corsErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorManager) {
        return next(err);
    }

    if (err.message.includes("CORS")) {
        Logger.warn(`CORS blocked request from origin: ${req.headers.origin || 'unknown'}`);
        return next(Errors.FORBIDDEN(`CORS blocked request from origin: ${req.headers.origin || 'unknown'}`));
    }

    next(err);
};