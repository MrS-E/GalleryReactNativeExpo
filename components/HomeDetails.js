import React, {useEffect, useRef, useState} from 'react';
import styles from "./styles";
import {View, Image, ImageBackground, Animated, Dimensions} from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";


export default function ({post, setShowDetails, showDetails}) {
    const [show, setShow] = useState()
    const swipeRight = () =>{
        setShowDetails(false)
    }

    useEffect(() => {
        if(showDetails) {
            setShow(true)
            runAnimationIn()
        }
        else{
            runAnimationOut()
        }
    }, [showDetails]);

    const animationValue = useRef(new Animated.Value(0)).current

    const runAnimationIn = () => {
        Animated.spring(animationValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }
    const runAnimationOut = () => {
        Animated.spring(animationValue, {
            toValue: 0,
            useNativeDriver: true,
        }).start(({finished})=>{
            if(finished){
                setShow(false)
            }
        })
    }

    const style = {
        transform:[
            {translateX:animationValue.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,Math.floor(Dimensions.get('screen').width*-0.75)]
                })}
        ]
    }

    return show?(
        <GestureRecognizer onSwipeRight={swipeRight} style={{width:'100%',height:'100%',position:"absolute"}}>
            <Animated.View style={[styles.info_box,style]}>

            </Animated.View>
        </GestureRecognizer>
    ):null;
}