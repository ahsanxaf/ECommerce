import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { MaterialIcons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';

const AddAddressScreen = () => {
    const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Header/>

      <View >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
            onPress={() => navigation.navigate("Address")}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                paddingVertical: 7,
                paddingHorizontal: 5,
            }}
        >
            <Text>Add a new Address</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
      </View>

    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({})