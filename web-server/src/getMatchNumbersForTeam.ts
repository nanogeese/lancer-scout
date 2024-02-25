import { prisma } from "./index";

// Gets all of the match numbers of a certain team in a certain tournament
export async function getMatchNumbersForTeam(tournamentName: string, teamName: string) {

    const matches = await prisma.match.findMany({
        where: {
            teams: {
                some: {
                    teamName: teamName
                }
            },
            tournament: {
                title: tournamentName
            }
        }
    })

    const matchNumbers: Array<number> = matches.map(match => match.matchNumber);
    
    return matchNumbers;
}