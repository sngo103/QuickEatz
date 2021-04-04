import { getSession } from 'next-auth/client';

export default async (req, res) => {
    const session = await getSession({req});

    if(session) {
        res.send({
            content: "You are now logged in! Secret Popcorn for you."
        })
    } else {
        res.send({
            content: "You are not logged in! No Secret Popcorn for you."
        })
    }
}