import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, SafeAreaView, Animated, ScrollView} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";


const tokenController = (async () => {
    const token = await messaging().getToken();
    if (token) {
       console.log(token);
       const tokenId= firestore().collection('Tokens')
       .where('token', '==', token).get()
       .then(
        querySnapshot => {
          console.log(querySnapshot.docs);
          if(querySnapshot.docs == 0){
            firestore().collection('Tokens').add(
              {
                token: token
              }
             )
             .then( (response) => {
              console.log('ID del token añadido: ', response.id);
             })
          }        
        }
       );
    } 
   })();


const HomeScreen = () => {

    const scrollX = React.useRef(new Animated.Value(0)).current;
    return(
        <SafeAreaView style={styles.container}>
            <BackDrop scrollX={scrollX} />
            <StatusBar hidden />
            <View>
                <Image source={{uri:logo}} style={styles.logo} />
            </View>
            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX }
                    } }], { useNativeDriver: true }
                )}
                data={images}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ paddingTop: 200}}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                keyExtractor={(item) => item}
                renderItem={({item, index}) => {
                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index +1) * ANCHO_CONTENEDOR,
                    ];

                    const outputRange = [0, -50, 0];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                    });

                    return(
                        <View style={{width: ANCHO_CONTENEDOR}}>
                            <Animated.View
                                style={{
                                    marginHorizontal: ESPACIO_LATERAL,
                                    padding: ESPACIO,
                                    borderRadius: 34,
                                    backgroundColor: "#fff", 
                                    alignItems: "center",
                                    transform: [{ translateY }],
                                }}
                            >
                                <Image source={{uri:item}} style={styles.posterImage} />
                            </Animated.View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );

};

function BackDrop({ scrollX }){

    return(
        <View style={([{height: ALTURA_BACKDROP, width, position: "absolute", top: 0}], StyleSheet.absoluteFillObject)}>
            {images.map((image, index) => {
                const inputRange = [
                    (index - 1) * ANCHO_CONTENEDOR,
                    index * ANCHO_CONTENEDOR,
                    (index +1) * ANCHO_CONTENEDOR,
                ];

                const outputRange = [0, 1, 0];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange,
                });

                return(
                    <Animated.Image
                        source={{ uri:image }}
                        style={{ height, width, position: "absolute", top: 0, opacity,}}
                        key={index}
                        blurRadius={5}
                    />
                );
            })}
            <LinearGradient colors={["transparent", "white"]}
                style={{height: ALTURA_BACKDROP, width, position: "absolute", top: 0}}

            />
        </View>
    )
}

const logo = "https://firebasestorage.googleapis.com/v0/b/prod2-serienetflix.appspot.com/o/images%2Flogo.png?alt=media&token=8ea6e84e-1f41-4176-b52a-2789131a850d";
const images = [
    "https://firebasestorage.googleapis.com/v0/b/prod2-serienetflix.appspot.com/o/images%2Faa'.jpg?alt=media&token=16e3e5e4-5707-48d7-bc45-f9d084173709",
    "https://firebasestorage.googleapis.com/v0/b/prod2-serienetflix.appspot.com/o/images%2Flcdp4.jpeg?alt=media&token=af8f23d9-5499-4af6-b894-34fdf185006a",
    "https://firebasestorage.googleapis.com/v0/b/prod2-serienetflix.appspot.com/o/images%2Flcdp3.png?alt=media&token=4e05ee68-0695-4825-a78f-4eba31ce348c"
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 1;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        //justifyContent: "center",
    },
    posterImage: {
        width: '100%',
        height: 200,
        resizeMode: "cover",
        borderRadius: 24,
        margin: 0,
    },
    logo: {
        width: '100%',
        height: 100,
        resizeMode: "contain",
        margin: 0,
    },
});

export default HomeScreen;