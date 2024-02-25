import React from "react"

const MultiSpiderChart = ({ width, height, style, data, axisMaximums }) => {
    if (data.length == 0) return (
        <div style={{ ...style, width, height }} />
    )

    const polarToCartesian = (theta, r) => ({ x: 18 + r * Math.cos(theta + 0.5 * Math.PI + Math.PI / (2 * data.length)), y: 15 - r * Math.sin(theta + 0.5 * Math.PI + Math.PI / (2 * data.length)) })

    // all these can technically be merged, separated for readability

    const axisRenders = []
    const center = polarToCartesian(0, 0)
    for(let i = 0;i<data.length;i++){
        const endPoint = polarToCartesian(2 * Math.PI * (i / data.length), 9)

        axisRenders.push(
            <line key={"axis" + i} stroke={"rgb(20, 20, 20)"} strokeWidth={0.05} x1={center.x} y1={center.y} x2={endPoint.x} y2={endPoint.y} />
        )
    }

    const bestIndicatorPoints = data.map((point, index) => polarToCartesian(2 * Math.PI * (index / data.length), 9 * Math.min(point.best / Math.max(axisMaximums[point.key], 1), 1)))

    const bestIndicatorRenders = []
    for(let i = 0;i<data.length;i++){
        bestIndicatorRenders.push(
            <circle key={"bestIndicator" + i} fill={"green"} cx={bestIndicatorPoints[i].x} cy={bestIndicatorPoints[i].y} r={0.2} />
        )
    }

    let bestIndicatorConnectionsPath = `M ${bestIndicatorPoints[bestIndicatorPoints.length - 1].x} ${bestIndicatorPoints[bestIndicatorPoints.length - 1].y}`
    for(let i = 0;i<bestIndicatorPoints.length;i++){
        bestIndicatorConnectionsPath += ` L ${bestIndicatorPoints[i].x} ${bestIndicatorPoints[i].y}`
    }

    const averageIndicatorPoints = data.map((point, index) => polarToCartesian(2 * Math.PI * (index / data.length), 9 * Math.min(point.average / Math.max(axisMaximums[point.key], 1), 1)))

    const averageIndicatorRenders = []
    for(let i = 0;i<data.length;i++){
        averageIndicatorRenders.push(
            <circle key={"averageIndicator" + i} fill={"orange"} cx={averageIndicatorPoints[i].x} cy={averageIndicatorPoints[i].y} r={0.2} />
        )
    }

    let averageIndicatorConnectionsPath = `M ${averageIndicatorPoints[averageIndicatorPoints.length - 1].x} ${averageIndicatorPoints[averageIndicatorPoints.length - 1].y}`
    for(let i = 0;i<averageIndicatorPoints.length;i++){
        averageIndicatorConnectionsPath += ` L ${averageIndicatorPoints[i].x} ${averageIndicatorPoints[i].y}`
    }

    const worstIndicatorPoints = data.map((point, index) => polarToCartesian(2 * Math.PI * (index / data.length), 9 * Math.min(point.worst / Math.max(axisMaximums[point.key], 1), 1)))

    const worstIndicatorRenders = []
    for(let i = 0;i<data.length;i++){
        worstIndicatorRenders.push(
            <circle key={"worstIndicator" + i} fill={"red"} cx={worstIndicatorPoints[i].x} cy={worstIndicatorPoints[i].y} r={0.2} />
        )
    }

    let worstIndicatorConnectionsPath = `M ${worstIndicatorPoints[worstIndicatorPoints.length - 1].x} ${worstIndicatorPoints[worstIndicatorPoints.length - 1].y}`
    for(let i = 0;i<worstIndicatorPoints.length;i++){
        worstIndicatorConnectionsPath += ` L ${worstIndicatorPoints[i].x} ${worstIndicatorPoints[i].y}`
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
                    data[i].label + " (" + data[i].average.toFixed(2) + "/" + axisMaximums[data[i].key] + ")"
                }
            </text>
        )
    }

    return (
        <svg width={width} height={height} style={style} viewBox={"0 0 36 30"}>
            <path fill={"rgb(102, 227, 156)"} stroke={"rgb(63, 158, 104)"} strokeWidth={0.1} d={bestIndicatorConnectionsPath} />
            <path fill={"rgb(255, 203, 130)"} stroke={"rgb(201, 131, 34)"} strokeWidth={0.1} d={averageIndicatorConnectionsPath} />
            <path fill={"rgb(237, 135, 128)"} stroke={"rgb(173, 65, 57)"} strokeWidth={0.1} d={worstIndicatorConnectionsPath} />
            {
                [...axisRenders, ...bestIndicatorRenders, ...averageIndicatorRenders, ...worstIndicatorRenders, ...labelRenders]
            }
        </svg>
    )
}

// TODO: is this worth memoizing
export default MultiSpiderChart