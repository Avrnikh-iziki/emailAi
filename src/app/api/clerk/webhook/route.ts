// api/clerk/webhook
import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json()
    const email = data.email_addresses[0].email_address
    const first = data.first_name;
    const last = data.last_name;
    const image = data.image_url;
    const id = data.id

    await db.user.create({
        data: {
            emailAdress: email,
            firstName: first,
            lastName: last,
            imageUrl: image,
            id: id
        }
    })
    console.log("user created")
    return new Response('webhook reccevied', { status: 200 })
}