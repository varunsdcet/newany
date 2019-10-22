import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';

const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Confirmation extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        images :[
            {
                title :'Planned Visit',
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),
                price :' INR 100 ',

            },
            {
                title :'Emergency',
                image :require('./female.png'),
                selected:'',
                images :require('./females.png'),
                price :' INR 100 ',

            },
        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'CONFIRMATION',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
        //   this._handlePressLogin()
    }


    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
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
                <KeyboardAwareScrollView>
                <View style={styles.container}>

                    <View style = {{width:window.width,height:300,backgroundColor:'#0592CC'}}>



                        <Image style = {{width :200 ,height: 70,alignSelf:'center',marginTop:'12%',resizeMode: 'contain'}}
                               source={require('./confirm.png')}/>

                        <Text style={{alignSelf:'center',marginTop:10,fontSize : 27,color :'white', height:'auto',fontFamily:'Poppins-Medium',textAlign :'center'}}>

                            Appointment Confirmed
                        </Text>

                        <Text style={{alignSelf:'center',marginTop:18,fontSize : 18,color :'white', height:'auto',fontFamily:'Poppins-Regular',textAlign :'center'}}>

                            Confirmation email and SMS has been sent on your registered details
                        </Text>

                    </View>


                    <View style = {{marginLeft:10,width:window.width - 20 ,backgroundColor:'white',height:250,marginTop:-30,    borderWidth: 1,
                        borderRadius: 8,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,}}>

                        <View style = {{flexDirection:'row',justifyContent:'space-around',marginTop:12}}>
                            <Text style={{fontSize : 18,color :'#0592CC', height:'auto',fontFamily:'Poppins-Medium'}}>

                                Booking Id: 0712
                            </Text>

                            <Text style={{fontSize : 18,color :'#0592CC', height:'auto',fontFamily:'Poppins-Medium'}}>

                                OTP: 123456
                            </Text>

                        </View>


                        <View style = {{flexDirection:'row'}}>

                            <Image style = {{width :70 ,height: 70,borderRadius:4,marginTop:'2%',marginLeft:20}}
                                   source={require('./splash.png')}/>

                                   <View style = {{marginLeft:20}}>
                                       <Text style={{fontSize : 16,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',marginTop:20}}>

                                           Dr Jhunjhun wala
                                       </Text>

                                       <Text style={{fontSize : 16,color :'#707070', height:'auto',fontFamily:'Poppins-Regular'}}>

                                           Sector 102, Gurugram
                                       </Text>


                                   </View>
                        </View>

                        <View style = {{backgroundColor:'#707070',width:window.width - 40,margin :10,height:1,marginTop:20}}>

                        </View>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginLeft:20,marginTop:0}}>
                            <Text style={{fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular'}}>

                               Name
                            </Text>
                            <Text style={{marginRight: 30,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                                Kapil Rajput
                            </Text>
                        </View>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginLeft:20,marginTop:0}}>
                            <Text style={{fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular'}}>

                                Date
                            </Text>
                            <Text style={{marginRight: 30,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                                01 Dec 2017
                            </Text>
                        </View>



                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginLeft:20,marginTop:0}}>
                            <Text style={{fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular'}}>

                                Time
                            </Text>
                            <Text style={{marginRight: 30,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                                12.00 am
                            </Text>
                        </View>



                    </View>






                    <Button
                        style={{padding:7,marginTop:'10%',fontSize: 20, color: 'white',backgroundColor:'#0592CC',alignSelf:'center',width:'50%',height:25,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        GO TO HOME
                    </Button>




                </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
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
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
})