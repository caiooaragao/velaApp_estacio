import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import Communications from 'react-native-communications';

type RootStackParamList = {
    singleTripulante: { id: number }; // Param type for this screen
    // Add other screens and their params here
};
type Props = {
    route: RouteProp<RootStackParamList, 'singleTripulante'>;
};

const singleTripulante = () => {

    const [dadosTripulante, setDadosTripulante] = useState<any>({});
    const [tripulanteId, setTripulanteId] = useState<number | null>(null)
    const route = useRoute<any>();

    const returnStringBasedOnRating = (rating: number) => {
        if (rating === 1) {
            return "tripulante em fase de aprendizado"
        }
        if (rating === 2) {
            return "tripulante em formação"
        }
        if (rating === 3) {
            return "tripulante aprendendo"
        }
        if (rating === 4) {
            return "tripulante experiente"
        }
        if (rating == 5) {
            return "tripulante muito experiente"
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tripulantes/${route.params.id}`);
                setDadosTripulante(response.data);
                console.log("DADOS TRIPULANTE ESPECIFICO", response.data)
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchData();
        return () => {
            setTripulanteId(null)

        }
    }, []);
    function getNumbersFromString(input: string): string {
        // Using regular expression to match all digits in the string
        const result = input.replace(/\D/g, ''); // \D matches any non-digit character
        return result;
    }
    const makePhoneCall = () => {
        Communications.phonecall(getNumbersFromString(dadosTripulante.telefone), true); // 'true' for direct call, 'false' to show the dialer first
    };

    const [rating, setRating] = useState(3)
    return (
        <ScrollView style={styles.container}>
            <View style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>

                <Image
                    source={require('../assets/images/user.png')} // Replace with your image URL or local asset
                    style={{ width: 180, height: 180, marginBottom: 20 }}
                />
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={styles.title}>{`${dadosTripulante.nome},`}
                        <Text style={{ fontSize: 20, color: "#90a1ac" }}>{` ${dadosTripulante.idade} anos`}</Text>
                    </Text>

                </View>
                <Text style={styles.rating}>{returnStringBasedOnRating(dadosTripulante.rating)}</Text>

                <View style={{ marginTop: 0, marginBottom: 20 }}>
                    <StarRating
                        rating={dadosTripulante.rating ? dadosTripulante.rating : 4}
                        onChange={setRating}
                        starSize={27}
                        color="orange"

                    />

                </View>




            </View>



            <View style={styles.section}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.description}>{dadosTripulante.descricao}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.phone}>{dadosTripulante.telefone}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Experiência Prévia:</Text>
                <Text style={styles.experience}>{dadosTripulante.experiencaPrevia}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => console.log("clicked")}>
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

export default singleTripulante;