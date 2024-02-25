import React, { useRef, useEffect } from "react"

import Webcam from "react-webcam"
import jsqr from "jsqr"
import { generateDataFromBuffer } from "../scripts/dataBuffer"

// todo: shouldn't be hard coded
const testForm = [
    {
        "title": "General",
        "ui": {
            "type": "header"
        }
    },
    {
        "title": "Scout Name",
        "ui": {
            "type": "text"
        },
        "dataType": "string"
    },
    {
        "title": "Match Number",
        "ui": {
            "type": "number"
        },
        "dataType": "8bit"
    },
    {
        "title": "Team",
        "ui": {
            "type": "dropdown",
            "options": [
                "No Team Selected",
                "103 Cybersonics",
                "272 Cyber Crusaders",
                "316 LUNATECS",
                "321 RoboLancers",
                "341 Miss Daisy",
                "365 MOE/Miracle Workerz",
                "427 LANCE-A-LOT",
                "433 Firebirds",
                "484 Roboforce",
                "533 The PSIcotics",
                "708 Hatters Robotics",
                "834 The Spartechs",
                "1218 SCH Robotics",
                "1391 Metal Moose",
                "1403 Cougar Robotics",
                "1640 Sab-BOT-age",
                "1676 The Pascack Pi-oneers",
                "1712 Dawgma",
                "2539 Krypton Cougars",
                "2607 The Fighting RoboVikings",
                "3314 Mechanical Mustangs",
                "4027 Centre Punch",
                "4467 Titanium Titans",
                "4575 Gemini",
                "5181 Explorer Robotics",
                "5401 Fightin Robotic Owls",
                "5407 Wolfpack Robotics",
                "5740 The Trojanators",
                "6808 William Tennent Robotics",
                "7414 RetroRobotics",
                "8085 Mojo",
                "8714 Robo Griffins",
                "9094 The Earthquakers",
                "9991 Freshman Robotic Owls",
                "293 SPIKE",
                "555 Montclair Robotics",
                "1111 Powerhawks",
                "8117 Easton RoboRovers",
                "9015 Questionable Engineering",
                "423 Simple Machines"
            ]
        },
        "dataType": "6bit"
    },
    {
        "title": "Alliance",
        "ui": {
            "type": "radio",
            "options": [
                "Red",
                "Blue"
            ]
        },
        "dataType": "1bit"
    },
    {
        "title": "Autonomous",
        "ui": {
            "type": "header"
        }
    },
    {
        "title": "Lane",
        "ui": {
            "type": "radio",
            "options": [
                "Bump",
                "No Bump",
                "Charging Station"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cubes Low",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cubes Mid",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cubes High",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cones Low",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cones Mid",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Auto Cones High",
        "ui": {
            "type": "number"
        },
        "dataType": "2bit"
    },
    {
        "title": "Successfully Taxied",
        "ui": {
            "type": "toggle"
        },
        "dataType": "boolean"
    },
    {
        "title": "Auto Balance",
        "ui": {
            "type": "radio",
            "options": [
                "Not Applicable",
                "Engaged",
                "Docked"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Teleop",
        "ui": {
            "type": "header"
        }
    },
    {
        "title": "Teleop Cubes Low",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Teleop Cubes Mid",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Teleop Cubes High",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Teleop Cones Low",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Teleop Cones Mid",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Teleop Cones High",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Endgame",
        "ui": {
            "type": "header"
        }
    },
    {
        "title": "Time Left When Starting Balance",
        "ui": {
            "type": "radio",
            "options": [
                "0-10 Seconds",
                "10-20 Seconds",
                "20-30 Seconds",
                "30+ Seconds"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Time Taken To Balance",
        "ui": {
            "type": "radio",
            "options": [
                "0-5 Seconds",
                "5-10 Seconds",
                "10-15 Seconds",
                "15+ Seconds"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Teleop Balance",
        "ui": {
            "type": "radio",
            "options": [
                "Not Applicable",
                "Engaged",
                "Docked"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Teleop Balance Partners",
        "ui": {
            "type": "radio",
            "options": [
                "Not Applicable",
                "Alone",
                "1 Partner",
                "2 Partners"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Post Game",
        "ui": {
            "type": "header"
        }
    },
    {
        "title": "Team Points Scored",
        "ui": {
            "type": "number"
        },
        "dataType": "8bit"
    },
    {
        "title": "Penalties",
        "ui": {
            "type": "number"
        },
        "dataType": "6bit"
    },
    {
        "title": "Quality Of Defense",
        "ui": {
            "type": "slider"
        },
        "dataType": "4bit"
    },
    {
        "title": "Quality Under Defense",
        "ui": {
            "type": "slider"
        },
        "dataType": "4bit"
    },
    {
        "title": "Speed",
        "ui": {
            "type": "slider"
        },
        "dataType": "4bit"
    },
    {
        "title": "Driver Skill",
        "ui": {
            "type": "slider"
        },
        "dataType": "4bit"
    },
    {
        "title": "Cycle Speed",
        "ui": {
            "type": "radio",
            "options": [
                "Slow",
                "Medium",
                "Fast"
            ]
        },
        "dataType": "2bit"
    },
    {
        "title": "Broke Down / Disconnected",
        "ui": {
            "type": "toggle"
        },
        "dataType": "boolean"
    },
    {
        "title": "Comments",
        "ui": {
            "type": "text"
        },
        "dataType": "string"
    }
]

const form = testForm.filter(e => e.ui.type != "header")

const ScanPage = () => {
    const webcamRef = useRef()

    useEffect(() => {
        const scan = (e) => {
            if (e.code != "Space") return

            const snapshot = webcamRef.current.getScreenshot()

            const tempImg = new Image()
            tempImg.src = snapshot
            tempImg.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = 640
                canvas.height = 480

                const ctx = canvas.getContext("2d")
                
                ctx.drawImage(tempImg, 0, 0, 640, 480)
                const imageData = ctx.getImageData(0, 0, 640, 480)

                const output = jsqr(imageData.data, 640, 480)

                if(output == null){
                    alert("Failed to scan qr code. Make sure the image is not blurry and contains a valid qr code.")
                } else {
                    const buffer = []

                    for (let i = 0;i<output.data.length;i++) buffer.push(output.data.charCodeAt(i))

                    const data = generateDataFromBuffer(buffer, form)

                    const receipt = {
                        id: data.id,
                        entries: Object.fromEntries(form.map((entry, index) => {
                            const value =  entry.ui.hasOwnProperty("options") ? entry.ui.options[data.entries[index]] : data.entries[index]
                            
                            return [ entry.title, value ]
                        }))
                    }

                    console.log({ receipt })
                    
                    const allPersistentKeys = Object.keys(localStorage)

                    if(allPersistentKeys.includes("lancer-scout-data")){
                        try {
                            const json = JSON.parse(localStorage.getItem("lancer-scout-data"))

                            if(json.some(e => e.id == receipt.id)){
                                alert("Found duplicate copy of the scanned code in the database. If this is a mistake, please contact a programmer to validate the qr code receipt in console and json in local storage.")
                            } else {
                                json.push(receipt)

                                localStorage.setItem("lancer-scout-data", JSON.stringify(json))

                                alert("Successfully scanned qr code and added to database.")
                            }
                        } catch(e) {
                            alert("An issue occurred adding to database. Please contact a programmer to validate the json in local storage.")
                        }
                    } else {
                        localStorage.setItem("lancer-scout-data", JSON.stringify([ receipt ]))

                        alert("Successfully scanned qr code and added to database.")
                    }
                }
            }
        }

        window.addEventListener("keydown", scan)

        return () => window.removeEventListener("keydown", scan)
    }, [])

    return (
        <React.Fragment>
            <h1>Scan</h1>
            <div style={{ textAlign: "center" }}>
                <Webcam ref={webcamRef} />
                <h2>Press space to scan</h2>
            </div>
        </React.Fragment>
    )
}

export default ScanPage