import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,

    Dimensions,
    ActivityIndicator,


} from 'react-native';


import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');


class HistoryDetail extends React.Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        response :[],
        responses :[],
        loading:false,results:[],
        visible:false,a_details:''
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING DETAILS',
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


    componentDidMount(){


    }

    confirmCancel=()=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_medical_equipment'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "booking_id": GLOBAL.equipment.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Booking cancelled successfully!')
//                    this.loadAppointments()


                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    onPressCancel=(item, index)=>{
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => this.confirmCancel(item,index)
                }
            ],
            {
                cancelable: false
            }
        );
        return true;
    }


    getDirections=()=>{
        var lat= GLOBAL.appointment_details.doctor_lat
        var lot= GLOBAL.appointment_details.doctor_long

        var url = `https://www.google.com/maps?saddr=My+Location&daddr=`+lat+','+lot;
//    alert(url)
        Linking.openURL(url);


    }

    clickResc=()=>{

        this.props.navigation.navigate('AppointmentResc')
    }

    renderItems=({item}) => {

        return(


            <TouchableOpacity onPress={() => Linking.openURL(item)
            }>


                <View style={{flexDirection: 'row', marginTop:2,marginLeft:2,borderBottomColor:'grey',borderBottomWidth:1,marginBottom:4}}>

                    <Image source={{uri :item}}
                           style  = {{width:100, height:100,marginTop: 3,marginLeft:5
                           }}

                    />

                </View>



            </TouchableOpacity>



        );
    }

    renderItem=({item}) => {
        return(





            <View style={{flexDirection: 'row', marginTop:2,marginLeft:2,borderBottomColor:'grey',borderBottomWidth:1,marginBottom:4}}>

                <Text style={{color:'grey', fontSize:14,fontFamily:'Poppins-Regular',margin:8}}>{item.test_name}</Text>

            </View>







        );
    }

    render() {
        var yeah =  GLOBAL.labdetail
        if(this.state.loading){
            return(
                <View style={{
                    flex:1,
                    backgroundColor :'#f1f1f1'

                }}>
                    <ActivityIndicator style = {{
                        position: 'absolute',
                        left: window.width/2 - 30,

                        top: window.height/2,

                        opacity: 0.5,

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                                       size="large" color='#006FA5' />
                </View>
            )
        }

        return(
            <ScrollView>

                <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height, flexDirection:'column'}}>




                    <Text style={{fontSize:14,fontFamily:'Poppins-Regular',color:'grey',marginLeft:10}}> ID :{GLOBAL.equipment.id}</Text>
                    <Text style={{fontSize:14,fontFamily:'Poppins-Regular',color:'grey',marginLeft:10}}>Booking Status :{GLOBAL.equipment.booking_status}</Text>
                    <Text style={{fontSize:14,fontFamily:'Poppins-Regular',color:'grey',marginLeft:10}}>Order Amount :{GLOBAL.equipment.order_price}</Text>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Delivery Date and time</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>{GLOBAL.equipment.delivery_date}, {GLOBAL.equipment.delivery_time}</Text>


                    {GLOBAL.equipment.cancel_power == 0 && (
                        <Text style={{height:1}}></Text>
                    )}
                    {GLOBAL.equipment.cancel_power != 0 && (
                        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>




                            <Button style={{fontSize:18,color:'#FF2D00',fontFamily:'Poppins-Medium'}}
                                    containerStyle={{marginLeft:25,backgroundColor:'white'}}
                                    onPress={()=> this.onPressCancel()}>
                                CANCEL
                            </Button>

                        </View>

                    )}

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>


                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Information</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Name :{GLOBAL.equipment.product_name}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Quantity:{GLOBAL.equipment.quantity}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Type:{GLOBAL.equipment.equipment_type}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>For:{GLOBAL.equipment.for_month_week}</Text>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Address</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Address :{GLOBAL.equipment.address}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Area:{GLOBAL.equipment.area}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>Pincode:{GLOBAL.equipment.pincode}</Text>
                    <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'grey',marginLeft:20,marginTop:10}}>State:{GLOBAL.equipment.city_state}</Text>
                    {/*        <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#27272D',marginLeft:20,marginTop:6}}>19, Maurya Enclave, Poorvi Pitampura</Text>
*/}
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>

                        {yeah.cancel_power == 0 && (
                            <Text style={{height:1}}></Text>
                        )}


                    </View>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>





                </View>

            </ScrollView>
        );
    }
}

export default HistoryDetail;