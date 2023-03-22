import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image
} from 'react-native';
import * as FileSystem from 'expo-file-system';

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
                style={styles.gotoAnotherWindow}
                onPress={() => item.pressableEvent(userData)}
            >
                <Text style={styles.gotoText}>
                    {item.pressableText}
                </Text>
            </Pressable>
        )
    })
    const [bmiLabel, setBmiLabel] = useState("")

    const openBMIWindow = ({ bmiResult }) => {
        let label;
        if (bmiResult < 16) {
            label = "Your BMI is: " + bmiResult + " and you are in the range of SEVERELY UNDERWEIGHT CATEGORY";
        } else if (bmiResult >= 16 && bmiResult < 18.5) {
            label = "Your BMI is: " + bmiResult + " and you are in the range of UNDERWEIGHT CATEGORY";
        } else if (bmiResult >= 18.5 && bmiResult < 25) {
            label = "Your BMI is: " + bmiResult + " and you are in the range of NORMAL CATEGORY";
        } else if (bmiResult >= 25 && bmiResult < 30) {
            label = "Your BMI is: " + bmiResult + " and you are in the range of OVERWEIGHT CATEGORY";
        } else if (bmiResult >= 30) {
            label = "Your BMI is: " + bmiResult + " and you are in the range of OBESE CATEGORY";
        }
        setBmiLabel(label)
        setActiveWindow(1)
    };

    const [bfpLabel, setBfpLabel] = useState("")

    const openBodyFatWindow = ({ gender, bfpResult }) => {
        let label;
        if (gender === "Male") {
            if (bfpResult < 6) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ESSENTIAL FAT CATEGORY";
            } else if (bfpResult >= 6 && bfpResult < 24) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ATHLETES CATEGORY";
            } else if (bfpResult >= 24 && bfpResult < 31) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of FITNESS CATEGORY";
            } else if (bfpResult >= 31 && bfpResult < 37) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ACCEPTABLE CATEGORY";
            } else {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of OBESITY CATEGORY";
            }
        } else {
            if (bfpResult < 10) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ESSENTIAL FAT CATEGORY";
            } else if (bfpResult >= 10 && bfpResult < 21) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ATHLETES CATEGORY";
            } else if (bfpResult >= 21 && bfpResult < 28) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of FITNESS CATEGORY";
            } else if (bfpResult >= 28 && bfpResult < 35) {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of ACCEPTABLE CATEGORY";
            } else {
                label = "Your body fat percentage is: " + bfpResult + "% and you are in the range of OBESITY CATEGORY";
            }
        }
        // alert(label);
        // navigation.navigate('BFPWindow', { label: label });
        setActiveWindow(2)
        setBfpLabel(label)
    };

    const [bmrLabel, setBmrLabel] = useState("")

    const openBasalMetabolicRateWindow = (userData) => {
        label = `Your Basal Metabolic Rate: ${userData.bmrResult} is the \nnumber of calories you burn as your body performs. Also known as Resting Metabloic Rate.`;
        setBmrLabel(label);
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
                style={styles.backButton}
                onPress={changeActiveWindow}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <View style={styles.gotoContainer}>
                {activeWindow === 1 ?
                    <>
                        <Image source={require('../../../assets/images/bmi-table.png')} style={styles.bmiImage} />
                        <Text style={styles.labelText}>{bmiLabel}</Text>
                    </>
                    : activeWindow === 2 ?
                        <>
                            <Text style={styles.labelText}>{bfpLabel}</Text>
                            <Image source={require('../../../assets/images/bfp-table.png')} style={styles.bfpImage} />
                        </>
                        : activeWindow === 3 ?
                            <>
                                <Text style={styles.labelTextHeader}>BMR Result: </Text>
                                <Text style={styles.labelText}>{bmrLabel}</Text>
                            </>
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
        backgroundColor: '#02aab0',
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
        backgroundColor: "#a7d1d8",
        padding: 25,
        width: "90%",
        borderRadius: 50

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
        backgroundColor: "#a7d1d8"
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
