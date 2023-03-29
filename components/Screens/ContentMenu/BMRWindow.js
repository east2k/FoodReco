import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';

const BMRWindow = ({ bmrResult }) => {
    label = `Your Basal Metabolic Rate: ${bmrResult} is the \nnumber of calories you burn as your body performs. Also known as Resting Metabloic Rate.`;
    return (
        <>
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

export default BMRWindow;