import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";

import styles from "./Slides.styles";
import { Button } from "react-native-elements";

class Slides extends Component {
  renderLastSlide() {
    return (
      <Button
        title="Lets Go!"
        buttonStyle={styles.buttonStyle}
        onPress={this.props.onComplete}
      />
    );
  }

  renderSlides = () => {
    return this.props.data.map((slide, index) => {
      return (
        <View style={styles.slideStyle} key={slide.text}>
          <View style={styles.sectionStyle} />
          <View style={styles.sectionStyle}>
            <Text style={styles.textStyle}>{slide.text}</Text>
          </View>
          <View style={[styles.sectionStyle, { justifyContent: "flex-start" }]}>
            {index === this.props.data.length - 1
              ? this.renderLastSlide()
              : null}
          </View>
        </View>
      );
    });
  };
  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

export default Slides;
