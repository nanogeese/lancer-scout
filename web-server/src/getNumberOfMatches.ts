import { prisma } from "./index";

export async function getNumberOfMatches(tournamentName: string) {

// Finds all of the team performances in a tournament
const teamPerformances = await prisma.teamPerformance.findMany({
    where: {
       match: { tournament: {title: tournamentName}}
    },
  })

  return teamPerformances.length;
}