import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text} from "react-native";
import Settings from "./Settings";
import Favorites from "./Favorites";
import Upload from "./Upload";

export default function (props) {
    const Setting = createNativeStackNavigator();
    return (
        <Setting.Navigator>
            <Setting.Screen name="Settings" component={Settings} />
            <Setting.Screen name="Favorites" component={Favorites} />
            <Setting.Screen name="Uploads" component={Upload} />
        </Setting.Navigator>
    );
}
