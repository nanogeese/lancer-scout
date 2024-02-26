import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import to from "await-to-js"

import validateSchema from "./validateSchema"

const getSchema = async (mode) => {
    const allKeys = await AsyncStorage.getAllKeys()

    if(allKeys.includes("lancer-scout-schema-" + mode)){
        const schema = await AsyncStorage.getItem("lancer-scout-schema-" + mode)

        const json = JSON.parse(schema)

        return json
    } else {
        await AsyncStorage.setItem("lancer-scout-schema-" + mode, JSON.stringify([]))

        return []
    }
}

const setSchema = async (schemaURL, mode) => {
    const [err, res] = await to(axios.get(schemaURL))

    if (err) return {
        success: false,
        reason: "Unable to retrieve the provided URL. Please make sure you are connected to wifi and the provided URL exists."
    }

    const schema = res.data
    const status = validateSchema(schema, mode)

    if (status.success) await AsyncStorage.setItem("lancer-scout-schema-" + mode, typeof schema == "string" ? schema : JSON.stringify(schema))

    return status
}

const getEntries = async (mode) => {
    const allKeys = await AsyncStorage.getAllKeys()

    if(allKeys.includes("lancer-scout-entries-" + mode)){
        const entries = await AsyncStorage.getItem("lancer-scout-entries-" + mode)

        const json = JSON.parse(entries)

        return json
    } else {
        await AsyncStorage.setItem("lancer-scout-entries-" + mode, JSON.stringify([]))

        return []
    }
}

const addEntry = async (entry, mode) => {
    const entries = await getEntries(mode)

    const updated = [ ...entries, entry ]

    await AsyncStorage.setItem("lancer-scout-entries-" + mode, JSON.stringify(updated))
}

const removeEntry = async (id, mode) => {
    const entries = await getEntries(mode)

    const updated = entries.filter(e => e.id != id)

    await AsyncStorage.setItem("lancer-scout-entries-" + mode, JSON.stringify(updated))
}

export {
    getSchema,
    setSchema,
    getEntries,
    addEntry,
    removeEntry
}