import React from 'react'
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { SwitchNavigator } from 'react-navigation'

import BookButton from '../components/BookButton'
import EpubReader from '../readingScene/EpubRender'


if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}


class Home extends React.Component {

    state = {
        books: [{
            title: '',
            author: '',
            coverimg: 'https://firebasestorage.googleapis.com/v0/b/ebookreader-9c8c3.appspot.com/o/loading-wheel-trans.png?alt=media&token=200e87ec-21ec-4915-b2d7-90d0c6286d8d',
            epublink: '',
            price: 0
        },{
            title: '',
            author: '',
            coverimg: 'https://firebasestorage.googleapis.com/v0/b/ebookreader-9c8c3.appspot.com/o/loading-wheel-trans.png?alt=media&token=200e87ec-21ec-4915-b2d7-90d0c6286d8d',
            epublink: '',
            price: 0
        },{
            title: '',
            author: '',
            coverimg: 'https://firebasestorage.googleapis.com/v0/b/ebookreader-9c8c3.appspot.com/o/loading-wheel-trans.png?alt=media&token=200e87ec-21ec-4915-b2d7-90d0c6286d8d',
            epublink: '',
            price: 0
        },{
            title: '',
            author: '',
            coverimg: 'https://firebasestorage.googleapis.com/v0/b/ebookreader-9c8c3.appspot.com/o/loading-wheel-trans.png?alt=media&token=200e87ec-21ec-4915-b2d7-90d0c6286d8d',
            epublink: '',
            price: 0
        }],
        selectedEpubLink: ''
    }

    componentDidMount() {
        this.getBooksInfo().then(result => {
            this.setState({ books: result });
        })
    }

    async getBooksInfo(){
        var arr = new Array();
        await firebase.database().ref('Books/').once('value', function (snapshot) {

            var data = snapshot.val();
            
            var i = 1;

            for(i=1; data['book' + i.toString().padStart(3, 0)] != null; i++)
            {
                arr.push({
                    title: data['book' + i.toString().padStart(3, 0)].title,
                    author: data['book' + i.toString().padStart(3, 0)].author,
                    coverimg: data['book' + i.toString().padStart(3, 0)].coverImage,
                    epublink: data['book' + i.toString().padStart(3, 0)].epubLink,
                    price: data['book' + i.toString().padStart(3, 0)].price
                });
            }
        });
        return arr;
    }

    _onBookPress = async (epubLink: string) => {
        await this.setState({selectedEpubLink: epubLink});
        this.props.navigation.navigate('EpubReader', {url: epubLink});
    }

    renderBook = ({item}) => (
        <BookButton
            bookTitle = {item.title}
            bookAuthor = {item.author}
            imgUrl = {item.coverimg}
            epubLink = {item.epublink}
            onBookPress = {this._onBookPress}>
        </BookButton>
    );

    render() {
        return (
            <FlatList
                data={this.state.books}
                renderItem={this.renderBook}
                keyExtractor = {(item, index)=>index.toString()}>
            </FlatList>
        )
    }
}

export default HomeSceen = SwitchNavigator(
    {
      Home,
      EpubReader
    },
    {
      initialRouteName: 'Home',
      backBehavior: 'initialRoute'
    }
)