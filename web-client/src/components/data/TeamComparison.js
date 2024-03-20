import React, { useEffect, useState } from "react"
import MultiSegmentDropdownQuery from "../MultiSegmentDropdownQuery"
import { getMaximumsAcrossMatchScouting, getTeamNamesAcrossMatchScouting, getTeamOverviewAcrossMatchScouting } from "../../scripts/api"
import { calculateMergedTeamAnalytics, calculateTeamAnalytics } from "../../scripts/analytics"
import ToggleablesList from "../ToggleablesList"
import SpiderChart from "../SpiderChart"
import MultiSpiderChart from "../MultiSpiderChart"

const TeamComparison = ({ state, setState }) => {
    const { teamToggleables, keyToggleables } = state

    // global max values in numerical fields which are used to normalize spider chart data
    const [axisMaximums, setAxisMaximums] = useState({})

    // on start retrieve these maximums
    useEffect(() => {
        getTeamNamesAcrossMatchScouting((teamNames) => {
            const updatedTeamToggleables = []

            let requiresUpdate = false

            teamNames.forEach(teamName => {
                const toggleable = teamToggleables.find(toggleable => toggleable.key == teamName)

                if (toggleable) updatedTeamToggleables.push(toggleable)
                else {
                    requiresUpdate = true

                    updatedTeamToggleables.push({
                        key: teamName,
                        label: teamName,
                        show: true
                    })
                }
            })

            teamToggleables.forEach(teamToggleable => {
                if(!teamNames.includes(teamToggleable.key)) requiresUpdate = true
            })

            if (requiresUpdate) {
                const temp = {...state}

                temp.teamToggleables = updatedTeamToggleables

                setState(temp)
            }
        })

        getMaximumsAcrossMatchScouting((maximums) => {
            setAxisMaximums(maximums)
        })
    }, [])

    const setShowTeamAtIndex = (index, value) => {
        const temp = {...state}

        temp.teamToggleables[index].show = value

        setState(temp)
    }

    const setTeamLabelAtIndex = (index, value) => {
        const temp = {...state}

        temp.teamToggleables[index].label = value

        setState(temp)
    }

    const setShowKeyAtIndex = (index, value) => {
        const temp = {...state}

        temp.keyToggleables[index].show = value

        setState(temp)
    }

    const setKeyLabelAtIndex = (index, value) => {
        const temp = {...state}

        temp.keyToggleables[index].label = value

        setState(temp)
    }

    const [allTeamOverviews, setAllTeamOverviews] = useState({})
    
    useEffect(() => {
        getTeamNamesAcrossMatchScouting((teamNames) => {
            Promise.all(teamNames.map(teamName => {
                return new Promise((resolve) => {
                    getTeamOverviewAcrossMatchScouting(teamName, (performances) => {
                        const numericAnalytics = calculateTeamAnalytics(performances).numeric

                        Object.keys(numericAnalytics).forEach(key => numericAnalytics[key] = numericAnalytics[key].average)

                        resolve({ data: numericAnalytics, teamName })
                    })
                })
            })).then((teamOverviews) => {
                const temp = {}

                teamOverviews.forEach(overview => temp[overview.teamName] = overview.data)
                
                setAllTeamOverviews(temp)
            })
        })
    }, [])

    const keyVisibility = {}
    keyToggleables.forEach(toggleable => {
        keyVisibility[toggleable.key] = toggleable.show
    })
    
    const toggledSpiderChartData = {}

    Object.entries(allTeamOverviews).forEach(([ teamName, teamData ]) => {
        const toggleable = teamToggleables.find(toggleable => toggleable.key == teamName)
        
        if (!toggleable || !toggleable.show) return

        toggledSpiderChartData[toggleable.label] = {}

        Object.entries(teamData).filter(([ key ]) => keyVisibility[key]).forEach(([ key, value ]) => toggledSpiderChartData[toggleable.label][key] = value)
    })

    const axisLabels = {}
    keyToggleables.forEach(toggleable => {
        if (toggleable.show) axisLabels[toggleable.key] = toggleable.label
    })

    return (
        <React.Fragment>
            <h1>Team Comparison</h1>
            <hr />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <MultiSpiderChart chartWidth={600} chartHeight={400} maxHeight={500} data={toggledSpiderChartData} axisLabels={axisLabels} axisMaximums={axisMaximums} />
                <div className={"vertical-divider"} style={{ maxHeight: 500 }} />
                <ToggleablesList style={{ maxHeight: 500 }} toggleables={teamToggleables} setShowAtIndex={setShowTeamAtIndex} setLabelAtIndex={setTeamLabelAtIndex} />
                <div className={"vertical-divider"} style={{ maxHeight: 500 }} />
                <ToggleablesList style={{ maxHeight: 500 }} toggleables={keyToggleables} setShowAtIndex={setShowKeyAtIndex} setLabelAtIndex={setKeyLabelAtIndex} />
            </div>
        </React.Fragment>
    )
}

export default TeamComparison