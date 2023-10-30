import React, { useState } from "react"

import { View, Text, TextInput, StyleSheet, Alert } from "react-native"

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
            Alert.alert("Failed To Upload Schema", status.reason)

            setUploaded(false)
        }
    }

    return (
        <View>
            <Text>
                Paste Schema JSON Below
            </Text>
            <TextInput style={{ backgroundColor: colors.grey }} value={inputSchema} onChangeText={setInputSchema} />
            <Button handlePress={uploadSchema}>Upload</Button>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default UploadSchemaStack