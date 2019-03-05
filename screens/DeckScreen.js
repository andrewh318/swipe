import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Card, Button, Icon } from "react-native-elements";
import Swiper from "../components/swiper/swiper";
import HTML from "react-native-render-html";
import { likeJob } from "../actions/";

const mapStateToProps = ({ jobs, likes }) => {
  return {
    jobs: jobs.results,
    likedJobs: likes.likedJobs
  };
};

const mapDispatchToProps = {
  likeJob
};

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Jobs",
    tabBarIcon: ({tintColor}) => {
      return <Icon name="description" size={25} color={tintColor}/>
    }
  }

  constructor(props) {
    super(props);

    this.renderCard = this.renderCard.bind(this);
    this.renderNoMoreCards = this.renderNoMoreCards.bind(this);
    this.handleLikeJob = this.handleLikeJob.bind(this);
  }

  formatJobDesc(jobDescription) {
    if (jobDescription.length > 200) {
      jobDescription = jobDescription.substr(0, 200) + "...";
    }
    return jobDescription;
  }

  renderCard(job) {
    const formattedJobDesc = this.formatJobDesc(job.description);
    return (
      <Card title={job.title} containerStyle={styles.containerStyle}>
        <View style={{ height: 300, marginBottom: 20 }}>
          {/* <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={true}
            initialRegion={{
              longitude: -122,
              latitude: 37,
              longitudeDelta: 0.04,
              latitudeDelta: 0.09
            }}
          /> */}
          <Image source={require("../assets/maps-placeholder.png")} style={{height: 300, width: 350}} />
        </View>
        <View style={styles.detailsWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.type}</Text>
        </View>
        <HTML html={formattedJobDesc} />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="No more jobs!">
        <Button
          title="Back To Map"
          icon={{ name: "my-location", color: "white" }}
          buttonStyle={{ backgroundColor: "#E43F3F", height: 50 }}
          onPress={() => {
            this.props.navigation.navigate("map");
          }}
        />
      </Card>
    );
  }

  handleLikeJob(job) {
    const containsLikedJob = this.props.likedJobs.some(val => {
      return val.id == job.id;
    });

    if (!containsLikedJob) {
      this.props.likeJob(job);
    }
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Swiper
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.handleLikeJob}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  containerStyle: {
    height: 600
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckScreen);
