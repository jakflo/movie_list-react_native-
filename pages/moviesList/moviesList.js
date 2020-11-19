import React, {Component} from 'react';
import { View } from 'react-native';
import MoviesCarousel from './moviesCarousel';

//odpověd API se u filmů a seriálů trochu liší, proto je nutné v props.isShow:bool udat, zda se jedná o serial, čí ne
export default function MovieList({navigation}) {
    const itemsPerRow = 8;
    const lang = 'en-US';
    return (
        <View id="movie_lists">
            <h1>Please select a item</h1>
            <h2>Popular Movies</h2>
            <MoviesCarousel 
                apiUrl="https://api.themoviedb.org/3/movie/popular" 
                apiParams={{}} 
                itemsPerRow={itemsPerRow} 
                isShow={false} 
                navigation={navigation} 
                lang={lang}
            />
            <h2>Popular Series</h2>
            <MoviesCarousel 
                apiUrl="https://api.themoviedb.org/3/tv/popular" 
                apiParams={{}} 
                itemsPerRow={itemsPerRow} 
                isShow={true} 
                navigation={navigation} 
                lang={lang}
            />
            <h2>Family</h2>
            <MoviesCarousel 
                apiUrl="https://api.themoviedb.org/3/discover/movie" 
                apiParams={{          
                    with_genres: '10751', 
                    sort_by: 'release_date.desc'
                }} 
                itemsPerRow={itemsPerRow} 
                isShow={false} 
                navigation={navigation} 
                lang={lang}
            />
            <h2>Documentary</h2>
            <MoviesCarousel 
                apiUrl="https://api.themoviedb.org/3/discover/movie" 
                apiParams={{
                    with_genres: '99', 
                    sort_by: 'release_date.desc'
                }} 
                itemsPerRow={itemsPerRow} 
                isShow={false} 
                navigation={navigation} 
                lang={lang}
            />
        </View>
    );
};