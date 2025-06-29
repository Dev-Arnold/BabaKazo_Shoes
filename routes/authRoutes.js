import e from "express";
import {
  changePassword,
  forgot_password,
  logout,
  reset_password,
  signin,
  signup,
} from "../controllers/authController.js";
import authorize from "../middlewares/authorize.js";
import User from "../models/User.js";

const authRouter = e.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
authRouter.post("/", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: hassan@gmail.com
 *               password:
 *                 type: string
 *                 example: hassan
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

authRouter.post("/login", signin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post("/logout", logout);

/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Check if user is logged in
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User is logged in
 *       403:
 *         description: Not authorized
 */
authRouter.get(
  "/check",
  authorize(["Admin", "Staff", "User"]),
  (req, res) => {
    res.json({
      loggedIn: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 */
authRouter.post("/forgot-password", forgot_password);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
authRouter.post("/reset-password/:token", reset_password);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password (must be logged in)
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       401:
 *         description: Unauthorized
 */
authRouter.post(
  "/change-password",
  authorize(["Admin", "Staff", "User"]),
  changePassword
);

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Get admin info
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin data
 *       403:
 *         description: Access denied
 *       404:
 *         description: Admin not found
 */
authRouter.get("/admin", authorize(["Admin"]), async (req, res) => {
  const admin = await User.findById(req.user.id).select("-password");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json(admin);
});

export default authRouter;
