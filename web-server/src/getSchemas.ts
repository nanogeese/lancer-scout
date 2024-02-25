import { prisma } from "./index"

export async function getSchemas(tournamentName: string){
    const tournament = await prisma.tournament.findFirst({
        where: {
            title: tournamentName
        }
    })
    
    const schemas = tournament == undefined ? {
        pit: null,
        match: null
    } : {
        pit: JSON.parse(tournament.pitSchema),
        match: JSON.parse(tournament.matchSchema)
    }

    console.log("Vacation by the Go Go's and got schemas ", schemas)

    return schemas
}