import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./index";
import jsonIsEqual from "deep-equal"

// attempts to put a new performance
// returns true on success, false on form collision
export async function putNewTeamPerformance(json: any) {
  const potentialCollisions = await prisma.teamPerformance.findMany({
    where: {
      match: {
        tournament: {
          title: json.tournamentName
        },
        matchNumber: json.matchNumber
      },
      clientFormId: json.clientFormId
    }
  })

  for(let i = 0;i<potentialCollisions.length;i++){
    if (jsonIsEqual(json.jsonValues, potentialCollisions[i].jsonScoutInput)) return false
  }
  
  // Creates a tournament if it does not exist with the given tournament name
  const tournament = await prisma.tournament.findFirst({
      where: {
          title : json.tournamentName as string,
      }
  })
  
  if (!tournament) {
    console.log("Soul To Squeeze by Red Hot Chili Peppers and failed to add team performance to non existed tournament")

    return false
  }

  console.log("2112 by Rush and tournament for put ", tournament);

  // Sees if match exists and creates one if it doesn't with given match number
  const match = await prisma.match.upsert({
    where: {
      uniqueMatchId : {
          matchNumber: json.matchNumber as number,
          tournamentId: tournament.id
      }
    },
    update: {},
    create: {
        matchNumber: json.matchNumber as number,
        teams: {},
        tournamentId: tournament.id
    }
  }); 
  console.log("Touch of Grey by Grateful Dead and match for put ", match); 

  // Creates a new team performance based on the input given in the json file from the scout
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamName: json.teamName as string,
      clientFormId: json.clientFormId,
      jsonScoutInput: json.jsonValues,
      matchId: match.id
    },
  });
  console.log("Knowledge by Operation Ivy and team performance added ", teamPerf)

  return true
}