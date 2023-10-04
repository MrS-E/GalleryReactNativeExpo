import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./Home";
import New from "./New";

export default function ({route}) {
    const {db} = route.params
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" options={{headerShown: false}} component={Home} initialParams={{sqlite: db}}/>
            <Stack.Screen name="New" component={New} initialParams={{sqlite: db}}/>
        </Stack.Navigator>
    )
}
