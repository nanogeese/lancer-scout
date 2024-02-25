import React from "react"

const ToggleablesList = ({ style, toggleables, setShowAtIndex, setLabelAtIndex }) => {
    const toggleableRenders = []

    toggleables.forEach((toggleable, index) => {
        toggleableRenders.push(
            <div key={index} className={"toggleable"}>
                <input type={"checkbox"} checked={toggleable.show} onChange={() => setShowAtIndex(index, !toggleable.show)} />
                {
                    "\"" + toggleable.key + "\" as "
                }
                <input type={"text"} value={toggleable.label} onChange={(e) => {
                    setLabelAtIndex(index, e.target.value)
                }} />
            </div>
        )
    })

    return (
        <div style={style} className={"toggleables-container"}>
            <div className={"toggleables"}>
                {
                    toggleableRenders
                }
            </div>
        </div>
    )
}

export default ToggleablesList