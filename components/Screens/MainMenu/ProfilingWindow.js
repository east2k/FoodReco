import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

const activity_levels_list = [
    { text: 'Sedentary: Little or No Exercise', value: 1.1 },
    { text: 'Lightly Active: Light Exercise/Sports 1 - 3 Days/Week', value: 1.2 },
    { text: 'Moderately Active: Moderate Exercise/Sports 6 - 7 Days/Week', value: 1.3 },
    { text: 'Very Active: Hard Exercise Every Day/ 2 Times Exercise Per Day', value: 1.4 },
    { text: 'Extra Active: Hard Exercise Every Day/ 3 or more Times Exercise Per Day', value: 1.5 }
];

export default function ProfilingWindow({ navigation }) {
    const [gender, setGender] = useState(1);
    const [age, setInputAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [neck, setNeck] = useState();
    const [waist, setWaist] = useState();
    const [hip, setHip] = useState();
    const [activity_level, setActivityLevel] = useState();

    const handleGenderChange = (value) => {
        setGender(value);
    }

    const handleAgeChange = (value) => {
        setInputAge(value);
    }

    const handleWeightChange = (value) => {
        setWeight(value);
    }

    const handleHeightChange = (value) => {
        setHeight(value);
    }

    const handleNeckChange = (value) => {
        setNeck(value);
    }

    const handleWaistChange = (value) => {
        setWaist(value);
    }

    const handleHipChange = (value) => {
        setHip(value);
    }

    const handleActivityLevelChange = (value) => {
        setActivityLevel(value);
    }

    const handleViewBodyDataClick = async () => {
        // const data = [{ gender, age, weight, height, neck, waist, hip, activity_level, timestamp }];
        const timestamp = new Date().toISOString().split('T')[0]

        const bmiResult = (weight / ((height / 100) ** 2)).toFixed(2);

        // const bfpResult = ((1.2 * (weight / (height / 100) ** 2)) - (10.8 * (gender === "Male" ? 1 : 0)) - 0.23 * age - 5.4).toFixed(2);

        // BMR
        let calculated_bmr;
        let initialBmrResult;
        let bmrResult;

        if (gender === 1) {
            bfpResult = ((495 / (1.0324 - 0.19077 * (Math.log10(waist - neck)) + 0.15456 * (Math.log10(height)))) - 450).toFixed(2)
            switch (activity_level) {
                case 1.1:
                    calculated_bmr = 66 + (6.2 * (weight * 2.205)) + (12.7 * (height / 2.54)) - (6.76 * age);
                    initialBmrResult = calculated_bmr * 1.2;
                    break;
                case 1.2:
                    calculated_bmr = 66 + (6.2 * (weight * 2.205)) + (12.7 * (height / 2.54)) - (6.76 * age);
                    initialBmrResult = calculated_bmr * 1.375;
                    break;
                case 1.3:
                    calculated_bmr = 66 + (6.2 * (weight * 2.205)) + (12.7 * (height / 2.54)) - (6.76 * age);
                    initialBmrResult = calculated_bmr * 1.55;
                    break;
                case 1.4:
                    calculated_bmr = 66 + (6.2 * (weight * 2.205)) + (12.7 * (height / 2.54)) - (6.76 * age);
                    initialBmrResult = calculated_bmr * 1.725;
                    break;
                case 1.5:
                    calculated_bmr = 66 + (6.2 * (weight * 2.205)) + (12.7 * (height / 2.54)) - (6.76 * age);
                    initialBmrResult = calculated_bmr * 1.9;
                    break;
                default:
                    break;
            }
        } else {
            // bfpResult = ((495 / (1.29579 - 0.35004 * (Math.log10(waist + hip - neck)) + 0.22100 * (Math.log10(height)))) - 450).toFixed(2);
            bfpResult = ((495 / (1.0324 - 0.19077 * (Math.log10(waist - neck)) + 0.15456 * (Math.log10(height)))) - 450).toFixed(2)
            switch (activity_level) {
                case 1.1:
                    calculated_bmr = 655.1 + (4.35 * (weight * 2.205)) + (4.7 * (height / 2.54)) - (4.7 * age);
                    initialBmrResult = calculated_bmr * 1.2;
                    break;
                case 1.2:
                    calculated_bmr = 655.1 + (4.35 * (weight * 2.205)) + (4.7 * (height / 2.54)) - (4.7 * age);
                    initialBmrResult = calculated_bmr * 1.375;
                    break;
                case 1.3:
                    calculated_bmr = 655.1 + (4.35 * (weight * 2.205)) + (4.7 * (height / 2.54)) - (4.7 * age);
                    initialBmrResult = calculated_bmr * 1.55;
                    break;
                case 1.4:
                    calculated_bmr = 655.1 + (4.35 * (weight * 2.205)) + (4.7 * (height / 2.54)) - (4.7 * age);
                    initialBmrResult = calculated_bmr * 1.725;
                    break;
                case 1.5:
                    calculated_bmr = 655.1 + (4.35 * (weight * 2.205)) + (4.7 * (height / 2.54)) - (4.7 * age);
                    initialBmrResult = calculated_bmr * 1.9;
                    break;
                default:
                    break;
            }
        }

        bmrResult = initialBmrResult.toFixed(2)

        const data = { gender, age, weight, height, bmiResult, bfpResult, bmrResult, activity_level, timestamp };
        const fileUri = `${FileSystem.documentDirectory}user_data.json`;
        try {
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const existingData = JSON.parse(fileContents);
                const newData = [...existingData, data];
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newData));
            } else {
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([data]));
            }
            alert('Data saved successfully!');
            navigation.navigate('Home')
        } catch (e) {
            console.log('Error writing to file user_data.json:', e);
            alert('Error saving data!');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Input Body Data</Text>

            <Text style={styles.categoryLabel}>Gender:</Text>
            <View style={styles.radioButtonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.radioButton,
                        gender === 1 ? styles.radioButtonSelected : null
                    ]}
                    onPress={() => handleGenderChange(1)}
                >
                    <Text style={gender === 1 ? styles.radioButtonTextSelected : styles.radioButtonText}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.radioButton,
                        gender === 2 ? styles.radioButtonSelected : null
                    ]}
                    onPress={() => handleGenderChange(2)}
                >
                    <Text style={gender === 2 ? styles.radioButtonTextSelected : styles.radioButtonText}>Female</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.categoryLabel}>Profile:</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>* Age (yrs)</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => handleAgeChange(value)}
                    value={age}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>* Weight (in kg)</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => handleWeightChange(value)}
                    value={weight}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>* Height (in cm)</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => handleHeightChange(value)}
                    value={height}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>* Neck Circumference (in cm)</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => handleNeckChange(value)}
                    value={neck}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>* Waist Circumference (in cm)</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(value) => handleWaistChange(value)}
                    value={waist}
                    keyboardType="numeric"
                />
            </View>
            {
                gender === 2 &&
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Hip Circumference (in cm)</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(value) => handleHipChange(value)}
                        value={hip}
                        keyboardType="numeric"
                    />
                </View>
            }

            <Text style={styles.categoryLabel}>Activity Level:</Text>
            <View style={styles.activityLevelsContainer}>
                {activity_levels_list.map((activity_level_item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.activityLevelButton,
                            activity_level === activity_level_item.value ? styles.activityLevelButtonSelected : null
                        ]}
                        onPress={() => handleActivityLevelChange(activity_level_item.value)}
                    >
                        <Text style={
                            activity_level === activity_level_item.value
                                ? styles.activityLevelButtonTextSelected
                                : styles.activityLevelButtonText}>
                            {activity_level_item.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="View Body Data"
                    onPress={handleViewBodyDataClick}
                    disabled={!gender || !age || !weight || !height || !neck || !waist || !activity_level}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#02aab0',
    },
    screenTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    categoryLabel: {
        color: "#fff",
        fontSize: 21,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    radioButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    radioButton: {
        borderWidth: 2,
        borderRadius: 50,
        padding: 10,
        borderColor: '#fff',
    },
    radioButtonSelected: {
        borderColor: '#000',
        backgroundColor: '#83d3d6'
    },
    radioButtonText: {
        color: "#fff",
        fontSize: 16
    },
    radioButtonTextSelected: {
        color: "#fff",
        borderColor: '#000',
        fontSize: 16
    },
    inputContainer: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff"
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    },
    activityLevelsContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    activityLevelButton: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    activityLevelButtonSelected: {
        backgroundColor: '#83d3d6'
    },
    activityLevelButtonText: {
        color: "#000",
        fontSize: 16
    },
    activityLevelButtonTextSelected: {
        color: "#fff",
        fontSize: 16
    },
    buttonContainer: {
        marginBottom: 50
    }
});