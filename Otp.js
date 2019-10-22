import React, {Component} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage,Platform, View,Image,Modal ,Alert,FlatList,Dimensions ,TouchableHighlight,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import DeviceInfo from 'react-native-device-info';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';

type Props = {};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
const GLOBAL = require('./Global');

var codes = '';
export default class Otp extends Component {
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

//        alert(GLOBAL.myname)

        if (codes == ''){
            alert('Please Enter OTP')
        }    else if(GLOBAL.otps==codes){

            const url = GLOBAL.BASE_URL +  'Signup'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    name: GLOBAL.myname,
                    mobile: GLOBAL.mymobile,
                    email: GLOBAL.myemail,
                    password: GLOBAL.mypassword,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.deviceToken,
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory:'',
                    has_notch: '',
                    auth:'normal',
                    manufacture: '',
                    ip_address: '',
                    is_refer_verify:GLOBAL.is_refer_verify,
                    apply_to :GLOBAL.apply_to,
                    referral_code_other :GLOBAL.referral_code_other,
                    voip_token:GLOBAL.voip,



                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                 //   alert(JSON.stringify(responseJson))
                    if (responseJson.status == true) {



                        this.setState({ results: responseJson.user_detail })


                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('BasicDetail')


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
                            containerStyle={{marginLeft:15, padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent',marginTop:30,alignSelf:'flex-start'}}

                            style={{fontSize: 18, color: '#0592CC',fontFamily:'Poppins-Medium'}}
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

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
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