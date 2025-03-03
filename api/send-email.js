import nodemailer from 'nodemailer';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { name, email, message, type } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: "support@raw-tech.co.uk",
            pass: "YOUR_ZOHO_SMTP_PASSWORD"
        }
    });

    const mailOptions = {
        from: '"RAW-TECH Support" <support@raw-tech.co.uk>',
        to: "support@raw-tech.co.uk",
        subject: type === "contact" ? "New Contact Form Submission" : "New Subscriber",
        text: message ? `From: ${name} (${email})\n\n${message}` : `New subscription from ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending email", error });
    }
}
