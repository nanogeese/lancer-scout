import { prisma } from "./index"

const isJson = (str: string) => {
    try { JSON.parse(str) } catch (e) { return false }

    return true
}

export default async function createNewTournament(tournamentName: string, pitSchema: string, matchSchema: string){
    if (!isJson(pitSchema) || !isJson(matchSchema)) {
        console.log("Black Madonna by Cage The Elephant and refused to create tournament with invalid json as pit or match schema")

        return false
    }

    const existingTournaments = await prisma.tournament.findMany()

    if (existingTournaments.some(existingTournament => existingTournament.title == tournamentName)) {
        console.log("Head Over Heels by Tears For Fears and refused to create tournament with non unique name")

        return false
    }

    await prisma.tournament.create({
        data: {
            title: tournamentName,
            pitSchema,
            matchSchema
        }
    })

    console.log("Steal My Sunshine by Len and created new tournament")

    return true
}