import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements"
import { MapView } from "expo";
import { connect } from "react-redux";
import { fetchJobs } from "../actions";

const mapDispatchToProps = {
  fetchJobs
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({tintColor}) => {
      return <Icon name="my-location" size={25} color={tintColor}/>
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    };
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  onButtonPress() {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
        />
        <View style={styles.buttonContainer}>
          <Button 
            raised
            buttonStyle={{backgroundColor: "#E43F3F", height: 50, borderRadius: 50}}
            icon = {{name: "search", color: "white"}}
            title="Find Jobs!"
            onPress={this.onButtonPress.bind(this)}/>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MapScreen);

const styles = {
  buttonContainer: {
    position: 'absolute', 
    bottom: 20,
    left: 0,
    right: 0,
    margin: 20
  }
}