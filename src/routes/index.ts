import express from "express";
import { readFile, writeFile } from "fs/promises";

const router = express.Router();

const dataSource = "./data/list.txt";

router.post("/contact", async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json({ error: "Name is required and should be at least 2 characters" });
    }

    let list: string[] = [];
    try {
        const data = await readFile(dataSource, { encoding: "utf-8" });
        list = data.split("\n");
    } catch (error) {}
    list.push(name);

    await writeFile(dataSource, list.join("\n"));
    res.status(201).json({ contact: name }); 
});

router.get("/contacts", async (req, res) => {
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, { encoding: "utf-8" });
        list = data.split("\n");
    } catch (error) {}

    res.json({ contacts: list });
});

router.delete("/contact", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required for delete" });
    }

    let list: string[] = [];
    try {
        const data = await readFile(dataSource, { encoding: "utf-8" });
        list = data.split("\n");
    } catch (error) {}

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase());
    await writeFile(dataSource, list.join("\n"));
    res.json({ contact: name });
});

export default router;