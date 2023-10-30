import React, { useRef } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { colors } from "../constants"

// match id for qr code is same as matchTimestamp so pass it in as one variable
const MatchListItem = ({ matchTimestamp, data, navigation, mode }) => {
    const pressInOffset = useRef(new Animated.Value(-4)).current

    const date = new Date(matchTimestamp)
    
    const dateString = date.toDateString() + " at " + (date.getHours() % 12) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getHours() > 12 ? "pm" : "am")

    const handlePress = () => navigation.push("OpenQr", { id: matchTimestamp, data, mode })

    const handlePressIn = () => {
        Animated.timing(pressInOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(pressInOffset, {
            toValue: -4,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={styles.wrapper}>
                <View style={styles.undershadow} />
                <Animated.View style={{ ...styles.container, top: pressInOffset }}>
                    <Text style={styles.date}>
                        {
                            dateString
                        }
                    </Text>
                    <FontAwesomeIcon icon={faChevronRight} size={24} color={colors.crimson} />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        marginTop: 10
    },
    undershadow: {
        position: "absolute",
        width: "100%",
        height: 60,
        backgroundColor: colors.pink,
        borderRadius: 10
    },
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderRadius: 10
    },
    date: {
        // fontFamily: "",
        fontSize: 18,
        color: colors.black
    }
})

export default MatchListItem