import express from "express";
import { nanoid } from "nanoid";
import EmailEvent from "../models/EmailEvent.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Create pixel ID
router.post("/create-pixel", async (req, res) => {
    try {
        const id = nanoid();
        const { username } = req.body;

        await EmailEvent.create({
            id,
            username,
            opened: false
        });

        res.json({ id });
    } catch (err) {
        console.error("Error creating pixel:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/track/:id.png", async (req, res) => {
    try {
        const id = req.params.id;

        await EmailEvent.findOneAndUpdate(
            { id },
            { opened: true, openedAt: new Date() }
        );

        // Return transparent 1x1 PNG
        const pixelPath = path.resolve("pixel.png");
        const pixel = fs.readFileSync(pixelPath);

        res.set("Content-Type", "image/png");
        res.set("Content-Length", pixel.length);
        return res.end(pixel);
    } catch (err) {
        console.error("Pixel tracking error:", err);
        res.status(500).end();
    }
});

export default router;
 