import React, { Component } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MapView } from "expo";

function mapStateToProps({ likes }) {
  return {
    likedJobs: likes.likedJobs
  };
}

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
      <Icon
        name="settings"
        size={25}
        color="#FFF"
        onPress={() => {
          navigation.navigate("settings");
        }}
      />
    )
  });

  formatJobDate(date) {
    const tokens = date.split(" ");
    const formattedDate = tokens[0] + " " + tokens[1] + " " + tokens[2];

    // alternatively, you could return this in 'Posted X days ago' form instead
    return formattedDate;
  }

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, created_at, url, title, id } = job;
      return (
        <Card title={title} titleStyle={{ fontSize: 15 }} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={true}
              scrollEnabled={false}
              initialRegion={{
                longitude: -122,
                latitude: 37,
                longitudeDelta: 0.04,
                latitudeDelta: 0.09
              }}
            />
            <View style={styles.detailsWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{this.formatJobDate(created_at)}</Text>
            </View>
            <Button
              title="Apply Now!"
              onPress={() => Linking.openURL(url)}
              buttonStyle={{ backgroundColor: "#E43F3F" }}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  detailsWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  italics: {
    fontStyle: "italic"
  }
};

export default connect(mapStateToProps)(ReviewScreen);
