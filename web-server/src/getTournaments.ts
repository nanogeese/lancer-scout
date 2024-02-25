import { prisma } from "./index"

export default async function getTournaments(){
    const tournaments = await prisma.tournament.findMany()

    console.log("Black Madonna by Cage the Elephant and got tournaments", tournaments)

    return tournaments
}