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