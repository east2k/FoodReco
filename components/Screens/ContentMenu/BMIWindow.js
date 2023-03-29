import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';

const BMIWindow = ({bmiResult}) => {
    console.log(bmiResult);
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
    return (
        <>
            <Image source={require('../../../assets/images/bmi-table.png')} />
            <Text style={styles.labelText}>{label}</Text>
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default BMIWindow;