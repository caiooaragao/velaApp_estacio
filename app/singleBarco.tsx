import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import Communications from 'react-native-communications';
import { StackNavigationProp } from '@react-navigation/stack';
// Adjust the path based on where you store it
type RootStackParamList = {
    singleTripulante: { id: number }; // Param type for this screen
    // Add other screens and their params here
};
type Props = {
    navigate: any;
    navigation: StackNavigationProp<RootStackParamList, 'singleTripulante'>;
};


const singleBarco = () => {

    const [dadosbarco, setDadosbarco] = useState<any>({});
    const [dadosDonoBarco, setDadosDonoBarco] = useState<any>({});
    const [barcoId, setbarcoId] = useState<number | null>(null)
    const route = useRoute<any>();
    const navigation = useNavigation<Props>();



    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/listaDeBarcos/${route.params.id}`);
                setDadosbarco(response.data);

            } catch (err: any) {
                console.log(err)
            }
        };

        const fetchDataDono = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/listaDonos?barcoId=${route.params.id}`);
                setDadosDonoBarco(response.data);
                console.log("LOG RESPONSE DONO", response.data)

            } catch (err: any) {
                console.log(err)
            }
        };

        fetchDataDono()
        fetchData();
        return () => {
            setbarcoId(null)

        }
    }, []);
    function getNumbersFromString(input: string): string {
        const result = input.replace(/\D/g, ''); // \D matches any non-digit character
        return result;
    }
    const makePhoneCall = () => {
        Communications.phonecall(getNumbersFromString(dadosbarco.telefone), true); // 'true' for direct call, 'false' to show the dialer first
    };

    const goToCaptaoPage = (id: string) => {
        navigation.navigate('singleDonoBarco', { id });
    }

    const [rating, setRating] = useState(3)
    return (
        <ScrollView style={styles.container}>
            <View style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
                <Image
                    source={require('../assets/images/user.png')} // Replace with your image URL or local asset
                    style={{ width: 180, height: 180, marginBottom: 20 }}
                />
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={styles.title}>{`${dadosbarco.nomeDoBarco}`}
                    </Text>
                </View>
                <Text style={styles.rating}>{"Capitão(a) e barco verificados"}</Text>

                <View style={{ marginTop: 0, marginBottom: 20 }}>
                    <StarRating
                        rating={dadosbarco.rating ? dadosbarco.rating : 4}
                        onChange={setRating}
                        starSize={27}
                        color="orange"
                    />
                </View>
            </View>
            <View style={styles.section}>
                {/* <Text style={styles.label}>Capitão:</Text> */}
                <View style={{ display: "flex", flexDirection: "column", marginTop: 20, gap: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", width: "80%", marginLeft: 6 }}>
                        {`Capitão(a) ${dadosDonoBarco[0]?.nome}`}
                    </Text>
                    <StarRating
                        rating={dadosDonoBarco[0]?.rating ? dadosDonoBarco[0]?.rating : 0}
                        onChange={setRating}
                        starSize={27}
                        color="black"
                    />

                </View>
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity style={{
                        width: '100%',
                        height: 30,
                        backgroundColor: '#3396ff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                    }} onPress={() => goToCaptaoPage(dadosDonoBarco[0].id)}>
                        <Text style={styles.buttonText}>Ver perfil do capitão(a)</Text>
                    </TouchableOpacity>

                </View>


            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.description}>{dadosbarco.descricao}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Procura ajuda na manutenção:</Text>
                <Text style={styles.experience}>{` ${dadosbarco.procuraAjudaManutencao}`}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.phone}>{dadosbarco.telefone}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Número de regatas corridas:</Text>
                <Text style={styles.phone}>{dadosbarco.numeroDeViagens}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Parcerias:</Text>
                <Text style={styles.experience}>{`está procurando ${dadosbarco.procuraVoluntarios} parceiros!`}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => makePhoneCall()}>
                <Text style={styles.buttonText}>Ligar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    rating: {
        paddingLeft: 6,
        fontSize: 20,
        fontWeight: '500',
        color: '#90a1ac',
        marginBottom: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // for Android shadow
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    phone: {
        fontSize: 16,
        color: '#0066cc',
    },
    experience: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
});

export default singleBarco;