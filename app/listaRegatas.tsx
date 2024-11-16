import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card';
import ExpandableCardRegata from '@/components/ui/ExpandableCardRegata';

export default function listaRegatas() {

    const [listaRegatas, setListaRegatas] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listaRegatas');
                setListaRegatas(response.data);
                console.log(response.data)
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchData();
    }, []);
    return (

        <ScrollView style={styles.container}>
            {listaRegatas.map((regata) => (
                <View key={regata.id} style={styles.card}>
                    <ExpandableCardRegata
                        id={regata.id}
                        nome={regata.nome}
                        condicoesClimaticas={regata.condicoesClimaticas}
                        data={regata.data}
                        local={regata.local}
                        tipo={regata.tipo}
                        descricao={regata.descricao}
                        experiencaPrevia={''}
                    />
                </View>
            ))}
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {

        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    card: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
    },
    cardImageStyle: {
        borderRadius: 10,
    },
    cardContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background to contrast the text
        padding: 15,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardSubTitle: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#fff',
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 3,
    },
    cardDescription: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
    },
});