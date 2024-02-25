import React from "react"
import { calculateQuartiles } from "../scripts/analytics"

const BoxAndWhisker = ({ width, style, data, maxValue }) => {
    const sorted = data.toSorted((a, b) => a - b)

    const min = sorted[0]
    const max = sorted[sorted.length - 1]

    let mean = 0
    data.forEach(value => mean += value)
    mean /= data.length

    let standardDeviation = 0
    data.forEach(value => standardDeviation += (value - mean) * (value - mean))
    standardDeviation = Math.sqrt(standardDeviation / data.length)

    const quartiles = calculateQuartiles(sorted)

    return (
        <div style={{ textAlign: "center" }}>
            <svg width={width} style={style} viewBox={"0 0 12 2"}>
                <line x1={1} y1={1} x2={11} y2={1} stroke={"rgb(20, 20, 20)"} strokeDasharray={"0.1"} strokeWidth={0.005} />
                {
                    maxValue != 0 && (
                        <React.Fragment>
                            <line x1={1 + 10 * (min / maxValue)} y1={1} x2={1 + 10 * (max / maxValue)} y2={1} stroke={"rgb(184, 1, 0)"} strokeWidth={0.05} />
                            <line x1={1 + 10 * (quartiles.Q1 / maxValue)} y1={1} x2={1 + 10 * (quartiles.Q3 / maxValue)} y2={1} stroke={"rgb(184, 1, 0)"} strokeWidth={0.4} />
                            <line x1={1.05 + 10 * (quartiles.Q1 / maxValue)} y1={1} x2={0.95 + 10 * (quartiles.Q3 / maxValue)} y2={1} stroke={"rgb(250, 180, 180)"} strokeWidth={0.3} />
                            <line x1={1 + 10 * (quartiles.median / maxValue)} y1={0.5} x2={1 + 10 * (quartiles.median / maxValue)} y2={1.5} stroke={"rgb(184, 1, 0)"} strokeWidth={0.1} />
                        </React.Fragment>
                    )
                }
            </svg>
            <div>Mean: { mean.toFixed(2) }</div>
            <br />
            <div>Standard Deviation: { standardDeviation.toFixed(2) }</div>
        </div>
    )
}

export default BoxAndWhisker