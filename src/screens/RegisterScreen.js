import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    Image, 
    Pressable, 
    KeyboardAvoidingView,
    TextInput,
    Alert,
    TouchableOpacity
} from 'react-native'
import React, {useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigatoin = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        //send a post req to backend api to register
        axios.post('http://192.168.168.209:8000/register', user).then((response) => {
            console.log(response.data?.message);
            Alert.alert('Registration Successfull', 'You have registered successfully');
            setName('');
            setEmail('');
            setPassword('');
        }).catch((error) => {
            console.info('User Data: ', user);
            Alert.alert('Registration Error', "An error occured during registration");
            console.log('Registration Failed: ', error);
        })
    };

  return (
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
                <Text style={{fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42'}}>Register to Your Account</Text>
            </View>
            <View style={{marginTop: 20}}>
                <View style={styles.textInputContainer}>
                    <Ionicons style={styles.textInputIcon} name="ios-person" size={24} color="gray" />
                    <TextInput style={{color: 'gray', marginVertical: 10, width: 300,  fontSize: name ? 16 : 16}}
                        placeholder="Enter Your Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
            </View>
            <View style={{marginTop: 10}}>
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
            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                    Register
                </Text>
            </TouchableOpacity>

            <Pressable style={{marginTop: 15}} onPress={() => {navigatoin.navigate('Login')}}>
                <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
                    Already have an account? Sign In
                </Text>
            </Pressable>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen;

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