import { prisma } from "./index";

export async function getTeamOverviewAcrossMatchScouting(tournamentName: string, teamName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
            match: {tournament: {title: tournamentName}},
            teamName
        }
    })

    const performancesJson = teamPerformances.map(performance => performance.jsonScoutInput)
    
    return performancesJson
}