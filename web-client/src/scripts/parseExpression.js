const evaluateExpression = (expression, variables) => {
    const nodes = []

    let parenthesisDepth = 0
    let quoteOpen = false

    let currentScan = ""

    while(expression.length > 0){
        const char = expression.substr(0, 1)
        expression = expression.slice(1)

        currentScan += char

        if(char == "\""){
            quoteOpen = !quoteOpen

            if (!quoteOpen && parenthesisDepth == 0) {
                const varName = currentScan.trim()

                nodes.push({
                    type: "value",
                    value: variables[varName.slice(1, varName.length - 1)]
                })

                currentScan = ""
            }
        } else if(!quoteOpen){
            if (char == "("){
                parenthesisDepth++
            } else if(char == ")"){
                parenthesisDepth--

                if(parenthesisDepth == 0){
                    const expression = currentScan.trim()

                    nodes.push({
                        type: "value",
                        value: evaluateExpression(expression.slice(1, expression.length - 1).trim(), variables)
                    })

                    currentScan = ""
                }
            } else if(["+", "-", "*", "/", "^"].includes(char)){
                if(parenthesisDepth == 0){
                    if (currentScan.slice(0, currentScan.length - 1).trim().length > 0) nodes.push({
                        type: "value",
                        value: parseFloat(currentScan.slice(0, currentScan.length - 1).trim())
                    })

                    nodes.push({
                        type: "operator",
                        value: char
                    })
        
                    currentScan = ""
                }
            }
        }
    }

    if (currentScan.trim().length > 0) nodes.push({
        type: "value",
        value: parseFloat(currentScan.trim())
    })
    
    if(nodes.length == 1){
        if (nodes[0].type != "value") throw new Error("Expected expression but receivced variable")

        return nodes[0].value
    }

    for(let i = 0;i<nodes.length-1;i++){
        if (nodes[i].type == "value" && nodes[i + 1].type == "value") nodes.splice(i + 1, 0, {
            type: "operator",
            value: "*"
        })
    }

    while(nodes.some(node => node.type == "operator" && node.value == "^")){
        const i = nodes.findIndex(node => node.type == "operator" && node.value == "^")

        nodes.splice(i - 1, 3, {
            type: "value",
            value: Math.pow(nodes[i - 1].value, nodes[i + 1].value)
        })
    }

    while(nodes.some(node => node.type == "operator" && (node.value == "*" || node.value == "/"))){
        const i = nodes.findIndex((node => node.type == "operator" && (node.value == "*" || node.value == "/")))

        if(nodes[i].value == "*"){
            nodes.splice(i - 1, 3, {
                type: "value",
                value: nodes[i - 1].value * nodes[i + 1].value
            })
        } else {
            nodes.splice(i - 1, 3, {
                type: "value",
                value: nodes[i - 1].value / nodes[i + 1].value
            })
        }
    }

    for(let i = 0;i<nodes.length - 1;i++){
        if(nodes[i].type == "operator" && nodes[i + 1].type == "operator") throw new Error("Cannot have two operators in a row")
    }

    while(nodes.some(node => node.type == "operator" && node.value == "-")){
        const i = nodes.findIndex((node => node.type == "operator" && node.value == "-"))
        
        nodes.splice(i, 2, {
            type: "operator",
            value: "+"
        }, {
            type: "value",
            value: -nodes[i + 1].value
        })
    }

    if (nodes[0].type == "operator" && nodes[0].value == "+") nodes.splice(0, 1)

    while(nodes.some(node => node.type == "operator" && node.value == "+")){
        const i = nodes.findIndex((node => node.type == "operator" && node.value == "+"))
        
        nodes.splice(i - 1, 3, {
            type: "value",
            value: nodes[i - 1].value + nodes[i + 1].value
        })
    }
    
    return nodes[0].value
}

console.log(evaluateExpression("\"Points\" * 3 + \"Offense\" ^ (1/2)", {
    "Points": 1,
    "Offense": 2,
    "RP": 3
}))