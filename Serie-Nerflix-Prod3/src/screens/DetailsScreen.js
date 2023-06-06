import { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../database/firebase';

const DetailsScreen = ({}) => {

    // Consturctores
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


    const handleActorPress = (name) => {
        navigation.navigate('Player', {name});
    }

    return(
        <ScrollView>
            <Image
                source={{ uri: actorDetails.image }}
                style={{ height: 200, width: '100%' }}
                resizeMode="cover"
            />
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nombre:</Text>
                <Text>{actorDetails.name}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Fecha Nacimiento:</Text>
                <Text>{actorDetails.bornDate}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nationality:</Text>
                <Text>{actorDetails.nationality}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Descripción:</Text>
                <Text>{actorDetails.long_description}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Hobbies:</Text>
                <Text>{actorDetails.hobbies}</Text>
            </View>


            {/* Navegación a details */}

            <TouchableOpacity 
            style={style.button}
            onPress={() => handleActorPress(actorDetails.name)}
            > 
                <Text style={style.buttonText}> 
                    View Player 
                </Text> 
            
            </TouchableOpacity>
            
        </ScrollView>
    );

}

const style = StyleSheet.create({
    
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: '20%'
    },

    button: {
        backgroundColor: 'gray',
        padding: 10,
        marginTop: '5%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 10
    },
    
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    },

});

export default DetailsScreen;