import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';
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



type expandableCardProps = {
    nomeBarco: string,
    nomeDonoDoBarco: string,
    rating: number
    descricaoBarco: string
    id: number

}


const ExpandableCard = (props: expandableCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const [rating, setRating] = useState(4);
    const navigation = useNavigation<Props>();

    // Default rating
    const [animation] = useState(new Animated.Value(120)); // Default height including image height

    const toggleExpand = () => {
        if (expanded) {
            Animated.timing(animation, {
                toValue: 120, // Collapsed height
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 300, // Expanded height
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    const handleParticiparTripulacao = (id: number) => {
        navigation.navigate('singleBarco', { id });

    }

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
                                <Text style={styles.title}>{props.nomeBarco}</Text>
                                <Text style={{ color: "grey", paddingLeft: 10, marginBottom: 10 }}>{props.nomeDonoDoBarco}</Text>
                                <StarRating
                                    rating={props.rating}
                                    onChange={setRating}
                                    starSize={27}
                                    color="orange"

                                />

                            </View>
                            <View style={{ width: "100%", height: "100%", backgroundColor: "#c5ddf6", borderRadius: 50, display: "flex" }}>
                                <Image
                                    source={require('../../assets/images/sailboat_blue.png')} // Replace with your image URL or local asset
                                    style={styles.image}
                                />

                            </View>




                        </View>

                        {expanded && (
                            <View style={styles.expandedContent}>
                                <Text style={styles.description}>
                                    {props.descricaoBarco}
                                </Text>
                                <TouchableOpacity style={styles.button} onPress={() => handleParticiparTripulacao(props.id)}>
                                    <Text style={styles.buttonText}>Participar da tripulação</Text>
                                </TouchableOpacity>

                            </View>

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
        borderRadius: 50,
        marginLeft: 50,
        overflow: "hidden",
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
        fontSize: 14,
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

export default ExpandableCard;
