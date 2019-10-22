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
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';
const GLOBAL = require('./Global');
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class DoctorVisitDetail extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            problem:'',
            loading: false,
            visible: false,
            time:[],
            address :[],

            selected: false,
            data: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]
        }
    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PLANNED VISIT',
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
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


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


                if (responseJson.status == true) {
                    this.setState({time:responseJson.times})
                  this.apicall()

                }
                else{
                    this.setState({time: []})
                    GLOBAL.time=''
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
//alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {

             GLOBAL.price = responseJson.price
                    GLOBAL.type = "100"


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    _handleStateChange = (state) => {
        this.setState({address :GLOBAL.selectedAddress})

    }
    componentDidMount(){



        this.props.navigation.addListener('willFocus',this._handleStateChange);



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
        //   this._handlePressLogin()
    }


    login = () => {
        this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
       // alert('dd')
        this.setState({selected:true})
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



                        <Text style={{color:'#707070',fontSize:18,textAlign:'center'}}>
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



                        <Text style={{color:'white',fontSize:18,textAlign:'center'}}>
                            {item.time}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
    }

    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
            this.calculateDay(s)
    }

    pay = ()=>{
                if(GLOBAL.time ==''){
            alert('Please select time')
            return
        }

        if(GLOBAL.selectedAddress.length==0){
            alert('Please select address')
            return
        }
        GLOBAL.problem = this.state.problem

        this.props.navigation.navigate('Payment')
    }
    render() {

        let { username } = this.state;
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        let { problem } = this.state;
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

                        <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                            Problem
                        </Text>
                        <View style = {{marginLeft:5,width:window.width - 10}}>

                        <TextField
                            label= 'Write a Problem'
                            value={problem}
                            onChangeText={ (problem) => this.setState({ problem }) }
                            tintColor = {'#0592CC'}
                            multiline = {true}
                        />
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                        }>

                        <Text style={{marginLeft : 10,marginTop:10,fontSize : 20,color :'#000000', height:'auto',fontFamily:'Poppins-Medium',width :window.width - 80}}>

                            Select  Address
                        </Text>
                        </TouchableOpacity>


                        <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10,flexDirection:'row'}}>

                            <View style = {{width:window.width - 100}}>


                                <Text style={{marginLeft : 5,fontSize : 18,color :'black',fontFamily:'Poppins-Medium',width :'80%',marginTop:8}}>

                                    Address:   {this.state.address.address}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                                    Area:   {this.state.address.area}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                                    State:   {this.state.address.city_state}
                                </Text>
                            </View>





                        </View>

                        <Button
                            style={{padding:7,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.pay()}>
                            PROCEED TO PAYMENT
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
    input: {
        height : 45,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:'Poppins-Medium',
        fontSize:18,
        marginTop:20,


        width:'100%'
    },
})