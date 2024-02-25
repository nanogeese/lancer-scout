import React from "react"

const QualitativeData = ({ entries }) => {
    const entryRenders = []

    entries.forEach((entry, index) => {
        const { key, value } = entry

        entryRenders.push(
            <div key={index} className={"qualitative-data-entry"}>
                <div className={"key"}>
                    {
                        key
                    }
                </div>
                <div className={"vertical-divider"} />
                <div className={"value"}>
                    {
                        Array.isArray(value) ? (
                            <ul>
                                {
                                    (() => {
                                        const items = []

                                        value.forEach((itemValue, index) => {
                                            items.push(
                                                <li key={index}>
                                                    {
                                                        typeof itemValue == "boolean" ? (itemValue ? "True" : "False") : itemValue
                                                    }
                                                </li>
                                            )
                                        })

                                        return items
                                    })()
                                }
                            </ul>
                        ) : typeof value == "boolean" ? (value ? "True" : "False") : value
                    }
                </div>
            </div>
        )
    })

    return entryRenders
}

export default QualitativeData