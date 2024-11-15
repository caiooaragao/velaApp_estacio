import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
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

type ExpandableCardTripulanteProps = {
    id: number
    nomeTripulante: string,
    nomeDonoDoTripulante?: string,
    rating: number
    descricaoTripulante: string
    telefone: string
    experiencaPrevia: string
    idade: number

}


const ExpandableCardTripulante = (props: ExpandableCardTripulanteProps) => {
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
        navigation.navigate('singleTripulante', { id });
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
            overflow: 'hidden',
        }}>
            <Animated.View style={[styles.card, { height: animation }]}>

                <Pressable onPress={toggleExpand} style={styles.pressableContainer}>


                    <View style={styles.content}>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.title}>{props.nomeTripulante}</Text>
                                <Text style={{ color: "grey", paddingLeft: 10, marginBottom: 10 }}>{props.nomeDonoDoTripulante}</Text>

                                <View style={{ display: "flex", alignItems: "center", backgroundColor: "#c9ddea", width: "70%", padding: 2, marginBottom: 8, borderRadius: 10 }}><Text>{props.telefone}</Text></View>
                                <StarRating
                                    rating={props.rating}
                                    onChange={setRating}
                                    starSize={27}
                                    color="orange"

                                />

                            </View>
                            <Image
                                source={require('../../assets/images/user.png')} // Replace with your image URL or local asset
                                style={styles.image}
                            />



                        </View>

                        {expanded && (
                            <ScrollView >
                                <View style={styles.expandedContent}>
                                    <Text style={styles.description}>
                                        {props.descricaoTripulante}
                                    </Text>
                                    <TouchableOpacity style={styles.button} onPress={() => handleParticiparTripulacao(props.id)}>
                                        <Text style={styles.buttonText}>Recrutar tripulante</Text>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>

                        )}
                    </View>

                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        display: 'flex'
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

export default ExpandableCardTripulante;
