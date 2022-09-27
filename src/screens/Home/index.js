import React from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import styles from './styles';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome to MyContacts
          <Text style={styles.description}>
            {'\n' + '\n'}MyContacts is a cross platform mobile application built
            using React Native.
          </Text>
          <Text style={styles.description}>
            {'\n' + '\n'}It maintains its data using an SQLite database.
          </Text>
          <Text style={styles.description}>
            {'\n' + '\n'}It allows its users to add, view, update, and delete
            contacts.
          </Text>
        </Text>
      </View>
      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          onPress={() => console.log('Go To Contacts!')}>
          <Text style={styles.buttonText}>Go To Contacts!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
