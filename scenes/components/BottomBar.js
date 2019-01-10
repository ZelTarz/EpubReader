import React, { Component } from 'react';

import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  Slider
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons'

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#cdcdcd",
    paddingTop: 0,
    bottom: 0,
    height: 54,
    right: 0,
    left: 0,
    borderTopWidth: 1,
    borderTopColor:"#000",
    position: 'absolute',
    alignItems:'stretch',
    justifyContent:'center',
    flexDirection: 'column'
  },
  slider: {
    height: 30,
    alignItems:'center',
    justifyContent:'center',

    flex: 1,
    marginLeft: 50,
    marginRight: 50
  },
  location: {
    height: 30,
    alignItems:'center',
    alignSelf:'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
});

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 0,
      totalLocations: 0,
      percentage: 0, 
      fadeAnim: new Animated.Value(1),
    };


    this.barsShown = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shown !== this.props.shown) {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const timing = Animated.timing;

    Animated.sequence([
      timing( this.state.fadeAnim, {
        toValue: 1,
        duration: 20
      })
    ]).start();

    this.barsShown = true;
  }

  hide() {
    const timing = Animated.timing;

    Animated.sequence([
      timing( this.state.fadeAnim, {
        toValue: 0,
        duration: 20
      })
    ]).start();


    this.barsShown = false;
  }

  render() {
    return (
      <Animated.View style={[styles.footer, { opacity: this.state.fadeAnim }]}>
        <Slider
            style={styles.slider}
            disabled={this.props.disabled}
            value={this.props.value}
            onSlidingComplete={this.props.onSlidingComplete} 
        />
        <Text style={styles.location}>
          Location {this.props.location} of {this.props.totalLocations} - {this.props.percentage}%
        </Text>
      </Animated.View>
    );
  }
}

export default BottomBar;
