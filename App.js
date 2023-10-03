import {View, Image, ImageBackground, Animated} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useState} from "react";
import styles from "./components/styles";
import Details from "./components/details";

export default function App() {

  const [images, setImages] = useState([{uri:"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"},{uri:"https://cdn.cookielaw.org/logos/889c435d-64b4-46d8-ad05-06332fe1d097/4353a07c-5b48-453a-b5ab-e8498c172697/IMG-ReBrand-Blue.png"},{uri:"https://media.architecturaldigest.com/photos/57c7003fdc03716f7c8289dd/16:9/w_1280,c_limit/IMG%20Worlds%20of%20Adventure%20-%201.jpg"}])
  const [id, setId] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const swipeUp = () => {

    if(id<images.length-1) {
      setId(id + 1)
    }else{
      setId(0)
    }
  }
  const swipeDown = () => {
    if(id>0) {
      setId(id - 1)
    }else{
      setId(images.length-1)
    }
  }

  const swipeLeft = () => {
    setShowDetails(true)
  }

  return (
    <View style={styles.container}>

      <GestureRecognizer style={{flex:1}} onSwipeUp={swipeUp} onSwipeDown={swipeDown} onSwipeLeft={swipeLeft}>
        <ImageBackground style={styles.image_container} source={images[id]}  blurRadius={100}>
          <Image style={styles.image} source={images[id]}/>
        </ImageBackground>
      </GestureRecognizer>

      <Details id={id} setShowDetails={setShowDetails} showDetails={showDetails}/>

      <View style={styles.controlles}>

      </View>
    </View>
  );
}


