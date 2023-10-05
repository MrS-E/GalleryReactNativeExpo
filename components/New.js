import {
    Image,
    TextInput,
    View,
    StyleSheet,
    Button,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground, SafeAreaView, Pressable
} from "react-native";
import {useState} from "react";
import {DatePickerInput} from 'react-native-paper-dates';
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export default function ({navigation, route}) {
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [tags, setTags] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState(new Date())

    const {sqlite} = route.params

    const addIMG = async () => {
        let file = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!file.canceled) {
            console.log(file.assets[0])
            const base64 = await FileSystem.readAsStringAsync(file.assets[0].uri, {encoding: FileSystem.EncodingType.Base64})
            setImage(("data:application/octet-stream;base64,".concat(base64)))
        }
    }
    const save = () => {
        console.log(name, tags, desc, date.toLocaleDateString().replace('/', '.').replace('/', '.')) //ohne zweites replace 04.10/2023
        sqlite.exec(`insert into images (name, date, desc, tags, uri) values ('${name}', '${date.toLocaleDateString('de')}', '${desc}','${tags.replace(' ', '').split("#").join(';')}' , '${image}');`)
        navigation.navigate('Main')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={[{height: 150}]} onPress={addIMG}>
                <ImageBackground style={styles.inputIMG} source={{uri: image}}>
                    <Text style={styles.imageText}>Add Image</Text>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.form}>
                <TextInput style={styles.input} inputMode="text" placeholder="Name" onChangeText={(v)=>setName(v)}/>
                <TextInput style={styles.input} inputMode="text" placeholder="Tags" onChangeText={(v)=>setTags(v)}/>
                <TextInput style={styles.input} inputMode="text" placeholder="Description" onChangeText={(v)=>setDesc(v)}/>
                <DatePickerInput style={styles.input} label="Created at" value={new Date()} locale="de" mode="outlined"
                                 inputMode="start" onChange={(d)=>setDate(d)}/>
                {/*FIXME DatePickerInput position*/}
            </View>
            <Pressable title="Save Image" style={[styles.input, styles.inputBtn]} onPress={save}>
                <Text style={styles.inputBtnText}>Save Image</Text>
            </Pressable>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: "2%",
        flexDirection: "column"
    },
    inputIMG: {
        height: 150,
        resizeMode: "cover",
        backgroundColor: "rgba(77,76,76,0.56)",
        borderCurve: "circular",
        borderRadius: 10
    },
    imageText: {
        flex: 1,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 50,
        paddingTop: 10,
        lineHeight: 150
    },
    form: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    input: {
        height: 56,
        lineHeight: 56,
        fontSize: 25,
        width: "100%",
    },
    inputBtn:{
        position: "absolute",
        bottom: "0%",
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "tomato",
        height:56
    },
    inputBtnText:{
        fontWeight:"bold",
        fontSize: 25,
        height: 56,
        lineHeight: 56,
    }
})