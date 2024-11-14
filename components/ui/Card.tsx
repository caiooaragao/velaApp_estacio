import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

type CardProps = {
    title: string;
    description: string;
    imageUrl?: string;
};

export default function Card({ title, description, imageUrl }: CardProps) {
    return (
        <View style={styles.card}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});
