import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from "./types";

const APP_ID = "1968555793452248";

// Using AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

// thunk
export const facebookLogin = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem("fb_token");
        if (token) {
            // Dispatch an action saying FB login is done
            dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
        } else {
            // Start up FB Login process
            doFacebookLogin(dispatch);
        }
    }
}

const doFacebookLogin = async (dispatch) => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ["public_profile"]
    });

    if (type === "cancel") {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL})
    }

    await AsyncStorage.setItem("fb_token", token);
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
}