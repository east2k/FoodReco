import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const CookingProcedure = ({ chosenMeal, setActiveWindow }) => {
    const mealSteps = chosenMeal["Step By Step Cooking Method"];
    const listedSteps = mealSteps.split("|");
    const changeActiveWindow = () => {
        setActiveWindow(0)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Steps in Cooking:</Text>
            <ScrollView style={styles.scrollview}>
                {listedSteps.map((item, index) => (
                    <Text key={index} style={styles.item}>{item}</Text>
                ))}
            </ScrollView>
            <Pressable
                style={styles.backButton}
                onPress={changeActiveWindow}
            >
                <Text style={styles.backButtonText}>Back</Text>
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
        flexDirection: 'column',
        height: "100%"
    },
    title: {
        fontSize: 36,
        fontWeight: 700,
        color: '#fff',
        marginTop: 100,
        marginBottom: 20,
    },
    scrollview: {
        width: '90%',
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 25
        
    },
    item: {
        fontSize: 18,
        marginBottom: 10,
        color: "#000",
        borderBottomWidth: 1,
        borderBottomColor: "#b3b3b3"
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
        backgroundColor: "#a7d1d8",
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 21,
        color: "#fff",
        margin: "auto"
    }
});

export default CookingProcedure;