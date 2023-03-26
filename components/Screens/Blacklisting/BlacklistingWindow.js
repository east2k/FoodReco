import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';

import { useRoute } from '@react-navigation/native';

import MealTypeWindow from "./MealTypeWindow";

const BlacklistingWindow = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [blacklistedItems, setBlacklistedItems] = useState([]);
    const [changeWindow, setChangeWindow] = useState(false)
    const route = useRoute();
    const { age, weight, height, gender, bmi, bmr, activity_level } = route.params;

    const predictCalories = (bmr) => {
        if (bmr < 1000) {
            return 2250;
        } else if (bmr > 1000 && bmr < 1500) {
            return 2000;
        } else if (bmr > 1500 && bmr < 2000) {
            return 1750;
        } else if (bmr > 2000 && bmr < 2500) {
            return 1500;
        } else {
            return 1250;
        }
    };

    const predictedCal = predictCalories(bmr)

    const blacklistLabelDict = {
        Milk: 'Milk',
        Butter: 'Butter',
        Egg: 'Egg',
        Mayonnaise: 'Mayonnaise',
        Fish: 'Fish',
        Patis: 'Patis',
        Tuna: 'Tuna',
        Salmon: 'Salmon',
        Tinapa: 'Tinapa',
        Tilapia: 'Tilapia',
        Bagoong: 'Bagoong',
        Tanigue: 'Tanigue',
        Daing: 'Daing',
        Anchovy: 'Anchovy',
        Shrimp: 'Shrimp',
        Mussel: 'Mussel',
        Oyster: 'Oyster',
        Alamang: 'Alamang',
        Squid: 'Squid',
        Crab: 'Crab',
        Nut: 'Nut',
        Noodle: 'Noodle',
        Rice: 'Rice',
        Wheat: 'Wheat',
        Pasta: 'Pasta',
        Spaghetti: 'Spaghetti',
        Bread: 'Bread',
        Misua: 'Misua',
        Beans: 'Beans',
        Soy: 'Soy',
        Tofu: 'Tofu',
        Margarine: 'Margarine',
        Sesame: 'Sesame',
        Pork: 'Pork',
        Chicken: 'Chicken',
    };

    const updateCheckboxList = (text) => {
        setSearchTerm(text);
    };

    const handleCheckboxPress = (item) => {
        const index = blacklistedItems.indexOf(item);
        if (index === -1) {
            setBlacklistedItems([...blacklistedItems, item]);
        } else {
            const newBlacklistedItems = blacklistedItems.filter((i) => i !== item);
            setBlacklistedItems(newBlacklistedItems);
        }
    };

    const filteredItems = Object.keys(blacklistLabelDict).filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const blacklistTexts = blacklistedItems.map((item, index) => {
        return (
            <Text
                key={index}
                style={styles.currentBlacklistedItemsLabel}>
                {`${item}`}</Text>
        )
    })

    return (
        <>
            {!changeWindow ?
                <ScrollView style={styles.scrollViewContainer}>

                    <Pressable
                        style={(state) => state.pressed ? styles.backButtonHover : styles.backButton}
                        onPress={() => navigation.navigate("DietOptions")}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </Pressable>
                    <View style={styles.container}>
                        <Text style={styles.heading}>Blacklist Window</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for items to blacklist"
                                onChangeText={updateCheckboxList}
                                value={searchTerm}
                            />
                        </View>
                        <Text style={styles.currentBlacklistedItemsHeader}>Current Blacklisted Items: </Text>
                        {blacklistedItems &&
                            <View style={styles.currentBlacklistedItems}>
                                {blacklistTexts}
                            </View>
                        }
                        <View style={styles.checkboxContainer}>
                            {filteredItems.map((item) => (
                                <View style={styles.checkboxWrapper} key={item}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={blacklistedItems.includes(item)}
                                        onValueChange={() => handleCheckboxPress(item)}
                                    />
                                    <Text style={styles.checkboxLabel}>{blacklistLabelDict[item]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Pressable
                        style={styles.gotoAnotherWindow}
                        onPress={() => {
                            setChangeWindow(true)
                            if (blacklistedItems === []) {
                                blacklistedItems = ["none"]
                            }
                        }}
                    >
                        <Text style={styles.gotoText}>
                            View Diet Recommendation
                        </Text>
                    </Pressable>

                </ScrollView>
                : <MealTypeWindow
                    setChangeWindow={setChangeWindow}
                    blacklistedItems={blacklistedItems}
                    predictedCal={predictedCal}
                />}
        </>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        position: "relative",
        flex: 1,
        backgroundColor: '#D0F0C0',
    },
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: "#000"
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        marginBottom: 75
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 5,
    },
    checkbox: {
        marginRight: 10,
        padding: 10
    },
    checkboxLabel: {
        fontSize: 18,
        color: "#000",
    },
    currentBlacklistedItems: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,

    },
    currentBlacklistedItemsLabel: {
        color: "#fff",
        backgroundColor: "#000",
        padding: 5,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 15

    },
    currentBlacklistedItemsHeader: {
        fontSize: 21,
        color: "#000"
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
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#375F47",
        padding: 25,
        width: "100%",
        bottom: 0
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
        margin: "auto",
        color: "#fff"
    }
});

export default BlacklistingWindow;