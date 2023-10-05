import React, {useEffect, useState} from "react";
import {useAssets} from "expo-asset";
import {Image, ImageBackground, StyleSheet, View, Text, Alert, Platform, BackHandler} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import {IconButton} from "react-native-paper";
import Details from "./HomeDetails";
import {Accelerometer, DeviceMotion} from 'expo-sensors';

export default function ({navigation, route}) {
    const [images, setImages] = useState(null)
    const [id, setId] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const [assets, error] = useAssets([require('../assets/icons/love.svg'), require('../assets/icons/share.svg'), require('../assets/icons/comment.svg'), require('../assets/icons/add.svg')]);
    const {sqlite} = route.params

    useEffect(() => {
        //console.log(sqlite)
        sqlite.get_all('images').then(res => setImages(res.rows._array))
    });

    useEffect(() => {
        Accelerometer.addListener((accelerometerData) => {
            const totalAcceleration =
                Math.sqrt(
                    accelerometerData.x * accelerometerData.x +
                    accelerometerData.y * accelerometerData.y +
                    accelerometerData.z * accelerometerData.z
                );

            const shakeThreshold = 2.5;

            if (totalAcceleration > shakeThreshold) {
                console.log("shaking")
                swipeUp()
            } else {

            }
        });
    }, []);

    //swipe handler
    const swipeUp = () => {
        console.log("up")
        if (id < images.length - 1) {
            setId(id + 1)
        } else {
            setId(0)
        }
    }
    const swipeDown = () => {
        console.log("down")
        if (id > 0) {
            setId(id - 1)
        } else {
            setId(images.length - 1)
        }
    }
    //button handler
    const like = () => {
        Alert.alert("Like", "Thx for the like.", [{text: 'OK', onPress: () => console.log('OK')},])
    }

    if (images && images.length > 0) {
        return (
            <View style={styles.container}>
                <GestureRecognizer style={{flex: 1}} onSwipeUp={swipeUp} onSwipeDown={swipeDown}
                                   onSwipeLeft={() => setShowDetails(true)}>
                    <ImageBackground style={styles.image_container} source={images[id]} blurRadius={100}>
                        <Image style={styles.image} source={images[id]}/>
                    </ImageBackground>
                </GestureRecognizer>

                <View style={styles.controlles}>
                    <IconButton style={styles.control_btn} icon={assets ? assets[0] : "thumb-up"} onPress={like}/>
                    {/*<IconButton style={styles.control_btn} icon={assets ? assets[1] : "share"} />
                <IconButton style={styles.control_btn} icon={assets ? assets[2] : "comment"} /> TODO add*/}
                    <IconButton style={styles.control_btn} icon={assets ? assets[3] : "plus"}
                                onPress={() => navigation.navigate('New')}/>
                </View>
                <Details post={images[id]} setShowDetails={setShowDetails} showDetails={showDetails}/>
            </View>
        );
    } else if (images) {
        return (
            <View style={[styles.container, {justifyContent: "center", alignItems: "center"}]}>
                <Text style={{fontSize: 48, fontWeight: "bold", color: "#fff"}}>No Images</Text>
                <View style={styles.controlles}>
                    <IconButton style={styles.control_btn} icon={assets ? assets[3] : "plus"}
                                onPress={() => navigation.navigate('New')}/>
                </View>
            </View>
        )
    } else {
        return (
            <View style={[styles.container, {justifyContent: "center", alignItems: "center"}]} onPress={()=>Alert.alert("Error", "There was an Error, please restart the App. If that din't resolve the error please uninstall and reinstall the app", [{text: 'OK', onPress: () => Platform.OS === 'ios'?"":BackHandler.exitApp()}])}>
                <Text style={{fontSize: 48, fontWeight: "bold", color: "#fff"}}>Loading</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        //paddingTop: Platform.OS === 'ios'? 0 : StatusBar.currentHeight

    },
    controlles: {
        position: "absolute",
        width: 40,
        top: "25%",
        height: "50%",
        right: "3%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    control_btn: {
        backgroundColor: "#fff"
    },
    image_container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        resizeMode: "stretch"
    },
    image: {
        resizeMode: "contain",
        flex: 1,
    },
});