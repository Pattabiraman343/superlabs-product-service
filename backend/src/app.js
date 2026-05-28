import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

import { swaggerUi, swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});

app.use("/api/products", productRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;