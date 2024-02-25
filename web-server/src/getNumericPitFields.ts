import { JsonObject } from "@prisma/client/runtime/library";
import { prisma } from "./index";

export async function getNumericPitFields(tournamentName: string) {
    const teamPerformances = await prisma.pitScout.findMany({
        where: {
            tournament: {title: tournamentName}
        }
    })

    const formsJson = teamPerformances.map(form => form.jsonScoutInput)

    if (formsJson.length == 0) return []

    // get all keys in the first form where the value is numeric
    // makes the assumption that all forms within a given tournament have the same schema
    const numericalFields = Object.entries(formsJson[0] as JsonObject)
        .filter(([ key, value ]) => typeof value == "number")
        .map(([ key ]) => key)
        
    return numericalFields
}