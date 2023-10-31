import React, { useState, useEffect } from "react"

import SchemaPage from "./pages/Schema"
import ScanPage from "./pages/Scan"
import DataPage from "./pages/Data"

const App = () => {
    const [page, setPage] = useState("data")

    useEffect(() => {
        const handleHashchange = () => {
            const currentHash = window.location.hash
    
            switch(currentHash){
                case "#scan":
                    setPage("scan")
                    break
                case "#data":
                    setPage("data")
                    break
                case "#schema":
                    setPage("schema")
                    break
                default:
                    setPage("data")
                    break
            }
        }

        handleHashchange()

        window.addEventListener("popstate", handleHashchange)

        return () => window.removeEventListener("popstate", handleHashchange)
    }, [])

    const navMap = {
        "scan": ScanPage,
        "data": DataPage,
        "schema": SchemaPage
    }

    const PageComponent = navMap[page]

    return (
        <div>
            <div className={"nav"}>
                <a href={"#scan"}>Scan</a>
                <a href={"#data"}>Data</a>
                <a href={"#schema"}>Schema</a>
            </div>
            <div style={{ padding: 10, paddingTop: 0 }}>
                <PageComponent />
            </div>
        </div>
    )
}

export default App