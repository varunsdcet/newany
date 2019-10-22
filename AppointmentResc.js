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

export default class AppointmentResc extends Component {
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
            rescdate:GLOBAL.appointment_details.appointment_date,
            resctime:GLOBAL.appointment_details.appointment_time,
            selected: false,
            data: [],
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'RESCHEDULE APPOINTMENT',
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


    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
        this.setState({rescdate: s})
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
        alert(JSON.stringify(GLOBAL.appointment_details))
        // if(GLOBAL.date=='' ||  GLOBAL.time==''){
        //     alert('Please select date and time')
        //     return
        // }

//        this.props.navigation.navigate('Payment')
        var dataresc= GLOBAL.appointment_details
//        alert(dataresc.module)
        this.showLoading()
            const url = GLOBAL.BASE_URL + 'reshedule_booking'

            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "booking_id": dataresc.booking_id,
                "booking_date":this.state.rescdate,
                "booking_time":this.state.resctime,
                "module":dataresc.module

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//               alert(JSON.stringify(responseJson))
                this.hideLoading()

                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                    alert('Appointment has been resceduled successfully!')

                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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
            this.setState({resctime: index.time})
        }else{
            index.is_selected = ""
        }
        this.state.time[indexs] = index
        this.setState({time:this.state.time})
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

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//                alert(JSON.stringify(responseJson))
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



    render() {

        var speciality = GLOBAL.appointmentArray.speciality_detail_array

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

                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>


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
                        style={{padding:5,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red',}}
                        onPress={() => this.login()}>
                        PROCEED
                    </Button>
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

})