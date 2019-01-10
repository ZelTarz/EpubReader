import React, { Component } from 'react';
import Router from './scenes/Router'
import RNFetchBlob from 'react-native-fetch-blob'
import { unzip } from 'react-native-zip-archive'

import EpubReader from './scenes/readingScene/EpubRender'

class App extends Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;

  }

  async componentDidMount(){
    
  }

  render() {
    return (
      <Router></Router>
    );
  }
}

export default App;