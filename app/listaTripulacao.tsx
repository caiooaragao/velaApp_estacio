import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import ExpandableCard from '@/components/ui/ExpandableCard';
import axios from 'axios';
import ExpandableCardTripulante from '@/components/ui/ExpandableCardTripulante';


type typelistaTripulacao = {

    id: number,
    nome: string,
    idade: number,
    sexo: string,
    rating: number,
    descricao: string
    telefone: string

}
export default function listaTripulacao() {

    const [listaTripulacao, setListaTripulacao] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tripulantes');
                setListaTripulacao(response.data);
                console.log(response.data)
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchData();
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {listaTripulacao.map((tripulante: typelistaTripulacao, index) =>
            (
                <ExpandableCardTripulante
                    id={tripulante.id}
                    key={index}
                    idade={tripulante.idade}
                    nomeTripulante={tripulante.nome}
                    telefone={tripulante.telefone}
                    rating={tripulante.rating}
                    descricaoTripulante={tripulante.descricao} experiencaPrevia={""} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2, // Optional: Add padding if needed
    },
});
