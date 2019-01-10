import React, {Component} from 'react'
import {View,Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'

export default class BookButton extends Component{

    _onBookPress = () => {
        this.props.onBookPress(this.props.epubLink);
    };
    

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity underlayColor = 'rgb(255, 0, 0)' onPress={this._onBookPress}>
                    <View style = {styles.bookButton}>
                        <Image source={{uri: this.props.imgUrl}} style={styles.image}></Image>
                        <View style = {styles.bookInfo}>
                            <Text numberOfLines = {1} ellipsizeMode = {'tail'} style = {styles.bookTitle}>{this.props.bookTitle}</Text>
                            <Text numberOfLines = {1} ellipsizeMode = {'tail'} style = {styles.bookAuthor}>{this.props.bookAuthor}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container:{
        paddingLeft: 10,
        paddingTop: 20,
        paddingRight: 10
    },
    image:{
        width: 100,
        height: 100,
        paddingLeft: 10,
    },
    bookButton:{
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5
    },
    bookInfo:{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    bookTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 20,
    },
    bookIndex:{
        fontSize: 15,
        color: 'black',
    },
    bookAuthor:{
        fontSize: 15,
        color: 'black',
        paddingLeft: 20,
    }
});


