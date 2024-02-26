import React, { useState, useEffect } from "react"

import { SafeAreaView, View, ScrollView, Text, StyleSheet } from "react-native"

import MatchListItem from "../components/ScoutListItem"
import Button from "../components/Button"

import { getSchema, getEntries, setSchema } from "../scripts/storage"

import { colors } from "../constants"
import { generateDataFromBuffer } from "../scripts/dataBuffer"

const DefaultStack = ({ route, navigation }) => {
    const { mode } = route.params

    const [form, setForm] = useState([])
    const [entries, setEntries] = useState([])

    useEffect(() => {
        const pullLatestSchemaAndEntries = () => {
            getSchema(mode).then(storedSchema => {
                setForm(storedSchema)

                const filteredSchema = storedSchema.filter(e => e.ui.type != "header") || []

                getEntries(mode).then(storedEntries => {
                    const filteredEntries = storedEntries.filter((storedEntry) => {
                        const buffer = []
                        
                        for (let i = 0;i<storedEntry.buffer.length;i++) buffer.push(storedEntry.buffer.charCodeAt(i))

                        return generateDataFromBuffer(buffer, filteredSchema) != null
                    })

                    setEntries(filteredEntries)
                })
            })
        }

        pullLatestSchemaAndEntries()

        navigation.addListener("state", pullLatestSchemaAndEntries)
    }, [])

    const matchListItemRenders = []

    entries.reverse().forEach(entry => {
        matchListItemRenders.push(
            <MatchListItem key={entry.id} matchTimestamp={entry.id} data={entry.buffer} navigation={navigation} mode={mode} />
        )
    })

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{ mode } Scouting Hub</Text>
            </View>
            <ScrollView style={{ backgroundColor: colors.grey }}>
                <Button handlePress={() => navigation.push("DataEntry", { form, mode })}>Start { mode } Scouting</Button>
                <Button handlePress={() => navigation.push("UploadSchema", { mode })}>Upload { mode } Schema</Button>
                <View style={{ height: 6 }} />
                {
                    matchListItemRenders.length > 0 ?
                        matchListItemRenders :
                        <React.Fragment>
                            <View style={{ marginTop: 4, height: 1, backgroundColor: colors.crimson }} />
                            <Text style={styles.emptyList}>No Scouting Entries Yet</Text>
                        </React.Fragment>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.crimson
    },
    headerText: {
        fontFamily: "Open Sans",
        fontWeight: "700",
        fontSize: 24,
        color: colors.black
    },
    emptyList: {
        marginTop: 20,
        fontFamily: "Open Sans",
        fontSize: 24,
        color: colors.crimson,
        textAlign: "center"
    }
})

export default DefaultStack