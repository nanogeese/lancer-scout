// const validateSchema = (schema) => {
//     if (!Array.isArray(schema)) return {
//         success: false,
//         reason: `Schema must be of type array. Found schema of type ${typeof schema}.`
//     }

//     schema.forEach((prompt, index) => {
//         if (typeof prompt != "object") return {
//             success: false,
//             reason: `Prompts must be of type object. Found prompt of type ${typeof prompt} at index ${index}.`
//         }

//         const promptKeys = Object.keys(prompt)

//         if (!promptKeys.includes("title")) return {
//             success: false,
//             reason: `Prompts must include a title. No title found in prompt at index ${index}.`
//         }

//         if (typeof prompt.title != "string") return {
//             success: false,
//             reason: `Prompts' title must be of type string. Found title of type ${typeof prompt.type} in prompt at index ${index}.`
//         }

//         if (!promptKeys.includes("ui")) return {
//             success: false,
//             reason: `Prompts must include a ui. No ui found in prompt at index ${index}.`
//         }

//         if (typeof prompt.ui != "object") return {
//             success: false,
//             reason: `Prompts' ui must be of type object. Found ui of type ${typeof prompt.ui} in prompt at index ${index}.`
//         }

//         const uiKeys = Object.keys(prompt.ui)

//         if (!uiKeys.includes("type")) return {
//             success: false,
//             reason: `Prompts' ui must include a type. No type found in ui of prompt at index ${index}.`
//         }

//         if (!["header", "text", "number", "timer", "slider", "toggle", "radio", "dropdown"].includes(prompt.ui.type)) return {
//             success: false,
//             reason: `Prompts' ui must include a type equal to "header", "text", "number", "timer", "slider", "toggle", "radio", or "dropdown". Found type with value ${prompt.ui.type} in ui of prompt at index ${index}.`
//         }
        
//         if(prompt.ui.type != "header"){
//             if (!promptKeys.includes("dataType")) return {
//                 success: false,
//                 reason: `Non-header prompts must include a dataType. No dataType found in prompt at index ${index}.`
//             }

//             if (!["boolean", "string", "4bit", "6bit", "8bit", "16bit"].includes(prompt.dataType)) return {
//                 success: false,
//                 reason: `Non-header prompts must include a dataType equal to "boolean", "string", "4bit", "6bit", "8bit", or "16bit". Found dataType with value ${prompt.dataType} in prompt at index ${index}.`
//             }

//             if (prompt.ui.type == "toggle" && prompt.dataType != "boolean") return {
//                 success: false,
//                 reason: `Toggle prompts must have a dataType of "boolean". Found dataType with value ${prompt.dataType} in prompt at index ${index}.`
//             }

//             if (prompt.ui.type == "text" && prompt.dataType != "string") return {
//                 success: false,
//                 reason: `Text prompts must have a dataType of "string". Found dataType with value ${prompt.dataType} in prompt at index ${index}.`
//             }

//             if ((prompt.ui.type != "toggle" && prompt.ui.type != "text") && !["4bit", "6bit", "8bit", "16bit"].includes(prompt.dataType)) return {
//                 success: false,
//                 reason: `Number or option based prompts must have a numeric dataType ("4bit", "6bit", "8bit", or "16bit"). Found dataType with value ${prompt.dataType} in prompt at index ${index}.`
//             }

//             if(prompt.ui.type == "radio" || prompt.ui.type == "dropdown"){
//                 if (!uiKeys.includes("options")) return {
//                     success: false,
//                     reason: `Option based prompts' ui must include options. No options found in prompt at index ${index}.`
//                 }

//                 if (!Array.isArray(prompt.ui.options)) return {
//                     success: false,
//                     reason: `Option based prompt ui options must be of type array. Found options of type ${prompt.ui.options} in ui of prompt at index ${index}.`
//                 }

//                 if (!prompt.ui.options.every(option => typeof option == "string")) return {
//                     success: false,
//                     reason: `Option based prompt ui options must be of type string. Found option with a non-string type in ui of prompt at index ${index}.`
//                 }

//                 if (prompt.ui.options.length == 0) return {
//                     success: false,
//                     reason: `Option based prompt ui options array must not be empty. Found empty options in ui of prompt at index ${index}.`
//                 }
//             }
//         }
//     })

//     return {
//         success: true
//     }
// }

const validateSchema = (schema) => {
    return {
        success: true
    }
}

export default validateSchema