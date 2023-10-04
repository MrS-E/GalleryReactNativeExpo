import {Button, Text, View} from "react-native";

export default function ({ navigation }){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Favorites')}
            />
        </View>)

}