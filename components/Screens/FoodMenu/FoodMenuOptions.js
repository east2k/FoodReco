import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import NutritionalValues from "./NutritionalValues";
import Ingredients from './Ingredients';
import CookingProcedure from './CookingProcedure';

const FoodMenuOptions = ({ chosenMeal, setChosenMeal }) => {
    const [activeWindow, setActiveWindow] = useState(0)

    const [pressed, setPressed] = useState(
        [{
            id: 1,
            currentState: false,
            pressableText: "Nutritional Values",
            pressableEvent: () => openNutritionalValues()
        },
        {
            id: 2,
            currentState: false,
            pressableText: "Ingredients",
            pressableEvent: () => openIngredients()
        },
        {
            id: 3,
            currentState: false,
            pressableText: "Cooking Procedure",
            pressableEvent: () => openCookingProcedure()
        }]
    )

    const newPressable = pressed.map((item, index) => {
        return (
            <Pressable
                key={index}
                style={(state) => state.pressed ? styles.gotoButtonHover : styles.gotoAnotherWindow}
                onPress={item.pressableEvent}
            >
                <Text style={styles.gotoText}>
                    {item.pressableText}
                </Text>
            </Pressable>
        )
    })
    const openNutritionalValues = () => {
        setActiveWindow(1)
    };

    const openIngredients = () => {
        setActiveWindow(2)
    };

    const openCookingProcedure = () => {
        setActiveWindow(3);
    };

    const changeActiveWindow = () => {
        setChosenMeal()
    }

    return (
        <>
            {activeWindow === 1 ?
                <NutritionalValues
                    chosenMeal={chosenMeal}
                    setActiveWindow={setActiveWindow}
                />
                : activeWindow === 2 ?
                    <Ingredients
                        chosenMeal={chosenMeal}
                        setActiveWindow={setActiveWindow}
                    />
                    : activeWindow === 3 ?
                        <CookingProcedure
                            chosenMeal={chosenMeal}
                            setActiveWindow={setActiveWindow}
                        />
                        :
                        <View style={styles.container}>
                            <Pressable
                                style={(state) => state.pressed ? styles.backButtonHover : styles.backButton}
                                onPress={changeActiveWindow}
                            >
                                <Text style={styles.backButtonText}>Back</Text>
                            </Pressable>
                            <View style={styles.gotoContainer}>
                                <Text style={styles.title}>Food Name:</Text>
                                <Text style={styles.foodNameLabel}>{chosenMeal.FoodName}</Text>
                                {newPressable}
                            </View>
                        </View>
            }
        </>
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
    gotoText: {
        color: "white",
        fontSize: 21,
        fontWeight: 700,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 3,
    },
    title: {
        fontSize: 36,
        fontWeight: 700,
        color: '#000',
        marginBottom: 15
    },
    foodNameLabel: {
        fontSize: 21,
        fontWeight: 700,
        color: '#000',
        backgroundColor: "#fff",
        padding: 5
    },
    gotoAnotherWindow: {
        backgroundColor: "#375F47",
        paddingHorizontal: 75,
        paddingVertical: 25,
        width: "100%",
        marginTop: 50,
        borderRadius: 7
    },
    gotoButtonHover: {
        backgroundColor: "#fff",
        paddingHorizontal: 75,
        paddingVertical: 25,
        width: "100%",
        marginTop: 50,
        borderRadius: 7
    },
    gotoContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: 200,
        height: "100%"
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

export default FoodMenuOptions