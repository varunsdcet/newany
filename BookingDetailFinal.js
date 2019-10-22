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
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class BookingDetailFinal extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            loading: false,
            visible: false,
            time:[],

            selected: false,
            data: [],
            images: [
                {
                    days :'10.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
            ]
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING',
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

    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.calculateDay(s)
    }
    componentDidMount(){


        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
        var date = new Date()
        var s = moment(date).format('YYYY-MM-DD')

        this.calculateDay(s)

    }
    

    login = () => {
        if(GLOBAL.date=='' ||  GLOBAL.time==''){
            alert('Please select date and time')
            return
        }

        if(GLOBAL.appointmentArray.can_book_doctor_free  != 0) {

            const url = GLOBAL.BASE_URL + 'add_permanent_booking'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({


                    "user_id": GLOBAL.user_id,
                    "for": "4",
                    "module": GLOBAL.onlinetype,
                    "doctor_id": GLOBAL.appointmentArray.id,
                    "booking_for": "self",
                    "member_id": '',
                    "booking_time": GLOBAL.time,
                    "booking_date": GLOBAL.date,
                    "name": GLOBAL.onlinename,
                    "gender": GLOBAL.onlinegender,
                    "dob": GLOBAL.onlinedob,
                    "address": GLOBAL.onlineaddress,
                    "area": GLOBAL.onlinearea,
                    "pincode": GLOBAL.onlinecity,
                    "city_state": GLOBAL.onlinecity,
                    "coupan_code": 0,
                    "coupan_code_id": 0,
                    "total_amount": 0,
                    "discount_amount": 0,
                    "images": GLOBAL.listofimages,
                    "wallet_amount": '',
                    "referral_amount": '',
                    "is_package":"1"


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    // alert(JSON.stringify(responseJson))

                    //  this.rajorPay()
                    if (responseJson.status == true) {


                        this.props.navigation.navigate('Thankyou')
                        //   this.props.navigation.navigate('Thankyou')

                    } else {


                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
        }else {


            this.props.navigation.navigate('Payment')
        }
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {
        var a = this.state.time
        for (var i = 0;i<this.state.time.length ;i ++){

            this.state.time[i].is_selected = ''
        }
        var index = a[indexs]
        if (index.is_selected == ""){
            index.is_selected = "Y"
            GLOBAL.time = index.time
        }else{
            index.is_selected = ""
        }
        this.state.time[indexs] = index
        this.setState({time:this.state.time})
    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {item.is_selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                    }}>



                        <Text style={{color:'#707070',fontSize:16}}>
                            {item.time}

                        </Text>


                    </View>

                )}

                {item.is_selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>



                        <Text style={{color:'white',fontSize:16}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }



    calculateDay(date){


        const url = GLOBAL.BASE_URL +  'common_time'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({

                "select_date":date,
                "common_time_slots_comm":GLOBAL.onlinetype,
                "id":GLOBAL.appointmentArray.id


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.setState({time:responseJson.times})


                }else{
                    this.setState({time: []})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    showLoading() {
        this.setState({loading: true})
    }

    apicall () {
        const url = 'http://139.59.76.223/anytimedoc/api/master_prices'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"planned_visit"





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {

                    GLOBAL.price = responseJson.price

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }

    render() {

        var speciality = GLOBAL.appointmentArray.speciality_detail_array
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

                    <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                        <View style = {{flexDirection:'row',width :'100%'}}>

                            <View>
                                <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                                       source={{ uri: GLOBAL.appointmentArray.image }}/>
                                {GLOBAL.appointmentArray.doctor_avail_status == 1 && (

                                    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                        Available Today
                                    </Text>
                                )}
                                {GLOBAL.appointmentArray.doctor_avail_status != 1 && (

                                    <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                        Offline
                                    </Text>
                                )}


                            </View>

                            <View>

                                <View style = {{flexDirection:'row',width:'100%'}}>
                                    <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'70%',marginTop:18}}>

                                        {GLOBAL.appointmentArray.name}
                                    </Text>

                                    <View style = {{backgroundColor:'#F1AE42',borderRadius:4,width:45,height:25,marginTop:18,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
                                        <Image style = {{width :15 ,height :15,marginLeft:4,resizeMode:'contain'}}
                                               source={require('./star.png')}/>

                                        <Text style={{marginLeft : 5,fontSize : 12,marginTop:3,color :'white',fontFamily:'Poppins-Medium',}}>

                                            {GLOBAL.appointmentArray.ratting}
                                        </Text>
                                    </View>

                                </View>

                                <View style = {{flexDirection:'row'}}>
                                    <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',height:40,fontFamily:'Poppins-Medium',width :'50%'}}>

                                        {speciality}
                                    </Text>


                                </View>




                                <View style = {{flexDirection:'row'}}>
                                    <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                           source={require('./location.png')}/>

                                    <Text style={{marginLeft : 5,width:window.width - 150,height:30,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                        Branch: {GLOBAL.appointmentArray.lat_long_address}
                                    </Text>

                                </View>

                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                    <View>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Experience
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            {GLOBAL.appointmentArray.experience} Years
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Likes
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            {GLOBAL.appointmentArray.like}
                                        </Text>
                                    </View>

                                    <View style = {{marginRight:50}}>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Reviews
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            {GLOBAL.appointmentArray.total_review}
                                        </Text>
                                    </View>

                                </View>
                                {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(

                                <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                    Consult online for ₹ {GLOBAL.appointmentArray.online_consult_chat_price} onwards
                                </Text>
                                )}

                                {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(

                                    <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                        Consult online for ₹ 0 onwards
                                    </Text>
                                )}

                            </View>

                        </View>








                    </View>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Date
                    </Text>

                    <CalendarStrip

                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                        style={{height:120, paddingTop: 15}}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'white'}
                        highlightDateNameStyle={{color:'white'}}
                        highlightDateNumberStyle  ={{color:'white'}}

                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=> this.dates(date)}
                    />

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Time Slot
                    </Text>


                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.time}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Button
                        style={{padding:7,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        PROCEED
                    </Button>







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