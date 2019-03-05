import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { facebookLogin } from "../actions";

const mapDispatchToProps = {
  facebookLogin
};

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token
  };
};

class AuthScreen extends Component {
  componentDidMount() {
    this.props.navigation.addListener("didFocus", this.props.facebookLogin);
    this.navigateIfAuthComplete(this.props);
    // for test purposes
    // AsyncStorage.removeItem("fb_token");
  }

  componentDidUpdate() {
    this.navigateIfAuthComplete(this.props);
  }

  navigateIfAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate("map");
    }
  }

  render() {
    return <View />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
