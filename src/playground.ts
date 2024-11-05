import { db } from './server/db'

await db.user.create({
    data: {
        emailAdress: "avrnikh@gmail.com",
        firstName: "najib",
        lastName: "iziki"
    }
})