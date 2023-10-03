import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        //paddingTop: Platform.OS === 'ios'? 0 : StatusBar.currentHeight
    },
    info_box:{
        position: 'absolute',
        backgroundColor: '#fff',
        height:'100%',
        width:'75%',
        right: '-75%'
    },
    controlles:{
        position: "absolute"
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