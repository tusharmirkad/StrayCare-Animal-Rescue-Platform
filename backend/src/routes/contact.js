import express from "express";
import Contact from "../models/Contact.js";
import { requireAuth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";
import { sendMail } from "../utils/sendMail.js";

const router = express.Router();

// PUBLIC: Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    res.status(201).json({ message: "Message submitted successfully ✅" });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ message: "Failed to submit message" });
  }
});

// ADMIN: Get all contact messages
router.get("/admin/messages", requireAuth, requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// ADMIN: Mark message as read
router.patch("/admin/messages/:id/read", requireAuth, requireAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    console.error("Update message error:", error);
    res.status(500).json({ message: "Failed to update message" });
  }
});

// ADMIN: Delete message
router.delete("/admin/messages/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

// ADMIN: Reply to a contact message via email
router.post(
  "/admin/messages/:id/reply",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { subject, message: replyMessage } = req.body;
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ message: "Message not found" });

      const to = contact.email;

      const emailSubject = subject || `Re: ${contact.subject}`;
      const emailText = `${replyMessage}\n\n--- Original Message ---\nFrom: ${contact.name} <${contact.email}>\n\n${contact.message}`;

      const sendResult = await sendMail({ to, subject: emailSubject, text: emailText });

      // Optionally mark message as read after reply
      contact.status = "read";
      await contact.save();

      // If sendMail returned a preview URL (Ethereal), include it in the response for dev inspection
      const previewUrl = sendResult?.previewUrl;

      res.json({ message: "Reply sent", previewUrl });
    } catch (error) {
      console.error("Reply message error:", error);
      res.status(500).json({ message: "Failed to send reply" });
    }
  }
);

export default router;
