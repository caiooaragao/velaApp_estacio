import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const ExpandableCard = () => {
    const [expanded, setExpanded] = useState(false);
    const [rating, setRating] = useState(4); // Default rating
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

    return (
        <Animated.View style={[styles.card, { height: animation }]}>

            <Pressable onPress={toggleExpand} style={styles.pressableContainer}>


                <View style={styles.content}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View>
                            <Text style={styles.title}>Nome do barco</Text>
                            <Text style={{ color: "grey", paddingLeft: 10, marginBottom: 10 }}>dono do barco</Text>
                            <StarRating
                                rating={rating}
                                onChange={setRating}
                                starSize={27}
                                color="orange"

                            />

                        </View>
                        <Image
                            source={require('../../assets/images/sailboat_blue.png')} // Replace with your image URL or local asset
                            style={styles.image}
                        />


                    </View>

                    {expanded && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.description}>
                                This is an expanded view with adjuwerhweuhrwieuhriweuhrieuwhditional details about the item.
                            </Text>

                        </View>

                    )}
                </View>

            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
        elevation: 3,
        overflow: 'hidden',
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 15
    },
    expandedContent: {
        marginTop: 12,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default ExpandableCard;
