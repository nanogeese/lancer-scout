import React, { useState } from "react"

import { View, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native"

import Button from "../components/Button"

import { setSchema } from "../scripts/storage"

import { colors } from "../constants"

const UploadSchemaStack = ({ route, navigation }) => {
    const { mode } = route.params

    const [inputSchemaURL, setInputSchemaURL] = useState("")

    const [uploaded, setUploaded] = useState(false)
    const uploadSchema = async () => {
        if (uploaded) return

        setUploaded(true)

        const validationStatus = await setSchema(inputSchemaURL, mode)

        if(validationStatus.success){
            navigation.goBack()
        } else {
            alert("Failed To Upload Schema\n\n" + validationStatus.reason)
            // Alert.alert("Failed To Upload Schema", status.reason)

            setUploaded(false)
        }
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder={"Paste URL to schema for " + mode + " Scouting here"} placeholderTextColor={colors.dark} value={inputSchemaURL} onChangeText={setInputSchemaURL} multiline />
                <Button handlePress={uploadSchema}>Upload</Button>
            </View>
        // </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        flex: 1,
        backgroundColor: colors.white
    },
    input: {
        margin: 10,
        padding: 10,
        maxHeight: 200,
        borderRadius: 10,
        backgroundColor: colors.grey
    }
})

export default UploadSchemaStack