import React, {Component} from 'react';
import { Image } from 'react-native';
import { roundToEven } from '../functions.js';

export default class AutoResizeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgWidth: this.props.imgWidth, 
            imgHeigth: roundToEven(this.props.imgWidth / 3 * 2)
        };
    }
    render() {
        return <Image 
        source={this.props.src} 
        style={{
            width: this.state.imgWidth, 
            height: this.state.imgHeigth
        }}
        /> ;
        
    }
    componentDidMount() {
        var toto = this;
        Image.getSize(this.props.src, (width, height) => {
            var resizeRatio = this.props.imgWidth / width;
            var newWidth = this.props.imgWidth;
            if (resizeRatio > 1) {
                resizeRatio = 1;
                newWidth = width;
            }
            var newHeight = roundToEven(resizeRatio * height);
            toto.setState({
                imgWidth: newWidth, 
                imgHeigth: newHeight
            });
        });
    }
}


