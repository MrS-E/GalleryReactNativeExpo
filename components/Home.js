import React, {useState} from "react";
import {useAssets} from "expo-asset";
import {Image, ImageBackground, StyleSheet, View} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import {IconButton} from "react-native-paper";
import Details from "./HomeDetails";
import * as SQLite from 'expo-sqlite';

export default function ({ navigation }) {
    const [images, setImages] = useState(require('../assets/test_data.json'))
    const [id, setId] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const [showLike, setShowLike] = useState()
    const [assets, error] = useAssets([require('../assets/icons/love.svg'), require('../assets/icons/share.svg'),require('../assets/icons/comment.svg'),require('../assets/icons/add.svg')]);


    //swipe handler
    const swipeUp = () => {
        console.log("up")
        if(id<images.length-1) {
            setId(id + 1)
        }else{
            setId(0)
        }
    }
    const swipeDown = () => {
        console.log("down")
        if(id>0) {
            setId(id - 1)
        }else{
            setId(images.length-1)
        }
    }
    //button handler

    {console.log(images[id])}
    return (
        <View style={styles.container}>
            <GestureRecognizer style={{flex:1}} onSwipeUp={swipeUp} onSwipeDown={swipeDown} onSwipeLeft={()=>setShowDetails(true)}>
                <ImageBackground style={styles.image_container} source={images[id]}  blurRadius={100}>
                    <Image style={styles.image} source={images[id]}/>
                </ImageBackground>
            </GestureRecognizer>

            <View style={styles.controlles}>
                <IconButton style={styles.control_btn} icon={assets ? assets[0] : "thumb-up"} />
                {/*<IconButton style={styles.control_btn} icon={assets ? assets[1] : "share"} />
                <IconButton style={styles.control_btn} icon={assets ? assets[2] : "comment"} />*/}
                <IconButton style={styles.control_btn} icon={assets ? assets[3] : "plus"} onPress={()=>navigation.navigate('New')} />
            </View>
            <Details post={images[id]} setShowDetails={setShowDetails} showDetails={showDetails}/>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        //paddingTop: Platform.OS === 'ios'? 0 : StatusBar.currentHeight
    },
    controlles:{
        position: "absolute",
        width: 40,
        top: "25%",
        height:"50%",
        right:"3%",
        display: "flex",
        justifyContent:"center",
        flexDirection: "column"
    },
    control_btn:{
        backgroundColor: "#fff"
    },
    image_container:{
        display: "flex",
        flex:1,
        flexDirection:"column",
        resizeMode:"stretch"
    },
    image:{
        resizeMode: "contain",
        flex:1,
    },
});