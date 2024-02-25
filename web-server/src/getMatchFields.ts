import { prisma } from "./index";
import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";

export async function getMatchFields(field: string, tournamentName: string, matchNumber: number) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
          match: {tournament: {title: tournamentName}, matchNumber: matchNumber}
        }
      })
      console.log("Flight of Icarus by Iron Maiden and fields found ", getFieldArray(teamPerformances.map(e => e.jsonScoutInput as JsonObject), field).toString());
      return getFieldArray(teamPerformances.map(e => e.jsonScoutInput as JsonObject), field);
}