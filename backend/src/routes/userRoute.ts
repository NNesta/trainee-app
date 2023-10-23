import { Router } from "express";
import {
  getProfile,
  updateProfile,
  deleteUser,
  getUsers,
} from "../controllers/userController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, getUsers);
router.get("/my-profile", verifyJWT, getProfile);
router.patch("/my-profile", verifyJWT, updateProfile);
router.delete("/:userId", deleteUser);

export default router;
