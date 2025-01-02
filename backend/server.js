import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import {connectDB} from "./data/db.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";
import orderRoutes from "./routes/order.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: "15mb"}));
app.use(cookieParser());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/orders", orderRoutes)

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);

    connectDB();
});

