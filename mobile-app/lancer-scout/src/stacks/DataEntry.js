import React, { useRef, useState, useEffect } from "react"

import { TouchableWithoutFeedback, ScrollView, View, Text, StyleSheet } from "react-native"

import Input from "../components/Input"

import { generateBufferFromData } from "../scripts/dataBuffer"
import { addEntry } from "../scripts/storage"

import { screen, colors } from "../constants"

const DataEntryStack = ({ route, navigation }) => {
    const ref = useRef()

    const { form, mode } = route.params
    const [inputState, setInputState] = useState([]) // stores relative render y of headers, stored here for convenience

    const rawKeyboardHeight = 80 // hardcoded since dynamic one causes internal memory leak
    const keyboardHeight = Math.max(0, rawKeyboardHeight - (70 + screen.bottom))

    const [scrollable, setScrollable] = useState(true)

    useEffect(() => {
        const defaultInputs = []

        form.forEach(input => {
            let defaultInput = null
            
            switch(input.ui.type){
                case "text":
                    defaultInput = ""
                    break
                case "number":
                    defaultInput = 0
                    break
                case "timer":
                    defaultInput = 0
                    break
                case "slider":
                    defaultInput = 0
                    break
                case "toggle":
                    defaultInput = false
                    break
                case "radio":
                    defaultInput = 0
                    break
                case "dropdown":
                    defaultInput = 0
                    break
            }

            defaultInputs.push(defaultInput)
        })

        setInputState(defaultInputs)
    }, [])

    const setInput = (index, value) => {
        const temp = [...inputState]
        temp[index] = value
        setInputState(temp)
    }

    const [saved, setSaved] = useState(false)
    const saveInputs = () => {
        if (saved) return
        
        setSaved(true)

        const id = Date.now()

        const inputs = []
        form.forEach((question, index) => {
            if (question.ui.type != "header") inputs.push(typeof inputState[index] == "number" ? Math.round(inputState[index]) : inputState[index])
        })

        console.log({ inputs })

        const buffer = generateBufferFromData({
            form: form.filter(question => question.ui.type != "header"),
            id,
            entries: inputs
        })

        addEntry({
            id,
            buffer
        }, mode).then(navigation.goBack)
    }

    const linkRenders = []
    form.forEach((item, index) => {
        if(item.ui.type == "header"){
            linkRenders.push(
                <TouchableWithoutFeedback key={index} onPress={() => {
                    // ReactNativeHapticFeedback.trigger("impactLight", { enableVibrateFallback: false })
                    ref.current.scrollTo({
                        x: 0,
                        y: inputState[index] - 10,
                        animated: true
                    })
                }}>
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>
                            {
                                item.title
                            }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    })

    const inputRenders = []
    inputState.forEach((item, index) => {
        inputRenders.push(
            <Input key={index} value={item} setValue={value => setInput(index, value)} {...form[index]} setScrollable={setScrollable} />
        )
    })

    return (
        <View style={{ flex: 1 }}>
            {
                linkRenders.length > 0 ? (
                    <View><ScrollView style={styles.linksContainer} contentContainerStyle={{ paddingRight: 10 }} horizontal showsHorizontalScrollIndicator={false} children={linkRenders} /></View>
                ) : <View style={{ height: 1, backgroundColor: colors.crimson }} />
            }
            <ScrollView ref={ref} style={styles.inputsContainer} showsVerticalScrollIndicator={false} scrollEnabled={scrollable}>
                {
                    inputRenders
                }
                <TouchableWithoutFeedback onPress={saveInputs}>
                    <View style={[styles.buttonContainer, { marginBottom: 20 + rawKeyboardHeight }]}>
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    inputsContainer: {
        flexGrow: 1,
        backgroundColor: colors.grey
    },
    linksContainer: {
        width: "100%",
        height: 80,
        paddingVertical: 10,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.crimson
    },
    linkContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginLeft: 10,
        backgroundColor: colors.pink,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.crimson
    },
    linkText: {
        // fontFamily: "Open Sans",
        fontWeight: "500",
        fontSize: 18,
        color: colors.black
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 120,
        margin: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.crimson,
        backgroundColor: colors.white
    },
    buttonText: {
        // fontFamily: "Open Sans",
        fontWeight: "700",
        fontSize: 20,
        color: colors.crimson
    }
})

export default DataEntryStack