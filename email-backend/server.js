require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: "cp-wc24.per01.ds.network", // Your SMTP host
    port: 465, // Use 465 for SSL, 587 for TLS
    secure: true, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email's pass
    },
});

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // user's email  
        to: "krizia.albero@shearwallsystems.com",
        subject: `New Contact Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email, // Keep replyTo field
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Message sent to your email!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
