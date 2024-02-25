import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";
import { prisma } from "./index";

// Given a field, it returns an array of the values for that field
export async function getTeamFields(field: string, tournamentName: string, teamName: string) {
  const teamPerformances = await prisma.teamPerformance.findMany({
    where: {
      teamName: teamName,
      match: {tournament: {title: tournamentName}}
    }
  })
  console.log("Fall Into Oblivion by Silent Force and posts found ", teamPerformances);
  return getFieldArray(teamPerformances.map(e => e.jsonScoutInput as JsonObject), field);
}