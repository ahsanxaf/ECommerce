import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const CartScreen = () => {
  return (
    <ScrollView style={styles.containerMain}>
      <Header/>
    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: 55,
    backgroundColor: 'white'
  }
})