import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { StackNavigationProp } from '@react-navigation/stack';
// Adjust the path based on where you store it
type RootStackParamList = {
    singleRegata: { id: number }; // Param type for this screen
    // Add other screens and their params here
};
type Props = {
    navigate: any;
    navigation: StackNavigationProp<RootStackParamList, 'singleRegata'>;
};

type ExpandableCardRegataProps = {
    id: number
    nome: string,
    local: string,
    data: string
    descricao: string
    tipo: string
    experiencaPrevia: string
    condicoesClimaticas: number

}


const ExpandableCardRegata = (props: ExpandableCardRegataProps) => {
    const [expanded, setExpanded] = useState(false);
    const [rating, setRating] = useState(4);
    // Default rating
    const [animation] = useState(new Animated.Value(130)); // Default height including image height
    const navigation = useNavigation<Props>();

    const toggleExpand = () => {
        if (expanded) {
            Animated.timing(animation, {
                toValue: 130, // Collapsed height
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 370, // Expanded height
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };


    const handleParticiparTripulacao = (id: number) => {
        navigation.navigate('singleRegata', { id });
    };

    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
            marginVertical: 10,
            marginHorizontal: 20,
            height: "100%"

        }}>
            {/* <Animated.View style={[styles.card, { height: animation }]}> */}

            {/*     <Pressable onPress={toggleExpand} style={styles.pressableContainer}> */}


            <View style={styles.content}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ width: "100%" }}>
                        <Text style={styles.title}>{props.nome}</Text>
                        <Text style={{ color: "grey", paddingLeft: 10, marginBottom: 10, fontSize: 18 }}>{props.data}</Text>

                        <View style={{ display: "flex", alignItems: "center", backgroundColor: "#3386ff", width: "100%", padding: 10, marginBottom: 8, borderRadius: 10 }}><Text style={{ color: "white" }}>{props.local}</Text></View>
                        <View style={{ display: "flex", alignItems: "center", backgroundColor: "#3386ff", width: "100%", padding: 10, marginBottom: 8, borderRadius: 10 }}><Text style={{ color: "white" }}>{props.tipo}</Text></View>

                        <View style={{ display: "flex", alignItems: "center", backgroundColor: "#3386ff", width: "100%", padding: 10, marginBottom: 8, borderRadius: 10 }}><Text style={{ color: "white" }}>{props.descricao}</Text></View>
                        <View style={{ display: "flex", alignItems: "center", backgroundColor: "#233e8f", width: "100%", padding: 10, marginBottom: 8, borderRadius: 10 }}><Text style={{ color: "white" }}>{props.condicoesClimaticas}</Text></View>

                    </View>




                </View>
                {/* 
                        {expanded && (
                            <ScrollView >
                                <View style={styles.expandedContent}>
                                    <Text style={styles.description}>
                                        {props.descricao}
                                    </Text>

                                </View>
                            </ScrollView>

                        )} */}
            </View>

            {/*     </Pressable> */}
            {/*   </Animated.View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        display: 'flex',
        width: "100%"
    },
    pressableContainer: {
        display: 'flex',
        flexDirection: "row",
        /* backgroundColor: "red", */
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        marginLeft: 50,

        width: 80,
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,

    },
    content: {
        padding: 16,
        display: 'flex',
        width: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 15
    },
    expandedContent: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        gap: 20,
        height: '100%'
    },
    description: {

        fontSize: 17,
        color: '#555',
        flexShrink: 1,
        width: '100%'
    }, button: {
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
});

export default ExpandableCardRegata;
