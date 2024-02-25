import React, { useState, useEffect } from "react"

import { createNewTournament, getTournaments } from "../scripts/api"

const TournamentPage = () => {
    const [currentTournamentName, setCurrentTournamentName] = useState("")

    const [existingTournaments, setExistingTournaments] = useState([])
    const [selectedExistingTournament, setSelectedExistingTournmanet] = useState("")

    const [tournamentNameInput, setTournamentNameInput] = useState("")
    const [pitSchemaInput, setPitSchemaInput] = useState("")
    const [matchSchemaInput, setMatchSchemaInput] = useState("")

    useEffect(() => {
        if (localStorage.getItem("tournamentName") == null) localStorage.setItem("tournamentName", "")

        setCurrentTournamentName(localStorage.getItem("tournamentName"))

        getTournaments(setExistingTournaments)
    }, [])

    const handleSelectExistingTournament = () => {
        if(confirm(`All entries submitted from now on will be listed under the tournament "${selectedExistingTournament}". Are you sure you want to continue?`)){
            localStorage.setItem("tournamentName", selectedExistingTournament)

            setCurrentTournamentName(selectedExistingTournament)
        }
    }

    const handleCreateNewTournament = () => {
        createNewTournament(tournamentNameInput, pitSchemaInput, matchSchemaInput, (success) => {
            if (!success) alert("A tournament already exists with this name.")
        })
    }

    const existingTournamentOptions = []
    existingTournaments.forEach((existingTournament, index) => {
        existingTournamentOptions.push(
            <option key={index}>
                {
                    existingTournament.title
                }
            </option>
        )
    })

    return (
        <React.Fragment>
            <h1>Welcome to the Tournament Page</h1>
            <div className={"standard-content-container"}>
                <div className={"tournament-info-container"}>
                    <label>
                        Current Tournament Name: <b>{ currentTournamentName || "[N/A]" }</b>
                    </label>
                    <hr style={{ width: "540px" }} />
                    <label>
                        Switch To Existing Tournament: <select onChange={(e) => setSelectedExistingTournmanet(e.target.value)}>
                            <option />
                            {
                                existingTournamentOptions
                            }
                        </select>
                    </label>
                    <div className={"button"} onClick={handleSelectExistingTournament}>Apply</div>
                </div>
                <div className={"tournament-info-container"}>
                    <label><b>Create New Tournament</b></label>
                    <hr style={{ width: "540px" }} />
                    <label>Tournament Name: <input type={"text"} value={tournamentNameInput} onChange={(e) => setTournamentNameInput(e.target.value)} /></label>
                    <label>Pit Schema: <input type={"text"} value={pitSchemaInput} onChange={(e) => setPitSchemaInput(e.target.value)} /></label>
                    <label>Match Schema: <input type={"text"} value={matchSchemaInput} onChange={(e) => setMatchSchemaInput(e.target.value)} /></label>
                    <div className={"button"} onClick={handleCreateNewTournament}>Create</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TournamentPage