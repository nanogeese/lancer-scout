import { prisma } from "./index";

export async function getTeamOverviewAcrossPitScouting(tournamentName: string, teamName: string) {
    const pitScouts = await prisma.pitScout.findMany({
        where: {
            tournament: {
                title: tournamentName
            },
            teamName
        }
    })

    const formsJson = pitScouts.map(form => form.jsonScoutInput)
    
    return formsJson
}