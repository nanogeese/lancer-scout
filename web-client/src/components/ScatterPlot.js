import React from "react"

const ScatterPlot = ({ height, style, xAxisData, xAxisMax, yAxisData, yAxisMax }) => {
    const axisRenders = []
    for(let i = 0;i<11;i++){
        const xOffset = 30/12 + 30/12 * i
        const yOffset = 22 - 22/12 - 22/12 * i

        axisRenders.push(
            <line key={"axis" + i * 2} x1={xOffset} y1={0} x2={xOffset} y2={22} stroke={"rgb(20, 20, 20)"} strokeWidth={i == 0 ? 0.06 : 0.01} />,
            <line key={"axis" + i * 2 + 1} x1={0} y1={yOffset} x2={30} y2={yOffset} stroke={"rgb(20, 20, 20)"} strokeWidth={i == 0 ? 0.05 : 0.01} />
        )
    }

    const graphPoints = []

    if(xAxisData.length > 0 && yAxisData.length > 0){
        const toGraphPosition = (x, y) => {
            return {
                x: 30/12 + 30 * 10/12 * (x / xAxisMax),
                y: 22 - 22/12 - 22 * 10/12 * (y / yAxisMax)
            }
        }
        
        const points = []
    
        for(let i = 0;i<xAxisData.length;i++){
            points.push(toGraphPosition(xAxisData[i], yAxisData[i]))
        }
    
        points.sort((a, b) => a.x - b.x)
        
        points.forEach((point, index) => {
            graphPoints.push(
                <circle key={"point" + index} cx={point.x} cy={point.y} r={0.2} fill={"rgb(250, 180, 180)"} stroke={"rgb(184, 1, 0)"} strokeWidth={0.1} />
            )
        })
    }

    return (
        <svg height={height} style={style} viewBox={"0 0 30 22"}>
            {
                [...axisRenders, ...graphPoints]
            }
        </svg>
    )
}

export default ScatterPlot