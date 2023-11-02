// import { initialWindowMetrics } from "react-native-safe-area-context"

const screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    top: 0,
    bottom: 0
    // width: initialWindowMetrics.frame.width - initialWindowMetrics.insets.left - initialWindowMetrics.insets.right,
    // height: initialWindowMetrics.frame.height - initialWindowMetrics.insets.top - initialWindowMetrics.insets.bottom,
    // top: initialWindowMetrics.insets.top,
    // bottom: initialWindowMetrics.insets.bottom
}

const colors = {
    white: "rgb(245, 245, 245)",
    grey: "rgb(220, 220, 220)",
    dark: "rgb(90, 90, 90)",
    black: "rgb(20, 20, 20)",
    crimson: "rgb(184, 1, 0)",
    pink: "rgb(250, 180, 180)",
}

export {
    screen,
    colors
}