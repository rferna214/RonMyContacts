import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Contact from '../../components/Contact';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { openDatabase } from "react-native-sqlite-storage";

const myContactsDB = openDatabase({name: 'MyContacts.db'});
const contactsTableName = 'contacts';

const ContactsScreen = props => {

  const navigation = useNavigation();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      
      let results = [];
      myContactsDB.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${contactsTableName}`,
          [],
          (_, res) => {
            let len = res.rows.length;
            console.log('Length of Contacts ' + len);
            if (len > 0){
              for (let i = 0; i < len; i++){
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  phone: item.phone,
                  email: item.email,
                });
              }
              setContacts(results);
            } else {
              setContacts([]);
            }
          },
          error => {
            console.log('Error getting Contacts ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
        data={contacts}
        renderItem={({item}) => <Contact post={item} />}
        keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Add Contact')}>
                <Text style={styles.buttonText}>Add Contact</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ContactsScreen;