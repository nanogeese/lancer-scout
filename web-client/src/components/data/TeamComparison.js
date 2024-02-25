import React, { useEffect, useState } from "react"
import MultiSegmentDropdownQuery from "../MultiSegmentDropdownQuery"
import { getTeamNamesAcrossMatchScouting, getTeamOverviewAcrossMatchScouting } from "../../scripts/api"
import { calculateMergedTeamAnalytics } from "../../scripts/analytics"

const TeamComparison = ({ state, setState }) => {
    // multiQuery is what teams are currently queried
    const { multiQuery } = state

    // the available options for the dropdown
    const [allQueryOptions, setAllQueryOptions] = useState([])
    const multiQueryOptions = {
        team1: allQueryOptions.filter(name => name != multiQuery.team2),
        team2: allQueryOptions.filter(name => name != multiQuery.team1)
    }

    // queried form data
    const [queriedData, setQueriedData] = useState({
        team1: [],
        team2: []
    })
    const teamAnalytics1 = calculateMergedTeamAnalytics(queriedData.team1)
    const teamAnalytics2 = calculateMergedTeamAnalytics(queriedData.team2)

    // update parent state when part of query changes, update dropdown options as needed
    const setMultiQuery = (value) => {
        const temp = {...state}

        temp.multiQuery = value

        setState(temp)
    }

    useEffect(() => {
        getTeamNamesAcrossMatchScouting((teamNames) => {
            setAllQueryOptions(teamNames)
        })
    }, [])

    useEffect(() => {
        if (multiQuery.team1 && multiQuery.team2) getTeamOverviewAcrossMatchScouting(multiQuery.team1, (teamOverview1) => {
            getTeamOverviewAcrossMatchScouting(multiQuery.team2, (teamOverview2) => {
                setQueriedData({
                    team1: teamOverview1,
                    team2: teamOverview2
                })
            })
        })
    }, [multiQuery])

    console.log({ queriedData })

    const entries = []
    if(multiQuery.team1 && multiQuery.team2){
        Object.keys(teamAnalytics1).forEach((key, index) => {
            entries.push(
                <div key={index}>
                    <h2>
                        {
                            key
                        }
                    </h2>
                    <hr />
                    <div>
                        <div>
                            {
                                JSON.stringify(teamAnalytics1[key])
                            }
                        </div>
                        <div className={"vertical-divider"} />
                        <div>
                            {
                                JSON.stringify(teamAnalytics2[key])
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
                <MultiSegmentDropdownQuery multiQuery={multiQuery} setMultiQuery={setMultiQuery} multiQueryOptions={multiQueryOptions} />
            </div>
            <h1>Team Comparison: { multiQuery.team1 || "[N/A]" } vs. { multiQuery.team2 || "[N/A]" }</h1>
            {
                multiQuery.team1 && multiQuery.team2 && (
                    <React.Fragment>
                        <hr />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {
                                entries
                            }
                        </div>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

export default TeamComparison