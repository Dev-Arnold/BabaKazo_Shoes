import e from "express";
const productRouter = e.Router();
import { upload } from "../config/cloudinaryConfig.js";
import {
  addProduct,
  delProduct,
  getAllProducts,
  getLatestProducts,
  getOneProduct,
  getProductByCategory,
  updateOneProduct,
} from "../controllers/productController.js";
import authorize from "../middlewares/authorize.js";

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs for managing products
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.post(
  "/",
  upload.array("images", 5),
  // authorize(["Admin", "Staff"]),
  addProduct
);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
productRouter.get("/", getAllProducts);

/**
 * @swagger
 * /product/latest:
 *   get:
 *     summary: Get latest products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of latest products
 *       500:
 *         description: Server error
 */
productRouter.get("/latest", getLatestProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
productRouter.get("/:id", getOneProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
productRouter.put("/:id", authorize(["Admin", "Staff"]), updateOneProduct);
// productRouter.put("/:id",  updateOneProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
// productRouter.delete("/:id",  delProduct);
productRouter.delete("/:id", authorize(["Admin"]), delProduct);


export default productRouter;
