import arrayUnique from "array-unique"
import React from "react"

const MultiSegmentDropdownQuery = ({ multiQuery, setMultiQuery, multiQueryOptions }) => {
    const modifyQuery = (key, newValue) => {
        const temp = {...multiQuery}

        temp[key] = newValue

        setMultiQuery(temp)
    }

    const segments = []

    Object.entries(multiQuery).forEach((query, index) => {
        const options = []
        
        arrayUnique(multiQueryOptions[query[0]]).forEach((option => {
            options.push(
                <option key={option}>
                    {
                        option
                    }
                </option>
            )
        }))

        segments.push(
            <div key={2 * index} className={"query-segment"}>
                {
                    query[0].slice(0, 1).toUpperCase() + query[0].slice(1)
                }
                <select value={query[1] || ""} onChange={(e) => {
                    modifyQuery(query[0], e.target.value || null)
                }}>
                    <option />
                    {
                        options
                    }
                </select>
            </div>,
            <div key={2 * index + 1} className={"vertical-divider"} style={{ height: 40 }} />
        )
    })

    segments.pop() // get rid of extraneous vertical divider

    return (
        <div className={"query-segments"}>
            {
                segments
            }
        </div>
    )
}

export default MultiSegmentDropdownQuery