"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.post("/register", authenticate_1.verifyJWT, auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.get("/trainees", authenticate_1.verifyJWT, auth_controller_1.get_trainees);
router.get("/coaches", authenticate_1.verifyJWT, auth_controller_1.get_coaches);
router.patch("/assign-coach/:id", authenticate_1.verifyJWT, auth_controller_1.assignCoach);
router.get("/profile", authenticate_1.verifyJWT, auth_controller_1.getUserProfile);
router.put("/profile", authenticate_1.verifyJWT, auth_controller_1.updateUserProfile);
router.delete('/users/:userId', auth_controller_1.deleteUser);
exports.default = router;
