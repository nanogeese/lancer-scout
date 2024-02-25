import React from "react"

const SpiderChart = ({ width, height, style, data, axisMaximums }) => {
    if (data.length == 0) return (
        <div style={{ ...style, width, height }} />
    )

    const polarToCartesian = (theta, r) => isNaN(r) ? ({ x: 18, y: 15 }) : ({ x: 18 + r * Math.cos(theta + 0.5 * Math.PI + Math.PI / (2 * data.length)), y: 15 - r * Math.sin(theta + 0.5 * Math.PI + Math.PI / (2 * data.length)) })

    // all these can technically be merged, separated for readability

    const axisRenders = []
    const center = polarToCartesian(0, 0)
    for(let i = 0;i<data.length;i++){
        const endPoint = polarToCartesian(2 * Math.PI * (i / data.length), 9)

        axisRenders.push(
            <line key={"axis" + i} stroke={"rgb(20, 20, 20)"} strokeWidth={0.05} x1={center.x} y1={center.y} x2={endPoint.x} y2={endPoint.y} />
        )
    }

    const quarterMarkerRenders = []
    for(let i = 1;i<4;i++){
        const radius = 9 * (i / 4)

        for(let j = 0;j<data.length;j++){
            const startPoint = polarToCartesian(2 * Math.PI * (j / data.length), radius)
            const endPoint = polarToCartesian(2 * Math.PI * ((j + 1) / data.length), radius)

            quarterMarkerRenders.push(
                <line key={"quarterMark" + (i * data.length + j)} stroke={"rgb(20, 20, 20)"} strokeWidth={0.05} x1={startPoint.x} y1={startPoint.y} x2={endPoint.x} y2={endPoint.y} />
            )
        }
    }

    const indicatorPoints = data.map((point, index) => polarToCartesian(2 * Math.PI * (index / data.length), 9 * (Math.min(point.value / axisMaximums[point.key], 1) || 1)))

    const indicatorRenders = []
    for(let i = 0;i<data.length;i++){
        indicatorRenders.push(
            <circle key={"indicator" + i} fill={"rgb(184, 1, 0)"} cx={indicatorPoints[i].x} cy={indicatorPoints[i].y} r={0.2} />
        )
    }

    let indicatorConnectionsPath = `M ${indicatorPoints[indicatorPoints.length - 1].x} ${indicatorPoints[indicatorPoints.length - 1].y}`
    for(let i = 0;i<indicatorPoints.length;i++){
        indicatorConnectionsPath += ` L ${indicatorPoints[i].x} ${indicatorPoints[i].y}`
    }

    const labelRenders = []
    for(let i = 0;i<data.length;i++){
        const x = Math.cos(2 * Math.PI * (i / data.length) + 0.5 * Math.PI)
        const y = Math.sin(2 * Math.PI * (i / data.length) + 0.5 * Math.PI)
        const textAnchor = x < -0.9 ? "end" : x > 0.9 ? "start" : "middle"

        const anchor = polarToCartesian(2 * Math.PI * (i / data.length), (Math.abs(x) < 0.9 ? 11.5 : 10.5) + (Math.abs(y) > 0.99 && data.length > 10 ? 1 : 0))

        labelRenders.push(
            <text key={"label" + i} x={anchor.x} y={anchor.y} textAnchor={textAnchor} dominantBaseline={"middle"} fontSize={1} fontFamily={"OpenSans"} fontWeight={"700"} >
                {
                    data[i].label + " (" + data[i].value + "/" + axisMaximums[data[i].key] + ")"
                }
            </text>
        )
    }

    return (
        <svg width={width} height={height} style={style} viewBox={"0 0 36 30"}>
            <path fill={"rgb(250, 180, 180)"} stroke={"rgb(184, 1, 0)"} strokeWidth={0.1} d={indicatorConnectionsPath} />
            {
                [...axisRenders, ...quarterMarkerRenders, ...indicatorRenders, ...labelRenders]
            }
        </svg>
    )
}

// TODO: is this worth memoizing
export default SpiderChart