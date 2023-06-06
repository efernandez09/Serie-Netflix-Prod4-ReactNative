import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../database/firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect} from 'react';


export default function PlayerScreen() {
  

        // Constructores
        const navigation = useNavigation();
        const route = useRoute();
    
        // States
        const [actorDetails, SetActorDetails] = useState([]);
    
        // Actor name, pasado por el mavigation
        const { name } = route.params;
    
        useEffect(() => { 
    
            // Creamos la referencia a la coleción que almacena los actores
            const actorRef = collection(db, 'actors');
            
            const subscriber = onSnapshot(actorRef, QuerySnapshot => {
    
                // Creamos un array para almacenar los actores antes de asignarlos
                // al estado 'actors'.
                const actors = [];
    
                QuerySnapshot.docs.forEach(doc => {
                    // Recogemos cada uno de los actores y hacemos push al array
                    // que hemos declarado anteriormente.
                    actors.push(doc.data());
    
                });
    
                
                // Buscamos el registro dentro de la bbdd que tenga el nombre igual
                // al que le hemos pasado mediante el componente Actors
                const actorDet = actors.find(actor => actor.name === name)
                
                // Asignamos al estado el array en el que hemos almacenado todos
                // los actores, para que estos datos sean accesibles para el resto
                // de la pantalla.
                SetActorDetails(actorDet)
    
    
            })
    
        }, [])
  
  
  
  
  
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleRestart = () => {
    videoRef.current.replayAsync();
  };

  const handleProgress = (data) => {
    setCurrentTime(data.positionMillis);
    setDuration(data.durationMillis);
  };

  const handleSliderChange = (value) => {
    videoRef.current.setPositionAsync(value);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: actorDetails.video }}
        style={styles.video}
        shouldPlay={!paused}
        onPlaybackStatusUpdate={handleProgress}
        volume={volume}
      />

      <TouchableOpacity onPress={handlePlayPause}>
        <Text>{paused ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRestart}>
        <Text>Stop</Text>
      </TouchableOpacity>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onSlidingComplete={handleSliderChange}
      />

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onSlidingComplete={handleVolumeChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '45%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
