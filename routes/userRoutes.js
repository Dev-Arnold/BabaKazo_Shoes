import express from "express";
import {
  updateUser,
  delUser,
  getUsers,
  userProfile,
  getAllStaff,
} from "../controllers/userController.js";
import authorize from "../middlewares/authorize.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Server error
 */
userRouter.get("/", authorize(["Admin"]), getUsers);

/**
 * @swagger
 * /user/staff:
 *   get:
 *     summary: Get all staff users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all staff users
 *       404:
 *         description: No staff found
 *       500:
 *         description: Server error
 */
userRouter.get("/staff", authorize(["Admin"]), getAllStaff);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.get("/:id", authorize(["Admin", "Staff", "User"]), userProfile);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               role: Staff
 *     responses:
 *       201:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.put("/:id", authorize(["Admin"]), updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.delete("/:id", authorize(["Admin"]), delUser);

export default userRouter;
