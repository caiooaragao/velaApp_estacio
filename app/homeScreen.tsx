import { Alert, Button, Image, ImageBackground, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default function HomeScreen({ }: any) {
    const navigation = useNavigation();
    const router = useRouter();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        console.log('Logging in with:', email, password);
        // Navigate to home screen or handle authentication
    };
    const navigateToListaBarcos = () => {
        console.log("aush")
        navigation.navigate('listaBarcos'); // Navigate to the "Barcos disponíveis" page
    };
    const navigateToListaRegatas = () => {
        console.log("aush")
        navigation.navigate('listaRegatas'); // Navigate to the "Barcos disponíveis" page
    };
    const navigateToListaTripulantes = () => {
        console.log("aush")
        navigation.navigate('listaTripulacao'); // Navigate to the "Barcos disponíveis" page
    };
    console.log("aush")
    function onPressLearnMore() { }
    return (
        <ScrollView>
            <View style={styles.container}>

                <ImageBackground
                    source={require('../assets/images/agreement_illu.png')}
                    style={{ backgroundSize: "contain", width: "100%", height: "100%" }}
                    imageStyle={{ opacity: 0.2 }}
                >
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Bem vindo ao VelaApp</Text>
                        </View>
                        <View>
                            <Image
                                source={require('../assets/images/rudder.gif')}
                                style={{ width: 260, height: 260, borderRadius: 50, opacity: 0.1, marginBottom: 80 }}
                            />
                        </View>
                        <View style={styles.buttonDiv}>
                            <TouchableOpacity style={styles.button} onPress={() => navigateToListaTripulantes()}>
                                <Text style={styles.buttonText}>Procurar tripulação</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigateToListaBarcos()}>
                                <Text style={styles.buttonText}>Procurar barcos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigateToListaRegatas()}>
                                <Text style={styles.buttonText}>Procurar regatas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    buttonDiv: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 100,
        width: '80%'
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,


    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        flex: 1

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',

        marginTop: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    button: {
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20
    },
    linkText: {
        color: '#007bff',
        marginTop: 20,
        textAlign: 'center',
    },
});;
