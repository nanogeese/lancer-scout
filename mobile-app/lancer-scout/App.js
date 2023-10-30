import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChessKnight, faComments, faGear } from "@fortawesome/free-solid-svg-icons"

import MatchTab from "./src/tabs/Match"
import PitTab from "./src/tabs/Pit"

import { colors } from "./src/constants"

const App = () => {
    const Tab = createBottomTabNavigator()

    const icons = {
        "Match": faChessKnight,
        "Pit": faComments,
        "Settings": faGear
    }
    
    return (
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
    )
}

export default App