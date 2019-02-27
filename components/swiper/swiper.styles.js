import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;


export default StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    },
    topCard: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        elevation: 4
    }
  });
  