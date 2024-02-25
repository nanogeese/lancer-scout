import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./index";
import jsonIsEqual from "deep-equal"

// attempts to put a new pit scout
// returns true on success, false on form collision
export async function putNewPitScout(json: any) {
  const potentialCollisions = await prisma.pitScout.findMany({
    where: {
        tournament: {
          title: json.tournamentName
        },
        clientFormId: json.clientFormId,
        teamName: json.teamName
    }
  });

  for(let i = 0;i<potentialCollisions.length;i++){
    if (jsonIsEqual(json.jsonValues, potentialCollisions[i].jsonScoutInput)) return false
  }

  const tournament = await prisma.tournament.findFirst({
    where: {
      title: json.tournamentName
    }
  })

  if (!tournament) return false

  const pitScout = await prisma.pitScout.create({
    data: {
        teamName: json.teamName,
        clientFormId: json.clientFormId,
        jsonScoutInput: json.jsonValues,
        tournamentId: tournament.id
    }
  })

  console.log("Slide Away by Oasis and added pit scout", pitScout)

  return true
}