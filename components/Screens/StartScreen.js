import React, { useState } from 'react';
import { StyleSheet, Image, View, Pressable, Text } from 'react-native';

const StartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            <Pressable
                style={styles.startButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.startButtonText}>Start</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0F0C0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 406,
        height: 322,
        marginBottom: 175,
        borderRadius: 15
    },
    startButton: {
        backgroundColor: "#375F47",
        width: "80%",
        padding: 25,
        borderRadius: 7
    },
    startButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 21,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 5
    }
});

export default StartScreen;