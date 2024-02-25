import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";
import { prisma } from "./index";

export async function getTeamPerformanceField(field: string, tournamentName: string, matchNumber: number, teamName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           teamName: teamName,
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber}
        },
      })

      console.log("Hunting High and Low by Stratovarius and posts found ", teamPerformances);
      return getFieldArray(teamPerformances.map(e => e.jsonScoutInput as JsonObject), field);
}