import { Router } from "express";
import { asyncHandler } from "../../shared/utils";
import { UsersController } from "./users.controller";

export function createUsersRoutes(controller: UsersController) {
    const router = Router();

    router.get("/", asyncHandler(controller.getAll));
    router.get("/:id",  asyncHandler(controller.getById));
    router.post("/", asyncHandler(controller.create));
    router.put("/:id", asyncHandler(controller.update));
    router.patch("/:id", asyncHandler(controller.updateUniqueField));
    router.delete("/:id", asyncHandler(controller.delete));

    return router;
}