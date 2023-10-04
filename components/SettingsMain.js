import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from "react-native";
import Settings from "./Settings";
import Favorites from "./Favorites";
import Upload from "./Upload";

export default function ({route}) {
    const Setting = createNativeStackNavigator();
    const {db, setDb} = route.params
    return (
        <Setting.Navigator>
            <Setting.Screen name="Setting" component={Settings} initialParams={{sqlite: db, setDb: setDb}}/>
            <Setting.Screen name="Favorites" component={Favorites}/>
            <Setting.Screen name="Uploads" component={Upload}/>
        </Setting.Navigator>
    );
}
