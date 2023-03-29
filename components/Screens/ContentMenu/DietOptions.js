import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import BFPWindow from './BFPWindow';
import BMIWindow from './BMIWindow';
import BMRWindow from './BMRWindow';

const DietOptions = ({ navigation }) => {
    const [userData, setUserData] = useState({});

    const [activeWindow, setActiveWindow] = useState()

    const [pressed, setPressed] = useState(
        [{
            id: 1,
            currentState: false,
            pressableText: "Body Mass Index",
            pressableEvent: (userData) => openBMIWindow(userData)
        },
        {
            id: 2,
            currentState: false,
            pressableText: "Body Fat Percentage",
            pressableEvent: (userData) => openBodyFatWindow(userData)
        },
        {
            id: 3,
            currentState: false,
            pressableText: "Basal Metabolic Rate",
            pressableEvent: (userData) => openBasalMetabolicRateWindow(userData)
        },
        {
            id: 4,
            currentState: false,
            pressableText: "View Diet Recommendation",
            pressableEvent: (userData) => openBlacklist(userData)
        }]
    )

    useEffect(() => {
        const handleReadData = async () => {
            const fileUri = `${FileSystem.documentDirectory}user_data.json`;
            try {
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                setUserData(data.reverse()[0])
            } catch (e) {
                alert('Error reading data!');
                navigation.navigate('ProfilingWindow')
            }
        };
        handleReadData()
    }, [])

    const newPressable = pressed.map((item, index) => {
        return (
            <Pressable
                key={index}
                style={(state) => state.pressed ? styles.gotoButtonHover : styles.gotoAnotherWindow}
                onPress={() => item.pressableEvent(userData)}
            >
                <Text style={styles.gotoText}>
                    {item.pressableText}
                </Text>
            </Pressable>
        )
    })

    const openBMIWindow = () => {
        setActiveWindow(1)
    };

    const openBodyFatWindow = () => {
        setActiveWindow(2)
    };

    const openBasalMetabolicRateWindow = (userData) => {
        setActiveWindow(3);
    };

    const openBlacklist = ({ age, weight, height, gender, bmiResult, bmrResult, activity_level }) => {
        navigation.navigate('BlacklistingWindow', {
            age: age,
            weight: weight,
            height: height,
            gender: gender,
            bmi: bmiResult,
            bmr: bmrResult,
            activity_level: activity_level
        });
    };

    const changeActiveWindow = () => {
        if (activeWindow === 0) {
            navigation.navigate('Home')
        } else {
            setActiveWindow(0)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={(state) => state.pressed ? styles.backButtonHover : styles.backButton}
                onPress={changeActiveWindow}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <View style={styles.gotoContainer}>
                {activeWindow === 1 ?
                    <BMIWindow
                        bmiResult={userData.bmiResult}
                    />
                    : activeWindow === 2 ?
                        <BFPWindow
                            age={userData.age}
                            gender={userData.gender}
                            bfpResult={userData.bfpResult}
                        />
                        : activeWindow === 3 ?
                            <BMRWindow
                                bmrResult={userData.bmrResult}
                            />
                            :
                            <>
                                {newPressable}
                            </>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0F0C0',
        alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row'
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#375F47",
        color: "#fff",
        padding: 25,
        width: "90%",
        borderRadius: 7

    },
    gotoButtonHover: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 25,
        width: "90%",
        borderRadius: 7
    },
    gotoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 75,
        marginTop: 50
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
        backgroundColor: "#375F47"
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
        color: '#000'
    },
    backButtonText: {
        fontSize: 21,
        color: "#fff",
        margin: "auto"
    },
    bfpImage: {
        width: 382,
        height: 237
    },
    labelText: {
        fontSize: 24,
        marginTop: 0,
        width: "50%",
        textAlign: 'center',
        flexShrink: 1,
        color: "#000",
        borderRadius: 15,
        backgroundColor: "#fff"
    },
    labelTextHeader: {
        fontSize: 34,
        fontWeight: 700,
        textAlign: 'center',
        marginTop: -125
    }
});

export default DietOptions;
