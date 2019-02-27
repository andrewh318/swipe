import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import Slides from "../components/slides/Slides";
import { AppLoading } from "expo";

const SLIDE_DATA = [
  { text: "Welcome to Swipe" },
  { text: "Set your location, then swipe away!" },
  { text: "Save your favourite jobs to review for later" }
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem("fb_token");
    if (token) {
      this.setState({ token: token });
      this.props.navigation.navigate("map");
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete() {
    this.props.navigation.navigate("auth");
  }

  render() {
    if (this.state.token === null) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1, marginTop: 24 }}>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete.bind(this)}
        />
      </View>
    );
  }
}

export default WelcomeScreen;
