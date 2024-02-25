import React from "react"

const Link = ({ href, bold, children }) => {
    const active = location.pathname == href
    
    if (bold) children = (
        <b>
            {
                children
            }
        </b>
    )

    return (
        <a className={active ? "active" : ""} href={href}>
            {
                children
            }
        </a>
    )
}

const TopNav = () => {
    return (
        <div className={"top-nav"}>
            <Link href={"/"} bold>Lancer Scout</Link>
            <Link href={"/tournament"}>Tournament</Link>
            <Link href={"/schema"}>Schema</Link>
            <Link href={"/upload"}>Upload</Link>
            <Link href={"/data"}>Data</Link>
        </div>
    )
}

export default TopNav