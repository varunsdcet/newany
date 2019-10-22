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
var currentDate= moment()
//alert(currentDate)
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class NurseTime extends Component {
    constructor () {
        super()
        this.state = {
        name: '',
        email: '',
        phone: '',
        company: '',
        loading: false,
        visible: false,
            address :[],

        selected: false,
        data: [],
        images: [
            {
                days :'1',
                selected:'',
            },
            {
                days :'2',
                selected:'',
            },
            {
                days :'3',
                selected:'',
            },
            {
                days :'4',
                selected:'',
            },
            {
                days :'5',
                selected:'',
            },
            {
                days :'6',
                selected:'',
            },
            {
                days :'7',
                selected:'',
            },
        ]
    }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE SERVICE',
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


    _handleStateChange = ()=>{
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

    }


    login = () => {

        if(GLOBAL.date==''){
            alert('Please select date.')
            return
        }
        if(GLOBAL.time ==''){
            alert('Please select time.')
            return
        }
        if(GLOBAL.selectedAddress.length==0){
            alert('Please select atleast one address')
            return
        }

        var price = 0;
        for (var i = 0; i<GLOBAL.nurseArray.length ; i ++ ){
            if (GLOBAL.nurseArray[i].selected == 'Y') {
                price = price + parseInt(GLOBAL.nurseArray[i].price)
                GLOBAL.serviceid = GLOBAL.nurseArray[i].id
            }

        }
        var s = price * parseInt(GLOBAL.time)
        GLOBAL.price = s.toString()
        this.props.navigation.navigate('Payment')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    selectDate=(date)=>{
//        alert(date)
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s
  //          this.calculateDay(s)
        this.setState({selectedDate: date})

    }
    selectedFirst = (indexs,item) => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[indexs]
        if (index.selected == ""){
            index.selected = "Y"
            GLOBAL.time = item.days
        }else{
            index.selected = ""
        }
        this.state.images[indexs] = index
        this.setState({images:this.state.images})
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


            <TouchableOpacity onPress={() => this.selectedFirst(index,item)
            }>

                {item.selected == '' && (
                <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                }}>

                    <Text style={{color:'#707070',fontSize:13}}>
                        DAY
                    </Text>

                    <Text style={{color:'#707070',fontSize:16}}>
                        {item.days}
                    </Text>


                </View>

                )}

                {item.selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>

                        <Text style={{color:'white',fontSize:13}}>
                            DAY
                        </Text>

                        <Text style={{color:'white',fontSize:16}}>
                            {item.days}
                        </Text>


                    </View>

                )}
            </TouchableOpacity>




        )
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
                        onDateSelected={(date)=> this.selectDate(date)}
                    />

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Number of Days
                    </Text>


                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.images}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />



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