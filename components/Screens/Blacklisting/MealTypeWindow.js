import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import food from "../../../assets/data/food.json"
import MealListWindow from './MealListWIndow';

const MealTypeWindow = ({ setChangeWindow, blacklistedItems, predictedCal }) => {

    const [activeWindow, setActiveWindow] = useState(0)

    const [foodData, setFoodData] = useState(food)

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);

    useEffect(() => {
        const predictFood = (calories, mealType) => {
            const filteredMeal = foodData.filter(
                (food) => food[mealType] === 1 && food['Calories'] < calories
            );
            let filteredMealCopy = [...filteredMeal];
            filteredMealCopy = filteredMealCopy.map((food) => {
                return { ...food, Ingredient: food.Ingredient.toLowerCase() };
            });
            filteredMealCopy.sort(() => Math.random() - 0.5);
            const mask = filteredMealCopy.filter((food) => {
                return blacklistedItems.some((word) => {
                    return food.Ingredient.includes(word.toLowerCase())
                }
                );
            });
            const filtered = filteredMealCopy.filter((food) => {
                return !mask.includes(food);
            });
            const filteredMealLength = filtered.length;
            return filtered.slice(0, filteredMealLength);
        };

        const calculatedBreakfastCal = (predictedCal * 0.5) - 350;
        const calculatedLunchCal = (predictedCal * 0.3) - 200;
        const calculatedDinnerCal = (predictedCal * 0.2) - 100;

        setBreakfast(predictFood(calculatedBreakfastCal, 'Breakfast'));
        setLunch(predictFood(calculatedLunchCal, 'Lunch'));
        setDinner(predictFood(calculatedDinnerCal, 'Dinner'));
    }, []);

    const [pressed, setPressed] = useState(
        [{
            id: 1,
            currentState: false,
            pressableText: "Breakfast",
            pressableEvent: () => openBreakfast()
        },
        {
            id: 2,
            currentState: false,
            pressableText: "Lunch",
            pressableEvent: () => openLunch()
        },
        {
            id: 3,
            currentState: false,
            pressableText: "Dinner",
            pressableEvent: () => openDinner()
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
    const openBreakfast = () => {
        setActiveWindow(1)
    };

    const openLunch = () => {
        setActiveWindow(2)
    };

    const openDinner = () => {
        setActiveWindow(3);
    };

    const changeActiveWindow = () => {
        setChangeWindow(false)
    }

    return (
        <>
            {activeWindow === 1 ?
                <MealListWindow
                    listOfMeals={breakfast}
                    setActiveWindow={setActiveWindow}
                />
                : activeWindow === 2 ?
                    <MealListWindow
                        listOfMeals={lunch}
                        setActiveWindow={setActiveWindow}
                    />
                    : activeWindow === 3 ?
                        <MealListWindow
                            listOfMeals={dinner}
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
    gotoAnotherWindow: {
        backgroundColor: "#375F47",
        paddingHorizontal: 75,
        paddingVertical: 25,
        width: "100%",
        borderRadius: 7
    },
    gotoButtonHover: {
        backgroundColor: "#fff",
        paddingHorizontal: 75,
        paddingVertical: 25,
        width: "100%",
        borderRadius: 7
    },
    gotoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 100,
        marginTop: 50,
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

export default MealTypeWindow