import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Divider } from 'react-native-elements';
import AutoResizeImage from '../../components/autoResizeImage.js';
import { roundToEven } from '../../functions.js';
import SendRequest from '../../sendRequest.js';
import DateTools from '../../dateTools';
import noImage from '../../assets/no_im.jpg';
import conf from '../../conf.js';

export default class MovieDetail extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                itemsLoaded: false, 
                errorOccured: false, 
                data: {}
            };
        }
        render() {
            if (this.state.errorOccured) {
                return <Text>Something went wrong with server</Text>;
            }
            else if (!this.state.itemsLoaded) {
                this.loadData();
                return <Text>Loading</Text>;
            }
            var screenWidth = window.screen.availWidth;
            var data = this.state.data;
            return (
                    <View id="movie_detail" style={{flexDirection: 'row', width: screenWidth}}>
                        <View style={{flex: 1}} id="movie_meta">
                            <h1>{data.title}</h1>
                            <Text id="synopsis">Synopsis: {data.overview}</Text>
                            <Divider />
                            <Text id="genres">Genres: {data.genres}</Text>
                            <Text id="date">Date: {data.date}</Text>
                            <Text id="score">Score: {data.score}</Text>
                            <Text id="quote">Quote: {data.tagline}</Text>
                            <View style={{width:120, heigth: 25}} id="playButtonWrap">
                                <Button 
                                    id="playButton"
                                    onPress = {this.loadPlayer}
                                    title = "Play"
                                    color = "blue"
                                />
                            </View>
                        </View>
                        <View style={{flex: 1}} id="movie_poster">
                            <AutoResizeImage src={data.cover} imgWidth={roundToEven(screenWidth / 2)} />
                        </View>
                    </View>
                    );
        }        
        
        loadData = () => {
            var params = this.props.route.params;
            var req = new SendRequest();
            var toto = this;
            var reqUrl;
            if (params.isShow) {
                reqUrl = 'https://api.themoviedb.org/3/tv/' + params.id;
            }
            else {
                reqUrl = 'https://api.themoviedb.org/3/movie/' + params.id;
            }
            var reqParams = {
                api_key: conf.apiKey, 
                language: this.props.lang
            };
            req.fullReq('GET', reqUrl, reqParams)
                .then((data) => {
                    var dateTools = new DateTools();
                    var genres = [];
                    var k;
                    for (k in data.genres) {
                        let genre = data.genres[k];
                        genres.push(genre.name);
                    }
                    var imagePath = data.poster_path !== null? 'http://image.tmdb.org/t/p/w342'+data.poster_path : noImage;
                    var result = {
                        cover: imagePath, 
                        genres: genres.join(', '), 
                        overview: data.overview || 'No synopsis is known yet.', 
                        tagline: data.tagline || 'No quote is known yet.', 
                        score: data.vote_average || 'not rated yet'
                    };
                    var date;
                    if (params.isShow) {
                        result.title = data.name;
                        date = data.first_air_date
                    }
                    else {
                        result.title = data.title;
                        date = data.release_date;
                    }
                    try {
                        result.date = dateTools.enDateToCz(date);
                    }
                    catch(err) {
                        result.date = 'invalid date';
                    }                    
                    toto.setState({
                        itemsLoaded: true, 
                        data: result
                    });            
                })
                .catch((error) => {
                    toto.setState({errorOccured: true});
                    console.log(error);
                })
            ;
        }
        
        loadPlayer = () => {
            this.props.navigation.navigate('Player');
        }
}


