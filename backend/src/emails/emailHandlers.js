import {resendClient, sender} from "../lib/resend.js";
import {createWelcomeEmailTemplate} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Real Time Messenger",
        html: createWelcomeEmailTemplate(name, clientUrl),
        }
    )
}