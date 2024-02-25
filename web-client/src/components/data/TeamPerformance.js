import React, { useEffect, useState } from "react"

import MultiSegmentDropdownQuery from "../MultiSegmentDropdownQuery"
import SpiderChart from "../SpiderChart"
import ToggleablesList from "../ToggleablesList"
import QualitativeData from "../QualitativeData"
import { getMatchNumbers, getMaximumsAcrossMatchScouting, getRecordsCount, getTeamPerformance, getTeamsInMatchNumber, getTeamNamesAcrossMatchScouting, getMatchNumbersWithTeam } from "../../scripts/api"

const TeamPerformance = ({ state, setState }) => {
    // multiQuery is what team is currently queried
    // toggleables is what data is displayed on the spider chart 
    const { multiQuery, toggleables } = state

    // the available options for the dropdown
    // updates in direction on any mutations
    const [multiQueryOptions, setMultiQueryOptions] = useState({
        team: [],
        match: [],
        record: []
    })

    console.log({ multiQuery, multiQueryOptions })

    // queried form data
    const [queriedData, setQueriedData] = useState([])
    const numericQueriedData = queriedData.filter((entry) => typeof entry.value == "number")
    const nonNumericQueriedData = queriedData.filter((entry) => typeof entry.value != "number")

    // global max values in numerical fields which are used to normalize spider chart data
    const [axisMaximums, setAxisMaximums] = useState({})
    
    // on start retrieve these maximums
    useEffect(() => {
        getMaximumsAcrossMatchScouting((maximums) => {
            setAxisMaximums(maximums)
        })
    }, [])

    // on start or multi query change fetch query options
    useEffect(() => {
        const setStates = ({ teamNames, matchNumbers, recordsCount }) => {
            const recordNumbers = (new Array(recordsCount).fill()).map((_, i) => i)

            if (
                multiQuery.team && multiQuery.match && multiQuery.record &&
                teamNames.includes(multiQuery.team) && matchNumbers.includes(Number(multiQuery.match)) && recordNumbers.includes(Number(multiQuery.record))
            ) getTeamPerformance(multiQuery.team, Number(multiQuery.match), Number(multiQuery.record), (data) => {
                setQueriedData(Object.entries(data.jsonScoutInput).map(e => ({ key: e[0], value: e[1] })))
            })
            
            setMultiQueryOptions({
                team: teamNames,
                match: matchNumbers,
                record: recordNumbers
            })
        }

        if(!multiQuery.team && !multiQuery.match){
            getTeamNamesAcrossMatchScouting((teamNames) => {
                getMatchNumbers((matchNumbers) => {
                    getRecordsCount(Number(multiQuery.match), multiQuery.team, (recordsCount) => {
                        setStates({ teamNames, matchNumbers, recordsCount })
                    })
                })
            })
        } else if(!multiQuery.team){
            getTeamsInMatchNumber(Number(multiQuery.match), (teamNames) => {
                getMatchNumbers((matchNumbers) => {
                    getRecordsCount(Number(multiQuery.match), multiQuery.team, (recordsCount) => {
                        setStates({ teamNames, matchNumbers, recordsCount })
                    })
                })
            })
        } else if(!multiQuery.match){
            getTeamNamesAcrossMatchScouting((teamNames) => {
                getMatchNumbersWithTeam(multiQuery.team, (matchNumbers) => {
                    getRecordsCount(Number(multiQuery.match), multiQuery.team, (recordsCount) => {
                        setStates({ teamNames, matchNumbers, recordsCount })
                    })
                })
            })
        } else {
            getTeamsInMatchNumber(Number(multiQuery.match), (teamNames) => {
                getMatchNumbersWithTeam(multiQuery.team, (matchNumbers) => {
                    getRecordsCount(Number(multiQuery.match), multiQuery.team, (recordsCount) => {
                        setStates({ teamNames, matchNumbers, recordsCount })
                    })
                })
            })
        }
    }, [multiQuery])

    // on query option change, make sure any newly invalidated queries are nullified
    useEffect(() => {
        if (multiQueryOptions.match.length == 0 && multiQueryOptions.team.length == 0 && multiQueryOptions.record.length == 0) return

        const validQuery = { ...multiQuery }

        let changedQuery = false

        if(multiQuery.team && !multiQueryOptions.team.includes(multiQuery.team)){
            validQuery.team = null
            changedQuery = true
        }
        if(multiQuery.match && !multiQueryOptions.match.includes(Number(multiQuery.match))){
            validQuery.match = null
            changedQuery = true
        }
        if(multiQuery.record && !multiQueryOptions.record.includes(Number(multiQuery.record))){
            validQuery.record = null
            changedQuery = true
        }

        if (changedQuery) setMultiQuery(validQuery)
    }, [multiQueryOptions])

    // update parent state when part of query changes, update dropdown options as needed
    const setMultiQuery = (value) => {
        const temp = {...state}

        temp.multiQuery = value

        setState(temp)
    }

    // update parent state on checkbox event for spider chart toggleables
    const setShowAtIndex = (index, value) => {
        const temp = {...state}

        temp.toggleables[index].show = value

        setState(temp)
    }

    // update parent state on label value change for spider chart toggleables
    const setLabelAtIndex = (index, value) => {
        const temp = {...state}

        temp.toggleables[index].label = value

        setState(temp)
    }

    // filter queried spider chart data to only include entries toggled to show
    const toggledSpiderChartData = numericQueriedData.filter(entry => toggleables.some(toggleable => toggleable.show && (toggleable.key == entry.key)))

    toggledSpiderChartData.forEach((entry) => {
        entry.label = toggleables.find(toggleable => toggleable.key == entry.key).label
    })

    return (
        <div style={{ margin: 0 }}>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
                <MultiSegmentDropdownQuery multiQuery={multiQuery} setMultiQuery={setMultiQuery} multiQueryOptions={multiQueryOptions} />
            </div>
            <h1>
                {
                    `${multiQuery.team || "[N/A]"} in Match #${multiQuery.match || "[N/A]"} (Record ${multiQuery.record || "[N/A]"})`
                }
            </h1>
            {
                (
                    multiQuery.team && multiQuery.match && multiQuery.record &&
                    multiQueryOptions.team.includes(multiQuery.team) && multiQueryOptions.match.includes(Number(multiQuery.match)) && multiQueryOptions.record.includes(Number(multiQuery.record))
                ) && (
                    <React.Fragment>
                        {
                            numericQueriedData.length > 0 && (
                                <React.Fragment>
                                    <hr />
                                    <h2>Quantitative Overview</h2>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <SpiderChart width={400} height={400} data={toggledSpiderChartData} axisMaximums={axisMaximums} />
                                        <div className={"vertical-divider"} style={{ height: 400 }} />
                                        <ToggleablesList style={{ height: 400 }} toggleables={toggleables} setShowAtIndex={setShowAtIndex} setLabelAtIndex={setLabelAtIndex} />
                                    </div>
                                </React.Fragment>
                            )
                        }
                        {
                            nonNumericQueriedData.length > 0 && (
                                <React.Fragment>
                                    <hr />
                                    <h2>Qualitative Overview</h2>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <QualitativeData entries={nonNumericQueriedData} />
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default TeamPerformance