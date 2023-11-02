import React, { useState } from "react"

import { View, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native"

import Button from "../components/Button"

import { setSchema } from "../scripts/storage"

import { colors } from "../constants"

const UploadSchemaStack = ({ route, navigation }) => {
    const { mode } = route.params

    const [inputSchema, setInputSchema] = useState("[]")

    const [uploaded, setUploaded] = useState(false)
    const uploadSchema = async () => {
        if (uploaded) return

        setUploaded(true)

        const status = await setSchema(inputSchema, mode)

        if(status.success){
            navigation.goBack()
        } else {
            alert("Failed To Upload Schema\n\n" + status.reason)
            // Alert.alert("Failed To Upload Schema", status.reason)

            setUploaded(false)
        }
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.wrapper}>
                <TextInput style={styles.input} value={inputSchema} onChangeText={setInputSchema} multiline />
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