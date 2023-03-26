import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Row } from 'react-native-table-component';

const GENDERS = {
    1: "Male",
    2: "Female"
}

const tableHead = [
    'Weight (kg)',
    'Height (cm)',
    'BMI',
    'BFP',
    'BMR',
    'Timestamp',
];

export default function UserProfile({ navigation }) {
    const [userData, setUserData] = useState();

    useEffect(() => {
        const handleReadData = async () => {
            const fileUri = `${FileSystem.documentDirectory}user_data.json`;
            console.log(fileUri);
            try {
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                console.log('Data in file:', data);
                const temp = data.map((row) => [
                    row.weight,
                    row.height,
                    row.bmiResult,
                    row.bfpResult,
                    row.bmrResult,
                    row.timestamp,
                ]).reverse()
                setUserData([...temp])
                // setUserData([...temp, ...temp, ...temp, ...temp, ...temp])
            } catch (e) {
                alert('Error reading data!');
                navigation.navigate('ProfilingWindow')
            }
        };
        handleReadData()
    }, [])

    const renderHeader = () => {
        return (
            <Row data={tableHead} style={styles.rowHeader} textStyle={styles.head} />
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <Row data={item} style={[styles.row, { backgroundColor: index % 2 ? '#fff' : '#e8e6e6' }]} textStyle={styles.text} />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleLabel}>User's Body History</Text>
            {!userData
                ? <Text style={{ color: "#fff" }}>Loading...</Text>
                :
                <FlatList
                    data={userData}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    style={styles.tableContainer}
                />
            }
            <Pressable
                style={(state) => state.pressed ? styles.backButtonHover : styles.backButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0F0C0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleLabel: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000',
        padding: 25,
        marginTop: 25
    },
    tableContainer: {
        position: "relative",
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
    },
    rowHeader: {
        backgroundColor: "#cccccc",
        paddingVertical: 2,
    },
    head: {
        fontSize: 12,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    row: {
        paddingVertical: 2,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
    headText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
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
        color: '#000'
    },
    backButtonText: {
        fontSize: 21,
        margin: "auto",
        color: "#fff"
    }
});