const calculateTeamAnalytics = (teamPerformances) => {
    const teamAnalytics = {
        numeric: {},
        nonNumeric: {}
    }

    if (teamPerformances.length == 0) return teamAnalytics

    const numericFields = Object.keys(teamPerformances[0]).filter(key => typeof teamPerformances[0][key] == "number")
    const nonNumericFields = Object.keys(teamPerformances[0]).filter(key => typeof teamPerformances[0][key] != "number")

    numericFields.forEach(field => {
        teamAnalytics.numeric[field] = {
            all: [],
            best: 0,
            average: 0,
            worst: 0
        }

        teamPerformances.forEach(performance => {
            teamAnalytics.numeric[field].all.push(performance[field])
            teamAnalytics.numeric[field].average += performance[field]
        })

        teamAnalytics.numeric[field].best = Math.max(...teamAnalytics.numeric[field].all)
        teamAnalytics.numeric[field].worst = Math.min(...teamAnalytics.numeric[field].all)
        teamAnalytics.numeric[field].average /= teamPerformances.length
    })

    nonNumericFields.forEach(field => {
        teamAnalytics.nonNumeric[field] = []

        teamPerformances.forEach(performance => teamAnalytics.nonNumeric[field].push(performance[field]))
    })
    
    return teamAnalytics
}

const calculateMergedTeamAnalytics = (teamPerformances) => {
    if (teamPerformances.length == 0) return {}

    const teamAnalytics = calculateTeamAnalytics(teamPerformances)
    
    const inOrderEntries = Object.keys(teamPerformances[0]).map(key => ({
        key,
        value: typeof teamPerformances[0][key] == "number" ? teamAnalytics.numeric[key] : teamAnalytics.nonNumeric[key]
    }))

    const merged = {}

    inOrderEntries.forEach(({ key, value }) => merged[key] = value)

    return merged
}

const median = (data) => {
    return data.length % 2 == 0 ? 0.5 * (data[0.5 * data.length - 1] + data[0.5 * data.length]) : data[Math.floor(0.5 * data.length)]
}

const calculateQuartiles = (data) => {
    return {
        median: median(data),
        Q1: median(data.slice(0, Math.ceil(0.5 * data.length))),
        Q3: median(data.slice(Math.floor(0.5 * data.length)))
    }
}

export {
    calculateTeamAnalytics,
    calculateMergedTeamAnalytics,
    calculateQuartiles
}