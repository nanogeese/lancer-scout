import { prisma } from "./index";

// Gets all the team performances for a specific match
export async function getMatch(tournamentName: string, matchNumber: number) {
    const teamPerformances = await prisma.teamPerformance.findMany({
    where: {
      match: {tournament: {title: tournamentName}, matchNumber: matchNumber}
    }
  })
  return teamPerformances;
}