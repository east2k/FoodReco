import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Button } from 'react-native';
// import * as FileSystem from 'expo-file-system';

const HomeWindow = ({ navigation }) => {

  const [pressed, setPressed] = useState(
    [{
      id: 1,
      currentState: false,
      pressableText: "Input Body Data",
      pressableEvent: () => openProfilingWindow()
    },
    {
      id: 2,
      currentState: false,
      pressableText: "View Diet",
      pressableEvent: () => openBodyTypeWindow()
    },
    {
      id: 3,
      currentState: false,
      pressableText: "User's Body Data History",
      pressableEvent: () => openUserProfile()
    }]
  )

  const openProfilingWindow = () => {
    // TODO: Implement openProfilingWindow function
    navigation.navigate('ProfilingWindow')
  }

  const openBodyTypeWindow = () => {
    navigation.navigate('DietOptions')
  }

  const openUserProfile = () => {
    navigation.navigate('Profile')
  }

  const handlePressIn = (id) => {
    setPressed(prevPressed => {
      return prevPressed.map(item => {
        return id === item.id ? {
          ...item,
          currentState: true
        } : {
          ...item
        }
      })
    });
  };

  const handlePressOut = (id) => {
    setPressed(prevPressed => {
      return prevPressed.map(item => {
        return id === item.id ? {
          ...item,
          currentState: false
        } : {
          ...item
        }
      })
    });
  };

  // const delItems = async () => {
  //   const fileUri = `${FileSystem.documentDirectory}user_data.json`;
  //   try {
  //     await FileSystem.deleteAsync(fileUri);
  //     alert('File deleted successfully!');
  //   } catch (e) {
  //     console.log('Error deleting file:', e);
  //     alert('Error deleting file!');
  //   }
  // }

  const newPressable = pressed.map((item, index) => {
    return (
      <Pressable
        key={index}
        style={item.currentState ? styles.gotoButtonHover : styles.gotoAnotherWindow}
        onPress={item.pressableEvent}
        onPressIn={() => handlePressIn(item.id)}
        onPressOut={() => handlePressOut(item.id)}
      >
        <Text style={item.currentState ? styles.gotoTextHover : styles.gotoText}>{item.pressableText}</Text>
      </Pressable>
    )
  })

  return (
    <View style={styles.container}>
      <Text style={styles.menuLabel}>Main Menu</Text>
      <View style={styles.gotoContainer}>
        {newPressable}
      </View>
      {/* <Button title="Dev Tool" onPress={delItems} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuLabel: {
    fontSize: 32,
    fontWeight: 800,
    marginHorizontal: 20,
    marginTop: 50,
    color: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: '#02aab0',
  },
  gotoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 150,
    marginTop: 50
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
  gotoButtonHover: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
    width: "90%",
    borderRadius: 50
  },
  gotoTextHover: {
    color: "black",
    fontSize: 21,
    fontWeight: 700,
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 3,
  },
});

export default HomeWindow;