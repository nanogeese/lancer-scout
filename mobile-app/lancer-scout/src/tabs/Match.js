import React from "react"

import { TouchableWithoutFeedback, View, Alert } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"

import DefaultStack from "../stacks/Default"
import DataEntry from "../stacks/DataEntry"
import UploadSchema from "../stacks/UploadSchema"
import OpenQr from "../stacks/OpenQr"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import { screen, colors } from "../constants"

const MatchTab = () => {
    const Stack = createStackNavigator()
    
    return (
        <Stack.Navigator initialRouteName={"Default"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Default"} initialParams={{ mode: "Match" }} component={DefaultStack} />
            <Stack.Screen name={"DataEntry"} component={DataEntry} options={{
                headerShown: true,
                headerTitle: "Scouting Form",
                headerStyle: {
                    height: 70,
                    backgroundColor: colors.white,
                    shadowOpacity: 0
                },
                headerTitleStyle: {
                    fontFamily: "Open Sans",
                    fontWeight: "700",
                    fontSize: 24,
                    color: colors.black
                },
                gestureEnabled: false,
                headerLeft: ({ onPress }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            // ReactNativeHapticFeedback.trigger("impactMedium", { enableVibrateFallback: false })
                            if (confirm("Are You Sure?\n\nIf you exit the page all of the scouting information for this entry will be lost.")) onPress()
                            // Alert.alert("Are You Sure?", "If you exit the page all of the scouting information for this entry will be lost.", [
                            //     {
                            //         text: "Cancel",
                            //         style: "cancel"
                            //     },
                            //     {
                            //         text: "Yes",
                            //         onPress
                            //     }
                            // ])
                        }}>
                            <View style={{ flex: 1, width: 80, alignItems: "center", justifyContent: "center" }}>
                                <FontAwesomeIcon icon={faChevronLeft} size={24} color={colors.crimson} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            }} />
            <Stack.Screen name={"UploadSchema"} component={UploadSchema} options={{
                headerShown: true,
                headerTitle: "Upload Schema",
                headerStyle: {
                    height: screen.top + 70,
                    backgroundColor: colors.white,
                    shadowOpacity: 0
                },
                headerTitleStyle: {
                    fontFamily: "Open Sans",
                    fontWeight: "700",
                    fontSize: 24,
                    color: colors.black
                },
                headerLeft: ({ onPress }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            // ReactNativeHapticFeedback.trigger("impactMedium", { enableVibrateFallback: false })
                            onPress()
                        }}>
                            <View style={{ flex: 1, width: 80, alignItems: "center", justifyContent: "center" }}>
                                <FontAwesomeIcon icon={faChevronLeft} size={24} color={colors.crimson} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            }} />
            <Stack.Screen name={"OpenQr"} component={OpenQr} options={{
                presentation: "modal"
            }} />
        </Stack.Navigator>
    )
}

export default MatchTab