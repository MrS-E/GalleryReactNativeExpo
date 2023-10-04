import React, {useState} from "react";
import {useAssets} from "expo-asset";
import {Image, ImageBackground, View} from "react-native";
import styles from "./styles";
import GestureRecognizer from "react-native-swipe-gestures";
import {IconButton} from "react-native-paper";
import Details from "./HomeDetails";

export default function ({ navigation }) {
    const [images, setImages] = useState([{uri:"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"},{uri:"https://cdn.cookielaw.org/logos/889c435d-64b4-46d8-ad05-06332fe1d097/4353a07c-5b48-453a-b5ab-e8498c172697/IMG-ReBrand-Blue.png"},{uri:"https://media.architecturaldigest.com/photos/57c7003fdc03716f7c8289dd/16:9/w_1280,c_limit/IMG%20Worlds%20of%20Adventure%20-%201.jpg"}])
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

            <Details id={images[id]} setShowDetails={setShowDetails} showDetails={showDetails}/>


        </View>
    );
}