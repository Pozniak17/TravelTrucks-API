import express from "express";

import camperRoutes from "./campers.js";

const router = express.Router();

router.use("/campers", camperRoutes);

export default router;
