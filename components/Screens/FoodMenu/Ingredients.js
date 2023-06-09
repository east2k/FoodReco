import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const Ingredients = ({ chosenMeal, setActiveWindow }) => {
    const mealIngredients = chosenMeal.Ingredient;
    const listedIngredients = mealIngredients.split("|");
    const changeActiveWindow = () => {
        setActiveWindow(0)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients:</Text>
            <ScrollView style={styles.scrollview}>
                {listedIngredients.map((item, index) => (
                    <Text key={index} style={styles.item}>{item}</Text>
                ))}
            </ScrollView>
            <Pressable
                style={(state) => state.pressed ? styles.backButtonHover : styles.backButton}
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
        backgroundColor: '#D0F0C0',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: "100%"
    },
    title: {
        fontSize: 36,
        fontWeight: 700,
        color: '#000',
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
        zIndex: 1,
        position: "absolute",
        top: 35,
        right: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 55,
        borderRadius: 150,
        backgroundColor: "#375F47",
    },
    backButtonHover: {
        position: "absolute",
        top: 35,
        right: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 55,
        borderRadius: 150,
        backgroundColor: "#fff",
    },
    backButtonText: {
        fontSize: 21,
        color: "#fff",
        margin: "auto"
    }
});

export default Ingredients;