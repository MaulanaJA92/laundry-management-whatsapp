import { Router } from "express";

import { currentQr } from "../whatsapp/baileys.js";

const router = Router();

router.get("/qr", (req, res) => {
  res.json({
    qr: currentQr,
  });
});

export default router;