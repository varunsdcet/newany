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

    ActivityIndicator,TouchableOpacity,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class PharmacyOrder extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'YOUR ORDER',
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



    componentDidMount() {
        this.loadAppointments()
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }

    _handleStateChange = state => {

        this.loadAppointments()
    };

    loadAppointments(){
        const url = GLOBAL.BASE_URL + 'list_pharmacy_history'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                if (responseJson.status == true) {
                    this.setState({results: responseJson.list})


                } else {
                    this.setState({results: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    confirmCancel=(item, index)=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_pharmacy_booking'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "booking_id": item.id,
                "user_id":GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Order cancelled successfully!')
                   this.props.navigation.goBack()


                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    onPressResc=(item,index)=>{
        alert(JSON.stringify(item))
        GLOBAL.appointment_details = item
        this.props.navigation.navigate('AppointmentResc')
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


    openDetail=(item)=>{

        GLOBAL.appointment_details = item
        this.props.navigation.navigate('AppointmentDetail')
    }

    renderItem=({item, index}) => {
        return(

            <TouchableOpacity onPress={()=> this.openDetail(item)}>
                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,
                    flex: 1 ,marginTop:15,marginLeft:15,marginBottom:10,
                    marginRight:15, height: 'auto',borderRadius :6,
                    width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2, }}>











                            <View style={{flexDirection: 'column', marginTop:15,marginLeft:5,width:'100%'}}>




                                {item.status == 0 && (
                                    <View>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Order Id :{item.id}</Text>
                                    <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Status :Pending</Text>
                                    </View>
                                        )}

                                {item.status == 2 && (
                                    <View>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Order Id :{item.id}</Text>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Status :Cancelled by user</Text>
                                    </View>
                                )}


                                {item.status == 3 && (
                                    <View>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Order Id :{item.id}</Text>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Status :Cancelled by Admin</Text>
                                    </View>
                                )}

                                {item.status == 1 && (
                                    <View>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Order Id :{item.id}</Text>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Phramacy :{item.pharmacy_detail}</Text>
                                        <Text style={{color:'black', fontSize:14,fontFamily:'Poppins-Medium',marginTop:8}}>Amount :{item.amount}</Text>
                                    </View>
                                )}



                                <View style={{flexDirection:'row',marginTop:15}}>



                                    {item.status == 0 && (
                                        <Button style={{fontSize:20,color:'#FF0000',fontFamily:'Poppins-Medium'}}
                                                containerStyle={{overflow:'hidden',justifyContent:'center',marginLeft:50}}
                                                onPress={()=> this.onPressCancel(item, index)}>
                                            CANCEL
                                        </Button>
                                    )}
                                </View>

                            </View>












                </View>
            </TouchableOpacity>
        );
    }

    _keyExtractor=(item, index)=>item.key;



    render() {

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
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f1f1f1',

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