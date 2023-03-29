import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BFPWindow = ({ age, gender, bfpResult }) => {
    let label;
    const labelChooser = () => {
        let chosen;
        console.log(gender);
        if (gender == 1) {
            if (age >= 20 && age <= 29) {
                if (bfpResult < 8) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 8 && bfpResult <= 10.5) { chosen = "EXCELLENT" }
                else if (bfpResult >= 10.6 && bfpResult <= 14.8) { chosen = "GOOD" }
                else if (bfpResult >= 14.9 && bfpResult <= 18.6) { chosen = "FAIR" }
                else if (bfpResult >= 18.7 && bfpResult <= 23.1) { chosen = "POOR" }
                else if (bfpResult >= 23.2) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 30 && age <= 39) {
                if (bfpResult < 8) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 8 && bfpResult <= 14.5) { chosen = "EXCELLENT" }
                else if (bfpResult >= 14.6 && bfpResult <= 18.2) { chosen = "GOOD" }
                else if (bfpResult >= 18.3 && bfpResult <= 21.3) { chosen = "FAIR" }
                else if (bfpResult >= 21.4 && bfpResult <= 24.9) { chosen = "POOR" }
                else if (bfpResult >= 25) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 40 && age <= 49) {
                if (bfpResult < 8) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 8 && bfpResult <= 17.4) { chosen = "EXCELLENT" }
                else if (bfpResult >= 17.5 && bfpResult <= 20.6) { chosen = "GOOD" }
                else if (bfpResult >= 20.7 && bfpResult <= 23.4) { chosen = "FAIR" }
                else if (bfpResult >= 23.5 && bfpResult <= 26.6) { chosen = "POOR" }
                else if (bfpResult >= 26.7) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 50 && age <= 59) {
                if (bfpResult < 8) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 8 && bfpResult <= 19.1) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 19.2 && bfpResult <= 22.1) { chosen = "GOOD" }
                else if (bfpResult >= 22.2 && bfpResult <= 24.6) { chosen = "FAIR" }
                else if (bfpResult >= 24.7 && bfpResult <= 27.8) { chosen = "POOR" }
                else if (bfpResult >= 27.9) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 60 && age <= 69) {
                if (bfpResult < 8) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 8 && bfpResult <= 19.7) { chosen = "EXCELLENT" }
                else if (bfpResult >= 19.8 && bfpResult <= 22.6) { chosen = "GOOD" }
                else if (bfpResult >= 22.7 && bfpResult <= 25.2) { chosen = "FAIR" }
                else if (bfpResult >= 25.3 && bfpResult <= 28.4) { chosen = "POOR" }
                else if (bfpResult >= 28.5) { chosen = "DANGEROUSLY HIGH" }
            }
        }
        else {
            if (age >= 20 && age <= 29) {
                if (bfpResult < 14) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 14 && bfpResult <= 16.5) { chosen = "EXCELLENT" }
                else if (bfpResult >= 16.6 && bfpResult <= 19.4) { chosen = "GOOD" }
                else if (bfpResult >= 19.5 && bfpResult <= 22.7) { chosen = "FAIR" }
                else if (bfpResult >= 22.8 && bfpResult <= 27.1) { chosen = "POOR" }
                else if (bfpResult >= 27.2) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 30 && age <= 39) {
                if (bfpResult < 14) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 14 && bfpResult <= 17.4) { chosen = "EXCELLENT" }
                else if (bfpResult >= 17.5 && bfpResult <= 20.8) { chosen = "GOOD" }
                else if (bfpResult >= 20.9 && bfpResult <= 24.6) { chosen = "FAIR" }
                else if (bfpResult >= 24.7 && bfpResult <= 29.1) { chosen = "POOR" }
                else if (bfpResult >= 29.2) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 40 && age <= 49) {
                if (bfpResult < 14) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 14 && bfpResult <= 19.8) { chosen = "EXCELLENT" }
                else if (bfpResult >= 19.9 && bfpResult <= 23.8) { chosen = "GOOD" }
                else if (bfpResult >= 23.9 && bfpResult <= 27.6) { chosen = "FAIR" }
                else if (bfpResult >= 27.7 && bfpResult <= 31.2) { chosen = "POOR" }
                else if (bfpResult >= 31.3) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 50 && age <= 59) {
                if (bfpResult < 14) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 14 && bfpResult <= 22.5) { chosen = "EXCELLENT" }
                else if (bfpResult >= 22.6 && bfpResult <= 27) { chosen = "GOOD" }
                else if (bfpResult >= 27.1 && bfpResult <= 30.4) { chosen = "FAIR" }
                else if (bfpResult >= 30.5 && bfpResult <= 34.5) { chosen = "POOR" }
                else if (bfpResult >= 34.6) { chosen = "DANGEROUSLY HIGH" }
            }
            else if (age >= 60 && age <= 69) {
                if (bfpResult < 14) { chosen = "DANGEROUSLY LOW" }
                else if (bfpResult >= 14 && bfpResult <= 23.2) { chosen = "EXCELLENT" }
                else if (bfpResult >= 23.3 && bfpResult <= 27.9) { chosen = "GOOD" }
                else if (bfpResult >= 28 && bfpResult <= 31.3) { chosen = "FAIR" }
                else if (bfpResult >= 31.4 && bfpResult <= 35.4) { chosen = "POOR" }
                else if (bfpResult >= 35.5) { chosen = "DANGEROUSLY HIGH" }
            }
        }
        return chosen;
    }

    label = `Your BODY FAT PERCENTAGE is : ${bfpResult}% and you have a ${labelChooser()} body fat percentage for ${gender === 1 ? "MEN" : "WOMEN"} with an age of ${age}`
    return (
        <>
            <View style={styles.textContainer}>
                <Text enum={"simple"} style={styles.labelText}>{label}</Text>
            </View>
            <Image source={require('../../../assets/images/bfp-complex-table.png')} style={styles.bfpImage} />
        </>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50%"
    },
    bfpImage: {
        width: "55%",
        height: "50%",
        resizeMode: 'center',
    },
    labelText: {
        fontSize: 24,
        width: "80%",
        textAlign: 'center',
        flexShrink: 1,
        color: "#000",
        borderRadius: 15,
        backgroundColor: "#fff"
    },
});

export default BFPWindow;