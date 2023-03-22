import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';

import FoodMenuOptions from "../FoodMenu/FoodMenuOptions"

const MealListWindow = ({ listOfMeals, setActiveWindow }) => {

    const [chosenMeal, setChosenMeal] = useState('')

    const openMealMenuWindow = (index) => {
        const chosen = listOfMeals[index];
        setChosenMeal(chosen)
    }
    const changeActiveWindow = () => {
        setActiveWindow(0)
    }

    return (
        <>
            {
                !chosenMeal
                    ?
                    <View style={styles.container}>
                        <Text style={styles.heading}>Choose a meal from the selection: </Text>
                        <FlatList
                            data={listOfMeals}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable onPress={() => openMealMenuWindow(index)} style={styles.item}>
                                        <Text style={styles.itemText}>{`${index + 1}. ${item.FoodName}`}</Text>
                                    </Pressable>
                                )
                            }}
                        />
                        <Pressable
                            style={styles.backButton}
                            onPress={changeActiveWindow}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </Pressable>
                    </View>
                    :
                    <FoodMenuOptions
                        chosenMeal={chosenMeal}
                        setChosenMeal={setChosenMeal}
                    />
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02aab0',
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 20,
        color: "#fff"
    },
    item: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        elevation: 3
    },
    itemText: {
        fontSize: 12
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        elevation: 3
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
    backButtonText: {
        fontSize: 21,
        color: "#fff",
        margin: "auto"
    }
});

export default MealListWindow;