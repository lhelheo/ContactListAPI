import express from "express";
import { createContact, deleteContact, getContacts } from "../services/contact";

const router = express.Router();

const dataSource = "./data/list.txt";

router.post("/contact", async (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json({ error: "Name is required and should be at least 2 characters" });
    }

    await createContact(name);
    res.status(201).json({ contact: name }); 
});

router.get("/contacts", async (req, res) => {
    let list = await getContacts();
    res.json({ contacts: list });
});

router.delete("/contact", async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: "Name is required for delete" });
    }

    await deleteContact(name as string);
    res.json({ contact: name });
});

export default router;