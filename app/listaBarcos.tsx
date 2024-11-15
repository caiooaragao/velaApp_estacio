import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Card from '@/components/ui/Card';
import ExpandableCard from '@/components/ui/ExpandableCard';

export default function listaBarcos() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card title={'card'} description={'descricao teste'} />
            <Card title={'card'} description={'descricao teste'} />
            <Card title={'card'} description={'descricao teste'} />
            <ExpandableCard />
            <Card title={'card'} description={'descricao teste'} />
            <Card title={'card'} description={'descricao teste'} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2, // Optional: Add padding if needed
    },
});
