import React from "react"

const BarChart = ({ stats }) => {
    let max = 0
    stats.forEach(team => max = Math.max(max, team.stats.best))
    if (max == 0) max = 1

    const rows = []

    stats.forEach((team, index) => {
        rows.push(
            <div key={index} style={{ display: "flex", width: 900, flexDirection: "row", margin: "auto", marginTop: 20 }}>
                <div style={{ width: 160 }}>
                    {
                        team.teamName
                    }
                </div>
                <div style={{ width: 600, height: 20, borderRadius: 10 }}>
                    <div style={{ position: "absolute", width: 600 * (team.stats.best / max), height: 20, borderRadius: 10, backgroundColor: "rgb(102, 227, 156)", textAlign: "right", overflow: "hidden" }}>
                        <i style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "flex-end", fontSize: 10, marginRight: 10 }}>
                            {
                                team.stats.best.toFixed(2)
                            }
                        </i>
                    </div>
                    <div style={{ position: "absolute", width: 600 * (team.stats.average / max), height: 20, borderRadius: 10, backgroundColor: "rgb(255, 203, 130)", textAlign: "right", overflow: "hidden" }}>
                        <i style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "flex-end", fontSize: 10, marginRight: 10 }}>
                            {
                                team.stats.average.toFixed(2)
                            }
                        </i>
                    </div>
                    <div style={{ position: "absolute", width: 600 * (team.stats.worst / max), height: 20, borderRadius: 10, backgroundColor: "rgb(250, 180, 180)", textAlign: "right", overflow: "hidden" }}>
                        <i style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "flex-end", fontSize: 10, marginRight: 10 }}>
                            {
                                team.stats.worst.toFixed(2)
                            }
                        </i>
                    </div>
                </div>
            </div>
        )
    })

    return rows
}

export default BarChart