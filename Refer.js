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
    ImageBackground,
    ScrollView,

    SafeAreaView,
    AsyncStorage, Share
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Refer extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'REFER A FRIEND',
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
    _fancyShareMessage=()=>{


        var a = `Share this Referral code to get Bonus ${GLOBAL.referal}`;
        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this news via....'
            }
        ).then(this._showResult);
    }


    hideLoading() {
        this.setState({loading: false})
    }


    showLoading() {
        this.setState({loading: true})
    }
    componentDidMount() {


    }

    renderItem=({item}) => {
        return(

            <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop:15,marginLeft:15,marginRight:15, height: 'auto',borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>


                {item.module == "1" && item.booking_type == "Emergency Visit" && (
                    <View>

                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}> Appointment ID :{item.appointment_id}</Text>
                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}> Booking Type :{item.booking_type}</Text>
                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}> Booking ID :{item.booking_id}</Text>
                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}> Booking Status :{item.booking_status}</Text>
                    </View>
                )}



                {item.booking_type != "Emergency Visit" &&  (
                    <View style={{flexDirection:'row'}}>

                        <Image style={{width:70, height:70,borderRadius:35,marginTop:15,marginLeft:5}}
                               source={{uri : item.doctor_image}}/>

                        <View style={{flexDirection: 'column', marginTop:15,marginLeft:5}}>
                            <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>{item.doctor_name}</Text>
                            <Text style={{color:'#C0C0C0', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>{item.doctor_address}</Text>
                            <Text style={{color:'#C0C0C0', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}> Date :{item.appointment_date}</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Time :{item.appointment_time}</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Booking Type :{item.booking_type}</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Booking Status :{item.booking_status}</Text>
                            <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>{item.remain_days} Days Remaining</Text>
                            <View style={{flexDirection:'row',marginTop:15}}>

                                {item.reshedule_power == 1 && (
                                    <Button style={{fontSize:20,color:'#0592CC',fontFamily:'Poppins-Medium'}}
                                            containerStyle={{overflow:'hidden',justifyContent:'center'}}>

                                        RESCHEDULE
                                    </Button>
                                )}

                                {item.cancel_power == 1 && (
                                    <Button style={{fontSize:20,color:'#FF0000',fontFamily:'Poppins-Medium'}}
                                            containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:50}}>
                                        CANCEL
                                    </Button>
                                )}
                            </View>

                        </View>



                    </View>
                )}







            </View>

        );
    }

    _keyExtractor=(item, index)=>item.key;



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
            <ScrollView>
                <SafeAreaView style={{flex:1}}>
                    <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height,backgroundColor:'#F2F5F7'}}>
                        <View style={{width : Dimensions.get('window').width,height : Dimensions.get('window').height-250,flexDirection:'column',backgroundColor:'white'}}>
                            <Image source={require('./referlogo1.png')}
                                   style={{ height:135,width:135,alignSelf:'center',borderRadius:3, marginTop:50,resizeMode:'contain'}} />

                            <Text style={{fontSize:18,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:30}}>Welcome to the Anytimedoc App</Text>
                            <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:10,marginLeft:15,marginRight:15}}>Get 300 anytimedoc point for each friend that signup and complete a transaction. They get 100 points as well</Text>


                            <Text style={{fontSize:19,alignSelf:'center',fontFamily:'Poppins-Regular',marginTop:10,color:'#575353'}}>Share your referral code</Text>

                            <ImageBackground source={require('./curlview.png')}
                                   style={{ height:70,width:290,alignSelf:'center',resizeMode:'contain',marginTop:10}}>


                                <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:10,borderColor:'#57535326'}}>
                                </View>

                                <Text style={{fontSize:19,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:10}}>{GLOBAL.referal}</Text>

                                <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:10,borderColor:'#57535326'}}>
                                </View>
                            </ImageBackground>




                        </View>

                        <Text style={{fontSize:21,fontFamily:'Poppins-Regular',marginTop:25,marginLeft:25,color:'#385C8E'}}>Share Via</Text>

                        <View style={{flexDirection:'row',marginTop:20,marginLeft:27,alignItems:'center'}}>

                            <TouchableOpacity  onPress={()=>this._fancyShareMessage()}>
                                <Image source={require('./referlogo2.png')}
                                       style={{ height:60,width:60,resizeMode:'contain'}} />
                            </TouchableOpacity>

                            <TouchableOpacity   onPress={()=>this._fancyShareMessage()}>
                                <Image source={require('./referlogo3.png')}
                                       style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
                            </TouchableOpacity>

                            <TouchableOpacity   onPress={()=>this._fancyShareMessage()}>
                                <Image source={require('./referlogo4.png')}
                                       style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
                            </TouchableOpacity>

                            <TouchableOpacity   onPress={()=>this._fancyShareMessage()}>
                                <Image source={require('./referlogo5.png')}
                                       style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
                            </TouchableOpacity>

                        </View>



                    </View>
                </SafeAreaView>
            </ScrollView>

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

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})