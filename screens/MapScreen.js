import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-elements";
import { MapView } from "expo";
import { connect } from "react-redux";
import { fetchJobs } from "../actions";
import Spinner from "react-native-loading-spinner-overlay";

const mapDispatchToProps = {
  fetchJobs
};

const mapStateToProps = ({ jobs }) => {
  return {
    isFetching: jobs.isFetching
  };
};

const initialRegion = {
  longitude: -122,
  latitude: 37,
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={25} color={tintColor} />;
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion
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
        {this.props.isFetching && (
          <Spinner
            visible={this.props.isFetching}
            color="#E43F3F"
            size="large"
            textContent={"Finding Jobs..."}
            textStyle={styles.spinnerTextStyle}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button
            raised
            buttonStyle={{
              backgroundColor: "#E43F3F",
              height: 50,
              borderRadius: 50
            }}
            icon={{ name: "search", color: "white" }}
            title="Find Jobs!"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    margin: 20
  },
  spinnerTextStyle: {
    color: "#FFF",
    fontSize: 15
  }
};
