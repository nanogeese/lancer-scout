// entry is the json for an entire form
// query is an object composed of keyName, operator, operand
const applyQuery = (entry, query) => {
    const { keyName, operator, operand } = query

    if(!entry.hasOwnProperty(keyName)) return false

    const entryValue = entry[keyName]
    
    if (operator == "equals") return entryValue === operand
    if (operator == "not equals") return entryValue !== operand

    if (operator == "includes") return typeof entryValue == "string" && entryValue.includes(operand)

    // the rest are numerical comparison operators, cull initially based on type
    const isNumber = typeof entryValue == "number"
    if (!isNumber) return false

    if (operator == "less than") return entryValue < operand
    if (operator == "less than or equals") return entryValue <= operand
    if (operator == "greater than") return entryValue > operand
    if (operator == "greater than or equals") return entryValue >= operand

    // catch all, invalid operator (also potentially caught by number guard)
    return false
}

// entries is a 1d array of json forms that *should* have the same form but technically there is no guarantee
// queries is a 1 array of query objects (see above)
const query = (entries, queries) => {
    const matches = entries.filter(entry => queries.every((query) => {
        return applyQuery(entry, query)
    }))

    return matches
}

// get all unique keys across all entries
const getAllKeys = (entries) => {
    const allKeys = []

    entries.forEach(entry => {
        const entryKeys = Object.keys(entry)

        entryKeys.forEach(key => {
            if (!allKeys.includes(key)) allKeys.push(key)
        })
    })

    return allKeys
}

// if all values of the given key have the same type return that type, otherwise return null
const getKeyMonotype = (entries, keyName) => {
    const types = []

    entries.forEach(entry => {
        if(entry.hasOwnProperty(keyName)){
            const type = typeof entry[keyName]

            if (!types.includes(type)) types.push(type)
        }
    })

    // shouldn't happen based on the context in which this is used, but good catch all for safety
    if (types.length == 0) return null

    // must be a monotype if all elements are equal to the first element
    if (!types.every(type => type == types[0])) return null

    return types[0]
}

const getValidOperators = (type) => {
    if(type == "boolean") return [
        "equals",
        "not equals"
    ]

    if(type == "string") return [
        "equals",
        "not equals",
        "includes"
    ]

    if(type == "number") return [
        "equals",
        "not equals",
        "less than",
        "less than or equals",
        "greater than",
        "greater than or equals",
    ]
}

// generate the averages for each key within all the entries
const mergeEntries = (entries) => {
    const allKeys = getAllKeys(entries)

    const merged = {}

    allKeys.forEach(key => {
        const values = []

        entries.forEach(entry => {
            if (entry.hasOwnProperty(key)) values.push(entry[key])
        })

        // somewhat inefficient, but easier to read
        const monotype = getKeyMonotype(entries, key)

        if(monotype == null){
            merged[key] = (
                <ul>
                    {
                        values.map((value, index) => <li key={index}>{value}</li>)
                    }
                </ul>
            )
        } else if(monotype == "boolean"){
            const trueCount = values.filter(value => value)

            // 3 sig fig
            const truePercent = Math.round(1000 * trueCount / values.length) / 10
            const falsePercent = 100 - truePercent
            
            merged[key] = (
                <ul>
                    <li>True ({truePercent}%)</li>
                    <li>False ({falsePercent}%)</li>
                </ul>
            )
        } else if(monotype == "number"){
            let total = 0

            values.forEach(value => total += value)

            const average = Math.round(100 * total / values.length) / 100

            merged[key] = "Average: " + average
        } else if(monotype == "string"){
            const valueMap = {}

            values.forEach(value => {
                if(valueMap.hasOwnProperty(value)) valueMap[value]++
                else valueMap[value] = 1
            })
            
            // TODO: sort valueMap first to show most common answers preferentially

            const withRepetitionPrefix = []

            Object.entries(valueMap).forEach(valueMapEntry => {
                const [answer, repetition] = valueMapEntry

                withRepetitionPrefix.push(`(${repetition}x) ${answer}`)
            })

            merged[key] = (
                <ul>
                    {
                        withRepetitionPrefix.map((value, index) => <li key={index}>{value}</li>)
                    }
                </ul>
            )
        } else {
            // we fucked up lol

            merged[key] = "Whoops, error merging data for this form"
        }
    })
}

export {
    applyQuery,
    query,
    getAllKeys,
    getKeyMonotype,
    getValidOperators
}