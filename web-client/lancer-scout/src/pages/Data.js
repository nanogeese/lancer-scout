import React from "react"

const DataPage = () => {
    const testData = [
        {
            teamName: "Robolancers 321",
            matchNumber: 34,
            score: 72,
            comments: "test comment 1",
            balanced: false
        },
        {
            teamName: "Firebirds 433",
            matchNumber: 36,
            score: 40,
            comments: "test comment 2",
            balanced: true
        },
        {
            teamName: "Robolancers 321",
            matchNumber: 36,
            score: 56,
            balanced: true
        }
    ]

    return (
        <React.Fragment>
            <h1>Data Display</h1>
            <div>TODO: add query bar</div>
            <hr />
            
        </React.Fragment>
    )
}

export default DataPage