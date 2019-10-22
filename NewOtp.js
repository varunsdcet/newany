import React, {Component} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage, View,Image,Modal ,Alert,FlatList,Dimensions ,TouchableHighlight,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';

type Props = {};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
import DeviceInfo from "react-native-device-info";
const GLOBAL = require('./Global');

var codes = '';
export default class NewOtp extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        modalVisible: false,
        visible:false,
        visibles:false,
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
    }



    componentDidMount(){
//        alert(GLOBAL.otps)
    }

    valide = () =>{

//       alert(GLOBAL.mymobile)

        if (codes == ''){
            alert('Please Enter OTP')
        }    else if(GLOBAL.otps==codes){

            const url = GLOBAL.BASE_URL +  'user_detail_after_otp'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    mobile: GLOBAL.mymobile,
                    deviceID:  DeviceInfo.getUniqueId(),
                    deviceType: 'ios',
                    deviceToken: GLOBAL.deviceToken,
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory:'',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                    voip_token:GLOBAL.voip,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.status == true) {
                        this.setState({ results: responseJson.user_detail })

                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('TabNavigator')


                    }
                    this.hideLoading()
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }
        else {
            alert('Entered OTP is Invalid.')
        }
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    _onFulfill =(code) => {
        codes = code
        console.log('Pressed!');




        // this.props.navigation.navigate('Otp')

    }
    render() {
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>

                        <Text style = {{marginLeft: '5%',width:'70%',color:'black',fontSize: 36,marginTop: '20%',fontFamily:'Poppins-Medium'}}>
                            Verify your number

                        </Text>

                        <Text style = {{marginLeft: '5%',width:'90%',color:'#000000',fontSize: 18,marginTop: '4%',fontFamily:'Poppins-Light'}}>
                            Otp has been sent to your mobile number

                        </Text>

                        <CodeInput
                            ref="codeInputRef1"
                            keyboardType="numeric"

                            className={'border-b'}
                            space={38}
                            codeLength ={4}
                            size={50}

                            activeColor = '#77869E'
                            inactiveColor =  '#77869E'
                            onFulfill={(code) => this._onFulfill(code)}
                        />






                        <Button
                            containerStyle={{ marginLeft:20,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent',marginTop:30}}

                            style={{fontSize: 18, color: '#0592CC',fontFamily:'Poppins-Medium',width:'auto', alignSelf:'flex-start'}}
                            onPress={this.buttonClickListenerss}>
                            RESEND CODE?
                        </Button>

                        <TouchableOpacity onPress={() => this.valide()}
                                style = {{width :60 ,height: 60,marginLeft:'77%',marginTop:-50}}
                        >

                            <Image style = {{width :60 ,height: 60,resizeMode: 'contain'}}
                                   source={require('./otp.png')}/>

                        </TouchableOpacity>

                    </KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})