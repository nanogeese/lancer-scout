import { prisma } from "./index";

export async function getMatchNumbers(tournamentName: string) {
    const matches = await prisma.match.findMany({
        where: {
            tournament: {title: tournamentName}
        }
    })

    const matchNumbers = matches.map((match) => match.matchNumber)

    console.log({ matchNumbers })

    return matchNumbers
}