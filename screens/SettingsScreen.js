import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";
import { Button } from "react-native-elements";

const mapDispatchToProps = {
  clearLikedJobs
};
class SettingsScreen extends Component {
  static navigationOptions = () => ({
    title: "Settings"
  });
  render() {
    return (
      <View style={{ padding: 20 }}>
        <Button
          title="Reset Liked Jobs"
          buttonStyle={{ backgroundColor: "#E43F3F", height: 60 }}
          onPress={() => {
            this.props.clearLikedJobs();
            this.props.navigation.navigate("review");
          }}
          icon={{ name: "delete-forever", color: "white" }}
        />
      </View>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
