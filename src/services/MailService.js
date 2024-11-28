import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Ласкаво просимо до NearU!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
                Доброго дня! Ви отримали це повідомлення, оскільки на вашу електронну адресу було зареєстровано профіль у системі <strong>NearU</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
                Для активації вашого профілю, будь ласка, натисніть на кнопку нижче:
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${link}" style="display: inline-block; background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;">Активувати профіль</a>
            </div>
            <p style="font-size: 14px; line-height: 1.4; color: #777; text-align: center;">
                Якщо ви не реєструвалися в NearU, просто ігноруйте цей лист.
            </p>
            <p style="font-size: 12px; color: #aaa; text-align: center;">
                © 2024 NearU. Усі права захищені.
            </p>
        </div>
    `;

        await this.transporter.sendMail({
            from: `"NearU Team" <${process.env.SMTP_USER}>`,
            to: to,
            subject: 'Активація профілю NearU',
            html: htmlTemplate
        });
    }

}

export default new MailService();