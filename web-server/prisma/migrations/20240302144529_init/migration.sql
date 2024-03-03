-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pitSchema" TEXT NOT NULL,
    "matchSchema" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitScout" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "jsonScoutInput" JSONB NOT NULL,
    "clientFormId" INTEGER NOT NULL,
    "tournamentId" INTEGER,

    CONSTRAINT "PitScout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "tournamentId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPerformance" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "jsonScoutInput" JSONB NOT NULL,
    "clientFormId" INTEGER NOT NULL,
    "matchId" INTEGER,

    CONSTRAINT "TeamPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_title_key" ON "Tournament"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchNumber_tournamentId_key" ON "Match"("matchNumber", "tournamentId");

-- AddForeignKey
ALTER TABLE "PitScout" ADD CONSTRAINT "PitScout_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPerformance" ADD CONSTRAINT "TeamPerformance_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
