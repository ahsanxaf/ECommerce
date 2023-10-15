import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, {useState, useContext, useEffect, useCallback} from 'react'
import Header from '../components/Header'
import { MaterialIcons } from "@expo/vector-icons";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {userType} from '../UserContext'
import axios from 'axios';
import { Entypo } from "@expo/vector-icons";

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(userType);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.219.209:8000/address/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  //refresh the addresses when the component comes to the focus that us basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  )

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

        <Pressable>
          {/* all the added addresses */}
          {addresses?.map((item, index) => (
            <Pressable 
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Pakistan, Islamabad
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Postal Code: {item?.postalCode}
              </Text>

              <View 
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>

            </Pressable>
          ))}
        </Pressable>

      </View>

    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({})