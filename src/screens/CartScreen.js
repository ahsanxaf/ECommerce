import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import {useSelector} from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {useDispatch} from 'react-redux'
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native'

const CartScreen = () => {

  const cart = useSelector((state) => state.cart.cart);
  const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
  console.info(total)

  const dispatch = useDispatch();
  const navigation =  useNavigation();

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item))
  }
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }
  const deleteItem = (item) => {
    dispatch(removeFromCart(item))
  }

  return (
    <ScrollView style={styles.containerMain}>
      <Header/>

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceContainerText1}>Subtotal: </Text>
        <Text style={styles.totalPriceContainerText2}>Rs. {total}</Text>
      </View>

      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable style={styles.buyButton} onPress={() => navigation.navigate('Confirm')}> 
        <Text>Proceed To Buy {cart.length} items</Text>
      </Pressable>

      <View style={styles.divider}/>

      <View style={{marginHorizontal: 10}}>
        {cart?.map((item, index) => (
          <View style={styles.productsOuterView} key={index}>

            <Pressable style={styles.productPressabel}>
              <View>
                <Image style={styles.image} source={{uri: item?.image}}/>
              </View>
              <View>
                <Text style={{width: 150, marginTop: 10, }} numberOfLines={3}>{item?.title}</Text>
                <Text style={[styles.totalPriceContainerText2, {marginTop: 6}]}>Rs.{item?.price}</Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text>
              </View>
            </Pressable>

            <Pressable style={styles.actionButtonsContainer}>
              <View style={styles.deleteButtonContainer}>
                {item?.quantity > 1 ? (
                  <Pressable style={styles.productActionButton} onPress={() => decreaseQuantity(item)}>
                    <Feather name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable style={styles.productActionButton} onPress={() => deleteItem(item)}>
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable style={styles.quantityButton}>
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable style={styles.productActionButton} onPress={() => increaseQuantity(item)}>
                  <Feather name="plus" size={24} color="black" />
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => deleteItem(item)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </Pressable>

            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15}}>
              <Pressable style={styles.deleteButton}>
                <Text>Save for Later</Text>
              </Pressable>
              <Pressable style={styles.deleteButton}>
                <Text>See More Like this</Text>
              </Pressable>
            </Pressable>

          </View>
        ))}
      </View>

    </ScrollView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: 55,
    backgroundColor: 'white'
  },
  totalPriceContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalPriceContainerText1: {
    fontSize: 18,
    fontWeight: '400'
  },
  totalPriceContainerText2: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buyButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  divider: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 16,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  productsOuterView: {
    backgroundColor: "white",
    marginVertical: 10,
    borderBottomColor: "#F0F0F0",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  productPressabel: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center'
  },
  productActionButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  deleteButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
  },
  quantityButton: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  deleteButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
    marginLeft: 5
  },
  actionButtonsContainer: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }
})