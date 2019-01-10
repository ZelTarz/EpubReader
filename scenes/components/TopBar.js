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
  StatusBar
} from 'react-native';

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#cdcdcd",
    paddingTop: 20,
    top: 0,
    height: 64,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor:"#000",
    position: 'absolute',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    flex: 14
  },
  backButton: {
    width: 34,
    height: 34,
    margin: 20,
    flex: 1,
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row'
  },
  backButtonImage: {
    width: 30,
    height: 30,
  }
});


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    timing( this.state.fadeAnim, {
      toValue: 1,
      duration: 20
    }).start();

    this.barsShown = true;
  }

  hide() {
    const timing = Animated.timing;

    timing( this.state.fadeAnim, {
      toValue: 0,
      duration: 20
    }).start();


    this.barsShown = false;
  }

  render() {
    return (
      <Animated.View style={[styles.header, { opacity: this.state.fadeAnim }]}>
        <TouchableOpacity style={styles.backButton}
          onPress={this.props.onLeftButtonPressed}>
          <EvilIcon name="navicon" size={34} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton}
          onPress={this.props.onThemePressed}>
          <MaterialCommunityIcon name="theme-light-dark" size={34} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton}
          onPress={this.props.onFontIncrePressed}>
          <MaterialCommunityIcon name="format-font-size-increase" size={34} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton}
          onPress={this.props.onFontDecrePressed}>
          <MaterialCommunityIcon name="format-font-size-decrease" size={34} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton}
          onPress={this.props.onRightButtonPressed}>
          <EvilIcon name="gear" size={34} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default TopBar;
