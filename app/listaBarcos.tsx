import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import ExpandableCard from '@/components/ui/ExpandableCard';
import axios from 'axios';


type typelistaBarcos = {

    id: number,
    nomeDoBarco: string,
    procuraVoluntarios: number,
    donoDoBarco: string,
    rating: 4,
    descricao: string

}
export default function listaBarcos() {

    const [listaBarcos, setListaBarcos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listaDeBarcos');
                setListaBarcos(response.data);
                console.log(response.data)
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchData();
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {listaBarcos.map((boat: typelistaBarcos, index) =>
            (
                <ExpandableCard
                    id={boat.id}
                    key={index}
                    nomeBarco={boat.nomeDoBarco}
                    nomeDonoDoBarco={boat.donoDoBarco}
                    rating={boat.rating}
                    descricaoBarco={boat.descricao} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2, // Optional: Add padding if needed
    },
});
