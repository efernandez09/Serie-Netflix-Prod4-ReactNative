import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

// * Importamos todas las Screens
import HomeScreen from './src/screens/HomeScreen';
import ActorsScreen from './src/screens/ActorsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import PlayerScreen from './src/screens/PlayerScreen';

// * Iconos del menu de navegación
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

// Procedermos a declarar el constructor para modelar la Stack Navigation (Details y Player)
const Stack = createNativeStackNavigator();

// En este Stack, se decalrarám las tres interfacers principales del proyecto, las cuales se
// podrá ir navegando mediante el modo stack, para facilitar la comunicación entre componentes
// y la navegación del usuario por las mismas.
function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'gray',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            initialRouteName='ActorsHome'

        >
            <Stack.Screen 
            name='ActorsHome' 
            component={ActorsScreen}
            options={{
                headerShown: false,
                
            }}
            />
            
            <Stack.Screen 
            name='Details' 
            component={DetailsScreen}
            options={{title: 'Detalles'
            }}
            />
            
            <Stack.Screen 
            name='Player' 
            component={PlayerScreen}
            options={{title: 'Reproductor'}}
            />
        
        </Stack.Navigator>
    )
}

 
// Procedemos a crear el bottom Tab Navigator
const Tab = createBottomTabNavigator();

// En este menú que se situa en la parte inferior se han declarado tanto la pantalla 'Home',
// que da la bienvenida a la aplicación (No tiene ninguna otra utilidad), y otra pantalla 
// llamada 'Actors' que muestra el Stack que hemos creado anteriormente que comunica todos los
// componentes.
function MyTabs() {

    return (
        <Tab.Navigator
        // Declaramos las opciones de personalización del menú de navigation.
        initialRouteName='Home'
        screenOptions={{
            tabBarActiveTintColor: 'red'
            
        }}
        >

            <Tab.Screen 
            // Opciones de personalización de la pantalla Home.
            name='Home' 
            component={HomeScreen} 
            options={{
                tabBarIcon: ({color, size}) => (<Ionicons name="home" size={size} color={color} />), // Iconos
                headerShown: false,
            }}
            />
            
            <Tab.Screen 
            // Opciones de personalización de la pantalla Home.
            name='Actors' 
            component={MyStack}
            options={{
                tabBarIcon: ({color, size}) => (<MaterialIcons name="recent-actors" size={size} color={color} />), // Iconos
                headerShown: false,
            }}
            />

        </Tab.Navigator>
    )

}


export default function Navigation() {
    return (
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
    )
}   