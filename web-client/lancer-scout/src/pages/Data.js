import React, { useState, useEffect } from "react"

import { query, getAllKeys, getKeyMonotype, getValidOperators, mergeEntries } from "../scripts/filter"

const DataPage = () => {
    const getPersistentData = () => {
        const persistentKeys = Object.keys(localStorage)

        if(persistentKeys.includes("lancer-scout-data")){
            try {
                const json = JSON.parse(localStorage.getItem("lancer-scout-data"))

                return json
            } catch(e){
                return []
            }
        } else {
            return []
        }
    }

    const getPersistentQueries = () => {
        const persistentKeys = Object.keys(localStorage)

        if(persistentKeys.includes("lancer-scout-queries")){
            try {
                const json = JSON.parse(localStorage.getItem("lancer-scout-queries"))

                return json
            } catch(e){
                return []
            }
        } else {
            return []
        }
    }

    const data = getPersistentData()
    const [queries, setQueries] = useState(getPersistentQueries)

    useEffect(() => {
        localStorage.setItem("lancer-scout-queries", JSON.stringify(queries))
    }, [queries])

    const filteredForms = query(data, queries)
    const mergedForm = mergeEntries(filteredForms)

    const allKeys = getAllKeys(data)

    const Query = ({ index }) => {
        const monotype = getKeyMonotype(data, queries[index].keyName)

        return (
            <div className={"query"}>
                <div className={"query-options"}>
                    <select value={queries[index].keyName} onChange={(e) => {
                        const temp = [...queries]

                        temp[index].keyName = e.target.value

                        setQueries(temp)
                    }}>
                        {
                            allKeys.map((option, index) => (
                                <option key={index}>
                                    {
                                        option
                                    }
                                </option>
                            ))
                        }
                    </select>
                    <select value={queries[index].operator} onChange={(e) => {
                        const temp = [...queries]

                        temp[index].operator = e.target.value

                        setQueries(temp)
                    }}>
                        {
                            getValidOperators(monotype).map((option, index) => (
                                <option key={index}>
                                    {
                                        option
                                    }
                                </option>
                            ))
                        }
                    </select>
                    {
                        (monotype == "string" || monotype == "number") && (
                            <input defaultValue={queries[index].operand} type={monotype == "string" ? "text" : "number"} onBlur={(e) => {
                                const temp = [...queries]

                                temp[index].operand = e.target.value

                                setQueries(temp)
                            }} />
                        )
                    }
                </div>
                <div className={"query-delete"} onClick={() => {
                    const temp = [...queries]

                    temp.splice(index, 1)

                    setQueries(temp)
                }}>×</div>
            </div>
        )
    }

    const Form = ({ entries }) => {
        return (
            <div className={"form"}>
                {
                    Object.entries(entries).map((entry, index) => (
                        <div key={index}>
                            <b>{entry[0]}</b>
                            <br />
                            <i>
                                {
                                    entry[1]
                                }
                            </i>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <React.Fragment>
            <h1>Data</h1>
            <div className={"queries"}>
                <div className={"add"} onClick={() => {
                    const temp = [...queries]

                    temp.push({
                        keyName: allKeys[0],
                        operator: getValidOperators(getKeyMonotype(data, allKeys[0]))[0],
                        operand: null
                    })

                    setQueries(temp)
                }}>Add Filter +</div>
                <div style={{ height: 10 }} />
                {
                    queries.map((_, index) => <Query key={index} index={index} />)
                }
            </div>
            <hr />
            <div style={{ textAlign: "center" }}>
                <h2>Results Overview</h2>
                <Form entries={mergedForm} />
            </div>
            <hr />
            <h2 style={{ textAlign: "center" }}>All Matches</h2>
            <div className={"forms"}>
                {
                    filteredForms.map((form, index) => <Form key={index} entries={form} />)
                }
            </div>
        </React.Fragment>
    )
}

export default DataPage