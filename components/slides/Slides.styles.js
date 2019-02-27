import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;


export default StyleSheet.create({
    sectionStyle: {
        flex: 1,
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 30,
        textAlign: "center",
        color: "#FFF",
        opacity: 0.8

    },
    slideStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH,
        backgroundColor: "#E43F3F",
        padding: 20
    },
    buttonStyle: {
        backgroundColor: "#CC1D1D",
        marginTop: 15,
    }
});
