import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

// Given an array of JsonObjects, it returns an array of the values under the key "field"
export function getFieldArray(scoutInputs: JsonObject[], field: string) {
    console.log("scoutInputs ", scoutInputs, " length", scoutInputs.length);
    let returnArray: Array<string | number | boolean> = [];
    for(let i = 0; i < scoutInputs.length; i++) {
        console.log(i, " I Want Out by Helloween and field found ", scoutInputs[i][field]); 
        returnArray.push(scoutInputs[i][field] as string | number | boolean);
    }
    console.log("Pull Me Under by Dream Theater and array of fields found ", returnArray.toString())
    return returnArray;

    // Create methods to find the type of the array
    // After, create a request system so that the JSON input will be fed in automatically
    // Could be a request over all matches, over all for a team, a match
}