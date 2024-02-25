import React, { useRef } from "react"

import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated } from "react-native"

import { colors } from "../constants"

const Button = ({ children, handlePress, marginHorizontal=40 }) => {
    const scale = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={{ ...styles.wrapper , marginHorizontal }}>
                <Animated.View style={{ ...styles.container, transform: [{ scale }] }}>
                    <Text style={styles.text}>
                        {
                            children
                        }
                    </Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        marginTop: 10,
        marginBottom: 0
    },
    container: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.pink,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.crimson
    },
    text: {
        fontFamily: "Open Sans",
        fontWeight: "500",
        fontSize: 18,
        color: colors.black
    }
})

export default Button