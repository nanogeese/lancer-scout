import React, { useCallback } from "react"
import { View } from "react-native"

import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChessKnight, faComments, faGear } from "@fortawesome/free-solid-svg-icons"

import MatchTab from "./src/tabs/Match"
import PitTab from "./src/tabs/Pit"

import { colors } from "./src/constants"

const App = () => {
    const [fontsLoaded] = useFonts({ "Open Sans": require("./assets/fonts/OpenSans.ttf") })
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) await SplashScreen.hideAsync()
    }, [fontsLoaded])
    
    if (!fontsLoaded) return null

    const Tab = createBottomTabNavigator()

    const icons = {
        "Match": faChessKnight,
        "Pit": faComments,
        "Settings": faGear
    }
    
    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName={"Match"} screenOptions={({ route }) => {
                    return {
                        headerShown: false,
                        tabBarInactiveTintColor: colors.dark,
                        tabBarActiveTintColor: colors.crimson,
                        tabBarStyle: {
                            paddingTop: 10,
                            marginBottom: 10,
                            borderTopWidth: 1,
                            borderTopColor: colors.crimson
                        },
                        tabBarLabelStyle: {
                            marginTop: 6
                        },
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <FontAwesomeIcon icon={icons[route.name]} color={color} size={size} />
                            )
                        }
                    }
                }}>
                    <Tab.Screen name={"Match"} component={MatchTab} />
                    <Tab.Screen name={"Pit"} component={PitTab} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default App