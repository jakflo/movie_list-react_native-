import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import AutoResizeImage from '../../components/autoResizeImage.js';
import { roundToEven } from '../../functions.js';
import SendRequest from '../../sendRequest.js';
import noImage from '../../assets/no_im_wide.jpg';
import conf from '../../conf.js';

//odpověd API se u filmů a seriálů trochu liší, proto je nutné v props.isShow:bool udat, zda se jedná o serial, čí ne
export default class MoviesCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.data = [];
        this.page = 0;
        this.maxPage = undefined;
        this.itemsCount = 0;
        
        this.state = {
            index: 0, 
            maxIndex: 0, 
            itemsLoaded: false, 
            errorOccured: false
        };
        
    }
    
    render() {
        if (this.state.errorOccured) {
            return <Text>Something went wrong with server</Text>;
        }
        else if (!this.state.itemsLoaded) {
            this.loadNextPage();
            return <Text>Loading</Text>;
        }        
    
        var images = [];
        var k;
        var screenWidth = window.screen.availWidth;
        var imgWidth = roundToEven(screenWidth / this.props.itemsPerRow - 10);
        if (this.state.index >= this.state.maxIndex - 2) {
            this.loadNextPage();
        }
        for (k = this.state.index; k < this.state.index + this.props.itemsPerRow; k++) {
            let item = this.data[k];
            images.push(
                <View className="movieField" key={k} onClick={() => {this.loadDetials(item.id)}}>
                    <Text style={{width: imgWidth}}>{item.title}</Text>
                    <AutoResizeImage src={item.cover} imgWidth={imgWidth} />                        
                </View>
            );
        }
        return (
                <ScrollView horizontal={true}>
                    <View> 
                        <Button
                            onPress={this.moveLeft}
                            title="<"
                            disabled={this.state.index === 0}
                        />
                    </View>
                    {images}
                    <View>
                        <Button
                            onPress={this.moveRigth}
                            title=">"
                            disabled={this.state.index === this.state.maxIndex}
                        />
                    </View>
                </ScrollView>
                );
    }
    
    moveLeft = () => {
        this.setState({index: this.fixIndex(this.state.index - 1)});
    }
    moveRigth = () => {
        this.setState({index: this.fixIndex(this.state.index + 1)});
    }
    fixIndex = (index) => {
        if (index < 0) {
            return 0;
        }
        if (index > this.state.maxIndexx) {
            return this.state.maxIndex;
        }
        return index;
    }
    
    loadNextPage = () => {
        var req = new SendRequest();
        var toto = this;
        var pageToLoad = this.page + 1;
        if (this.maxPage !== undefined && pageToLoad > this.maxPage) {
            return false;
        }
        var reqData = {
            ...this.props.apiParams, ...{
                api_key: conf.apiKey,             
                page: pageToLoad, 
                language: this.props.lang
                } 
        };
        req.fullReq('GET', this.props.apiUrl, reqData)
                .then((result) => {            
                    if (this.maxPage === undefined) {
                        this.maxPage = result.total_pages
                    }
                    var k;
                    for (k in result.results) {
                        let item = result.results[k];
                        let imagePath = item.backdrop_path !== null? 'http://image.tmdb.org/t/p/w342'+item.backdrop_path : noImage;
                        let itemData = {
                            id: item.id, 
                            cover: imagePath
                        };
                        if (toto.props.isShow) {
                            itemData.title = item.name;
                        }
                        else {
                            itemData.title = item.title;
                        }
                        toto.data.push(itemData);
                    }
                    toto.page++;
                    toto.itemsCount = toto.data.length;
                    toto.setState({
                        maxIndex: toto.itemsCount - toto.props.itemsPerRow, 
                        itemsLoaded: true
                    });
                })
                .catch((error) => {
                    toto.setState({errorOccured: true});
                    console.log(error);
                })
        ;            
    }
    
    loadDetials = (id) => {
        this.props.navigation.navigate('Detail', {
            id: id, 
            isShow: this.props.isShow, 
            lang: this.props.lang
        });
    }
}
