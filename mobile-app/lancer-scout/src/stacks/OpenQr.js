import React, { useState } from "react"

import { View, Text, StyleSheet, Alert } from "react-native"

import QR from "../components/QR"
import Button from "../components/Button"

import { removeEntry } from "../scripts/storage"

import { colors } from "../constants"

const OpenQrStack = ({ route, navigation }) => {
    const { id, data, mode } = route.params

    const [deleted, setDeleted] = useState(false)
    const handleDelete = () => {
        if (deleted) return

        setDeleted(true)

        confirm("Are You Sure?\n\nIf you delete this qr code all of the scouting information for this entry will be lost.") ? removeEntry(id, mode).then(navigation.goBack) : setDeleted(false)

        // Alert.alert("Are You Sure?", "If you delete this qr code all of the scouting information for this entry will be lost.", [
        //     {
        //         text: "Cancel",
        //         style: "cancel",
        //         onPress: () => setDeleted(false)
        //     },
        //     {
        //         text: "Yes",
        //         onPress: () => removeEntry(id, mode).then(navigation.goBack)
        //     }
        // ])
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>Scan To Upload</Text>
            <QR data={data} />
            <View style={{ width: 300, marginTop: 10 }}>
                <Button handlePress={handleDelete} marginHorizontal={0}>Delete</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white
    },
    label: {
        fontFamily: "Open Sans",
        fontSize: 24,
        color: colors.black,
        marginBottom: 20
    }
})

export default OpenQrStack