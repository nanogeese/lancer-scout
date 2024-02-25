import { prisma } from "./index";

// Sees the amount of uploads for a given match number, team number, and tournament name
export async function getRecordsCount(tournamentName: string, matchNumber: number, teamName: string) {
    
    // Finds all of the team performances in the tournament for a specific team
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber},
           teamName: teamName,
        },
      })

    return teamPerformances.length;
}