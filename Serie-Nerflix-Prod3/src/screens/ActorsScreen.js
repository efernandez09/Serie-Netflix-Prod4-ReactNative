import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { db, app } from '../database/firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const ActorsScreen = () => {

    // Constructors
    const navigation = useNavigation();

    // States
    const [actors, setActors] = useState([]);

    useEffect(() => {

        // Creamos la referencia a la coleción que almacena los actores
        const actorRef = collection(db, 'actors')
        
        const subscriber = onSnapshot(actorRef, QuerySnapshot => {

            // Creamos un array para almacenar los actores antes de asignarlos
            // al estado 'actors'.
            const actors = [];

            QuerySnapshot.docs.forEach(doc => {
                // Recogemos cada uno de los actores y hacemos push al array
                // que hemos declarado anteriormente.
                actors.push(doc.data());
            });

            // Asignamos al estado el array en el que hemos almacenado todos
            // los actores, para que estos datos sean accesibles para el resto
            // de la pantalla.
            setActors(actors);

            // Comprobamos que recogemos correctamente los actores de la bbdd
            // console.log(actors)

        })

    }, [])

    const handleActorPress = (name) => {
        navigation.navigate('Details', {name});
    }

    const itemComponent = ({item}) => {
        return (
            <TouchableOpacity
            onPress={() => handleActorPress(item.name)}
            >
                <View style={style.container}>
                    <Image source={{ uri: item.image }} style={style.image} />
                    <View style={style.infoContainer}>
                        <Text style={style.name}>{item.name}</Text>
                        <Text style={style.description}>{item.short_description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
          );
    }

    return(
        <View>
            <Text style={style.title}> Reparto </Text>
            <View style={style.separator}/>

            <FlatList 
            data={actors}
            renderItem={itemComponent}
            > </FlatList>

            {/* Navegación a details */}

 
            
        </View>
    );

}

const style = StyleSheet.create({
    
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: '17%',
        marginBottom: 10
    },

    button: {
        backgroundColor: 'gray',
        padding: 10,
        marginTop: '20%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 10
    },

    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },

      image: {
        width: 75,
        height: 75,
        borderRadius: 25,
        marginRight: 10,
      },

      infoContainer: {
        flex: 1,
        justifyContent: 'center',
      },

      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'red'
      },

      description: {
        fontSize: 14,
      },

      separator: {
        height: 1,
        width: 250,
        alignSelf: 'center',
        backgroundColor: 'red',
        marginVertical: 10,
      },

});


export default ActorsScreen;
