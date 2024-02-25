import { JsonObject } from "@prisma/client/runtime/library";

import { prisma } from "./index";
export async function getSchemaAverages(tournamentName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
            match: {tournament: {title: tournamentName}}
        }
    })

    const jsonList = teamPerformances.map(e => e.jsonScoutInput as JsonObject);
    var getKeys = Object.keys(jsonList[0]); // Assumes all keys are the same
    const averages: Array<number> = [];

    for (let i = 0; i < getKeys.length; i++){
        // Check if type being checked is an integer or not
        var currentkey = getKeys[i];
        var currentCounter = 0;
        for (let j = 0; j < teamPerformances.length; j++) {
            currentCounter += teamPerformances[i].currentkey;
        }
        averages.push(currentCounter / teamPerformances.length)
    }

    return averages;
}


