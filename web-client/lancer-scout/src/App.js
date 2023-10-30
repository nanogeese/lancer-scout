import React, { useState, useEffect } from "react"

import DefaultPage from "./pages/Default"
import SchemaPage from "./pages/Schema"
import ScanPage from "./pages/Scan"
import DataPage from "./pages/Data"

const App = () => {
    const [page, setPage] = useState("data")

    // useEffect(() => {
    //     const handleHashchange = () => {
    //         const currentHash = window.location.hash

    //         console.log(currentHash)
    
    //         switch(currentHash){
    //             case "#schema":
    //                 setPage("schema")
    //                 break
    //             case "#scan":
    //                 setPage("scan")
    //                 break
    //             case "#data":
    //                 setPage("data")
    //                 break
    //             default:
    //                 setPage("default")
    //                 break
    //         }
    //     }

    //     window.addEventListener("popstate", handleHashchange)

    //     return () => window.removeEventListener("popstate", handleHashchange)
    // }, [])

    useEffect(() => {
        console.log({ page })
    }, [page])

    const navMap = {
        "default": DefaultPage,
        "schema": SchemaPage,
        "scan": ScanPage,
        "data": DataPage
    }

    const PageComponent = navMap[page]

    return (
        <div>
            <div>NAVBAR TODO</div>
            <PageComponent />
        </div>
    )
}

export default App