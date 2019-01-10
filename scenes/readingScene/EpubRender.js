import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  StatusBar
} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Epub, Streamer } from "epubjs-rn";

import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import Nav from '../components/Nav'

const tmpthemes={
  tan: {
    body: {
      "-webkit-user-select": "none",
      "user-select": "none",
      "background-color": "tan"
    }
  },
  white: {
    body: {
      "-webkit-user-select": "none",
      "user-select": "none",
      "background-color": "white"
    }
  }
}

class EpubReader extends Component {

  constructor(props) {
    super(props);


    
    this.state = {
      flow: "paginated", // paginated || scrolled-continuous
      location: 0,
      totalLocations: 0,      
      src: "",
      origin: "",
      title: "",
      toc: [],
      showBars: true,
      showNav: false,
      sliderDisabled: true,
      fontSize: '15px',
      theme: 'white'
    };

    this.streamer = new Streamer();
  }

  componentDidMount() {

    const { navigation } = this.props;
    const epubLink = navigation.getParam('url', 'NO-URL');

    this.streamer.start()
      .then((origin) => {
        this.setState({origin})
        return this.streamer.get(epubLink);
      })
      .then((src) => {
        return this.setState({src});
      });

    setTimeout(() => this.toggleBars(), 1000);
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  toggleBars() {
    this.setState({ showBars: !this.state.showBars });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar hidden={!this.state.showBars}/>
        <Epub style={styles.reader}
              ref="epub"
              src={this.state.src}
              flow={this.state.flow}
              location={this.state.location}
              fontSize={this.state.fontSize}
              
              onLocationChange={(visibleLocation)=> {
                this.setState({visibleLocation});
                console.log("locationChanged", visibleLocation)
              }}
              onLocationsReady={(locations)=> {
                console.log("location total", locations.total);
                this.setState({totalLocations: locations.total});
                this.setState({sliderDisabled : false});
              }}
              onReady={(book)=> {
                console.log("Book", book.package.metadata)
                console.log("Metadata", book.package.metadata)
                console.log("Table of Contents", book.navigation.toc)
                this.setState({
                  title : book.package.metadata.title,
                  toc: book.navigation.toc
                });
              }}

              onPress={(cfi, position, rendition)=> {
                this.toggleBars();
                // console.log("press", cfi);
              }}

              onLongPress={(cfi, rendition)=> {
                // console.log("longpress", cfi);
              }}

              onViewAdded={(index) => {
                // console.log("added", index)
              }}

              beforeViewRemoved={(index) => {
                // console.log("removed", index)
              }}

              onSelected={(cfiRange, rendition) => {
                // console.log("selected", cfiRange)
                // Add marker
                // rendition.highlight(cfiRange, {});
              }}

              onMarkClicked={(cfiRange) => {
                // console.log("mark clicked", cfiRange)
              }}

              themes={tmpthemes}
              theme={this.state.theme}
              // regenerateLocations={true}
              // generateLocations={true}

              origin={this.state.origin}
              
              onError={(message) => {
                console.log("EPUBJS-Webview", message);
                }
              }
      />

        <View
          style={[styles.bar, { top:0 }]}>
          <TopBar
            shown={this.state.showBars}
            onLeftButtonPressed={() => this._nav.show()}
            onRightButtonPressed={
              (value) => {
                if (this.state.flow === "paginated") {
                  this.setState({flow: "scrolled-continuous"});
                } else {
                  this.setState({flow: "paginated"});
                }
              }
            }
            onThemePressed={
              () => {
                var currenttheme = this.state.theme;
                var newtheme = currenttheme == "white" ? "tan" : "white";
                this.setState({theme:newtheme})
              }
            }
            onFontIncrePressed={
              () => {
                var temp = parseInt(this.state.fontSize, 10) + 2;
                var fontsize = `${temp}px`
                this.setState({fontSize: fontsize})
              }
            }
            onFontDecrePressed={
              () => {
                var temp = parseInt(this.state.fontSize, 10) - 2;
                var fontsize = `${temp}px`
                this.setState({fontSize: fontsize})
              }
            }
            onThemeDecrePressed={
              () => {
                if (this.state.flow === "paginated") {
                  this.setState({flow: "scrolled-continuous"});
                } else {
                  this.setState({flow: "paginated"});
                }
              }
            }
            />
        </View>
        <View
          style={[styles.bar, { bottom:0 }]}>
          <BottomBar
            disabled= {this.state.sliderDisabled}
            value={this.state.visibleLocation ? this.state.visibleLocation.start.percentage : 0}
            shown={this.state.showBars}
            totalLocations={this.state.totalLocations}
            location={this.state.visibleLocation ? this.state.visibleLocation.start.location : 0}
            percentage={this.state.visibleLocation ? (this.state.visibleLocation.start.percentage * 100).toFixed(0) : 0}
            onSlidingComplete={
              (value) => {
                this.setState({location: value.toFixed(6)})
              }
            }/>
        </View>
        <View>
          <Nav ref={(nav) => this._nav = nav }
            display={(loc) => {
              this.setState({ location: loc });
            }}
            toc={this.state.toc}
          />
        </View>
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute'
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C'
  },
  bar: {
    position:"absolute",
    left:0,
    right:0,
    height:55
  }
});

export default EpubReader;