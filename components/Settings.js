import {Button, Text, View} from "react-native";
import * as Share from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import * as FilePicker from 'expo-document-picker'
import Sqlite from "../classes/sqlite";
export default function ({ navigation, sqlite, setDb}){
    const exportDB = async ()=>{
        await Share.shareAsync(FileSystem.documentDirectory+"/data.db")
    }

    const importDB = async () =>{
        let file = await FilePicker.getDocumentAsync({copyToCacheDirectory: true})

        if(file.type === 'success'){
            const base64 = await FileSystem.readAsStringAsync(file.uri, {encoding: FileSystem.EncodingType.Base64})

            await sqlite.close()
            await FileSystem.writeAsStringAsync('data.db', base64, {encoding: FileSystem.EncodingType.Base64})
            setDb(new Sqlite('data.db'))
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Favorites')}
            />
            <Button title="Export DB" onPress={exportDB}/>
            <Button title="Import DB" onPress={exportDB}/>
        </View>)

}