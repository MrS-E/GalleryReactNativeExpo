import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "./components/HomeMain";
import Search from "./components/Search";
import Settings from "./components/SettingsMain";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useEffect, useState} from "react";
import Sqlite from "./classes/sqlite";

export default function App() {
    const Tab = createBottomTabNavigator();
    const [DB, setDB] = useState(new Sqlite('data.db'))

    useEffect(() => {
        DB.exec("create table if not exists images(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT, date TEXT, uri TEXT, desc TEXT);", null)
        //DB.exec("insert into images (name, author, date, desc, uri) values ('test1','MrS-E', '04.10.2023', 'test test', 'https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg');", null)
    }, [DB]);

    return (
        <NavigationContainer>
            <Tab.Navigator style={{marginBottom: "20%"}} screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    const icons = {
                        Home: 'home',
                        Search: 'magnify',
                        Settings: 'account'
                    };
                    return (
                        <MaterialCommunityIcons
                            name={icons[route.name]}
                            color={color}
                            size={size}
                        />
                    );
                },
                headerShown: false
            })}>
                <Tab.Screen name="Home" options={{title: ""}} component={Home} initialParams={{db: DB}}/>
                <Tab.Screen name="Search" options={{title: ""}} component={Search}/>
                <Tab.Screen name="Settings" options={{title: ""}} component={Settings}
                            initialParams={{db: DB, setDB: setDB}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


