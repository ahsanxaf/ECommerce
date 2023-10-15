import React, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    StyleSheet,
    SafeAreaView, 
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
    TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();


    useEffect(() => {
       const checkLoginStatus = async() => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if(token){
                navigation.navigate('Main')
            }
        } catch (error) {
            console.log("Error message: ", error)
        }
       } 
       checkLoginStatus();
    }, [])

    const handleLogin = () => {
        navigation.navigate('Main')
        // const user = {
        //     email: email,
        //     password: password,
        // }

        // axios.post("http://192.168.168.209/login", user).then((response) => {
        //     console.log(response);
        //     const token =  response.data.token;
        //     AsyncStorage.setItem('authToken', token)
        //     console.log('Login Success')
        // }).catch((error) => {
        //     Alert.alert("Login Error", "Invalid Email");
        //     console.log(error);
        // })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 30}}>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                    uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42'}}>Login to Your Account</Text>
                </View>
                <View style={{marginTop: 60}}>
                    <View style={styles.textInputContainer}>
                        <MaterialIcons style={styles.textInputIcon} name="email" size={24} color="gray" />
                        <TextInput style={{color: 'gray', marginVertical: 10, width: 300,  fontSize: email ? 16 : 16}}
                            placeholder="Enter Your Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <View style={styles.textInputContainer}>
                        <AntDesign style={styles.textInputIcon} name="lock1" size={24} color="gray" />
                        <TextInput 
                            style={{color: 'gray', marginVertical: 10, width: 300,fontSize: password ? 16 : 16}}
                            placeholder="Enter Your Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={{marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text>Keep me loggedin</Text>
                    <Pressable>
                        <Text style={{color: '#007FFF', fontWeight: 500}}>Forget Password</Text>
                    </Pressable>
                </View>
                <View style={{marginTop: 80}}/>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                        Login
                    </Text>
                </TouchableOpacity>

                <Pressable style={{marginTop: 15}} onPress={() => {navigation.navigate('Register')}}>
                    <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>Don't have an account? Sign Up</Text>
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    textInputIcon: {
        marginLeft: 8,
    },
    loginButton: {
        width: 200,
        backgroundColor: '#FEBE18',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        borderRadius: 6
    }
});