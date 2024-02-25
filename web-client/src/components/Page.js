import React from "react"

import TopNav from "./TopNav"

const Page = ({ children }) => {
    return (
        <React.Fragment>
            <TopNav />
            <div className={"page-content"}>
                {
                    children
                }
            </div>
            
        </React.Fragment>
    )
}

export default Page