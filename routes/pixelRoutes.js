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
        const { id } = req.params;

        console.log("📩 Pixel requested:", id);
        console.log("User-Agent:", req.headers["user-agent"]);

        const updated = await EmailEvent.findOneAndUpdate(
            { id },
            { opened: true, openedAt: new Date() },
            { new: true }
        );

        if (!updated) {
            console.warn("⚠️ No EmailEvent found for id:", id);
        } else {
            console.log("✅ Email marked as opened:", id);
        }

        res.set({
            "Content-Type": "image/png",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        });

        const pixelPath = path.resolve("pixel.png");
        const pixel = fs.readFileSync(pixelPath);

        return res.end(pixel);
    } catch (err) {
        console.error("Pixel tracking error:", err);
        res.status(500).end();
    }
});



router.get("/all", (req, res) => {
    const emails=EmailEvent.find({});
    comsole.log(emails);
    res.json(emails);
}
);

export default router;
 