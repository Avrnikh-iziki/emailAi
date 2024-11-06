import { db } from "@/server/db";

interface WebhookData {
    email_addresses: { email_address: string }[] | undefined;
    first_name: string;
    last_name: string;
    image_url: string;
    id: string;
}

export const POST = async (req: Request) => {
    try {
        const { data }: { data: WebhookData } = await req.json();

        // Ensure email_addresses is not empty before accessing
        if (!data.email_addresses || data.email_addresses.length === 0) {
            return new Response("No email address provided", { status: 400 });
        }

        // Destructuring directly from data for cleaner code
        const { first_name, last_name, image_url, id } = data;
        const email = data.email_addresses[0]?.email_address; // or handle if needed
        if (!email) {
            return new Response("Invalid email address", { status: 400 });
        }
        // Creating user in the database
        await db.user.create({
            data: {
                emailAdress: email,
                firstName: first_name,
                lastName: last_name,
                imageUrl: image_url,
                id: id
            }
        });

        console.log("User created successfully");

        return new Response('Webhook received', { status: 200 });

    } catch (error) {
        console.error("Error processing the request:", error);
        return new Response("Failed to process webhook", { status: 500 });
    }
};