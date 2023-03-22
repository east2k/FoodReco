import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

const BFPWindow = ({ navigation }) => {
    const route = useRoute();
    const { label } = route.params;
    console.log(label);
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/bfp-table.png')} style={styles.bmiImage} />
            <Text style={styles.bmiText}>{label}</Text>
            <Pressable
                style={styles.backButton}
                onPress={() => navigation.navigate('DietOptions')}
            >
                <Text style={styles.backButtonTextHover}>Back</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#02aab0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bmiImage: {
        width: 382,
        height: 237
    },
    bmiText: {
        fontSize: 32,
        marginTop: 15,
        width: "80%",
        textAlign: 'center',
        color: "#000",
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    backButton: {
        position: "absolute",
        top: 35,
        right: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 55,
        borderRadius: 150,
        backgroundColor: "#a7d1d8"
    },
    backButtonTextHover: {
        fontSize: 21,
        color: "#000",
        margin: "auto"
    }
});

export default BFPWindow;