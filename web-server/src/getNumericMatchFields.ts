import { JsonObject } from "@prisma/client/runtime/library";
import { prisma } from "./index";

export async function getNumericMatchFields(tournamentName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
            match: {tournament: {title: tournamentName}}
        }
    })

    const performancesJson = teamPerformances.map(performance => performance.jsonScoutInput)

    if (performancesJson.length == 0) return []

    // get all keys in the first form where the value is numeric
    // makes the assumption that all forms within a given tournament have the same schema
    const numericalFields = Object.entries(performancesJson[0] as JsonObject)
        .filter(([ key, value ]) => typeof value == "number")
        .map(([ key ]) => key)
        
    return numericalFields
}