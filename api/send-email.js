import nodemailer from 'nodemailer';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { email, type } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: "support@raw-tech.co.uk",
            pass: process.env.ZOHO_PASSWORD
        }
    });

    const mailOptions = {
        from: '"RAW-TECH Support" <support@raw-tech.co.uk>',
        to: "support@raw-tech.co.uk",
        subject: type === "subscribe" ? "New Subscription" : "New Contact Message",
        text: `New subscription from ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending email", error });
    }
}
