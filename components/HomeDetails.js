import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, View, Text, SafeAreaView, Platform, StatusBar} from 'react-native';
import GestureRecognizer from "react-native-swipe-gestures";
import {StyleSheet} from "react-native";
import {Title} from "react-native-paper";


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

    console.log(post)

    return show?(
        <GestureRecognizer onSwipeRight={swipeRight} style={{width:'100%',height:'100%',position:"absolute"}}>
            <Animated.View style={[styles.info_box,style]}>
                <SafeAreaView style={styles.box}>
                    <Title style={styles.title}>Details</Title>
                    <View>
                        <Text style={[{fontWeight:"bold"}, styles.text]}>{post.name?post.name:<Text style={{fontStyle: "italic"}}>unknown</Text>}</Text>
                        {post.tags?<Text style={[{fontStyle: "italic"},styles.smalltext]}>{post.tags.map(v=>"#"+v+" ")}</Text>:""}
                        {post.desc?<Text style={styles.smalltext}>{post.desc}</Text>:""}
                        <Text style={styles.smalltext}>at the: {post.date?post.date:<Text style={{fontStyle: "italic"}}>unknown</Text>}</Text>
                        <Text style={styles.smalltext}>from: {post.author?post.author:<Text style={{fontStyle: "italic"}}>unknown</Text>}</Text>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </GestureRecognizer>
    ):null;
}

const styles = StyleSheet.create({
    info_box:{
        position: 'absolute',
        backgroundColor: '#fff',
        height:'100%',
        width:'75%',
        right: '-75%'
    },
    box:{
        flex:1,
        paddingTop: Platform.OS === 'ios'? 0 : StatusBar.currentHeight,
        paddingLeft: "5%"
    },
    title:{
        fontWeight: "bold",
        fontSize: 30,
        paddingBottom:"5%"
    },
    text:{
        paddingTop:"2%",
        paddingBottom:"2%",
        fontSize: 20
    },
    smalltext:{
        paddingTop:"1.5%",
        fontSize: 18
    }
})