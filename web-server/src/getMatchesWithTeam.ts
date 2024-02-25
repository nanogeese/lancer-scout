import { prisma } from "./index";

// Gets all the matches for a given team in a given tournament
export async function getMatchesWithTeam(tournamentName: string, teamName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
          teamName: teamName,
          match: {tournament: {title: tournamentName}}
        }
      })
      
    return teamPerformances;
}