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

    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class OnlineBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            member:[
                {
                    "id": "0",
                    "user_id": "2",
                    "member_name": "Self",
                    "member_dob": "Ert",
                    "gender": "male",
                    "added_on": "2019-09-21 14:02:01",
                    "member_mobile": "Fgg",
                    "email": "Ggg",
                    "relation": "Fg"
                },



            ],
            images: [
                {
                    name :'Myself',
                    selected:'',
                    myself:'Y',
                },
                {
                    name :'Someone else',
                    selected:'',
                    myself:'N',

                },

            ]

        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }



    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING ',
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


    showLoading() {
        this.setState({loading: true})
    }
    _handleStateChange = (state) => {
        if (GLOBAL.mymember.length == 0){
            var a = [
                {
                    "id": "0",
                    "user_id": "2",
                    "member_name": "Self",
                    "member_dob": "Ert",
                    "gender": "male",
                    "added_on": "2019-09-21 14:02:01",
                    "member_mobile": "Fgg",
                    "email": "Ggg",
                    "relation": "Fg"
                },
                {
                    "id": "0",
                    "user_id": "2",
                    "member_name": "Add Another",
                    "member_dob": "Ert",
                    "gender": "male",
                    "added_on": "2019-09-21 14:02:01",
                    "member_mobile": "Fgg",
                    "email": "Ggg",
                    "relation": "Fg"
                }


            ]
            this.setState({member:a})
        }else{



            const interest = this.state.member.concat(GLOBAL.mymember)
//            alert(JSON.stringify(interest))

            var a = [

                {
                    "id": "12230",
                    "user_id": "2",
                    "member_name": "Add Another",
                    "member_dob": "Ert",
                    "gender": "male",
                    "added_on": "2019-09-21 14:02:01",
                    "member_mobile": "Fgg",
                    "email": "Ggg",
                    "relation": "Fg"
                }


            ]

            const interests = [...interest, ...a];
            //
            // var b = interest.concat(a)
            //
            this.setState({member:interests})

        }
    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        //   this._handlePressLogin()
    }
    _handlePress() {




        this.props.navigation.navigate('BookingDetailFinal')
    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {

        this.props.navigation.navigate('ListMember')

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

                {index == 0 && (

                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./myself.png')}/>




                )}
                {index != 0 && (

                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./add.png')}/>


                )}


                <Text style={{fontSize : 14,color :'#0592CC',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                    {item.member_name}
                </Text>


            </TouchableOpacity>
        )
    }

    Calcprice = (dd,get)=>{
        GLOBAL.type = "4"
        GLOBAL.price = dd
        if (get == 1){
            GLOBAL.onlinetype = "chat"
//BookingDetailFinal

       if ( GLOBAL.appointmentArray.can_book_doctor_free  != 0)   {
           this.props.navigation.navigate('BookingDetailFinal')

       }else{
           this.props.navigation.navigate('BookingAppointmentDetail')
       }

        //     GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
        //         this.props.navigation.navigate('BookingAppointmentDetail')
        //     )}
        //
        // GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
        //
        // )}



        }else {
            GLOBAL.onlinetype = "video"
            this.props.navigation.navigate('OnlineVideo')
        }

    }
    render() {
//        alert(JSON.stringify(GLOBAL.appointmentArray))

      //  var speciality =  GLOBAL.speciality
        var speciality = GLOBAL.appointmentArray.speciality_detail_array

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
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

                                    {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
                                        <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                            Consult online for ₹ 0 onwards
                                        </Text>
                                    )}
                                    {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
                                        <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                            Consult online for ₹ {GLOBAL.appointmentArray.online_consult_chat_price} onwards
                                        </Text>
                                    )}


                                </View>

                            </View>








                        </View>







                    </KeyboardAwareScrollView>

                    <View style={{ flexDirection:'column',backgroundColor:'#F5F5F5'}}>

                        <TouchableOpacity onPress = {()=>this.Calcprice(GLOBAL.appointmentArray.online_consult_chat_price,1)}>
                            <View style={{height:120,width:window.width,marginTop:10,backgroundColor:'white'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        style={{height:20,width:20,marginTop:22,marginLeft:20}}
                                        source={require('./chatlogo.png')}
                                    />

                                    <View style={{flexDirection:'column',marginTop:18,marginLeft:12}}>
                                        <Text style={{fontSize:13,fontFamily:'Poppins-Medium',fontWeight:'bold',marginTop:7}}>Chat Us</Text>
                                        <Text style={{fontSize:11,fontFamily:'Poppins-Regular',marginTop:9}}>Schedule for your preferred date/time</Text>

                                        {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
                                            <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                                <Text style={{fontSize:11,fontFamily:'Poppins-Medium',marginTop:4}}>15 minutes call duration ₹ 0 Consultation Fee</Text>
                                            </Text>
                                        )}

                                        {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
                                            <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                                <Text style={{fontSize:11,fontFamily:'Poppins-Medium',marginTop:4}}>15 minutes call duration ₹{GLOBAL.appointmentArray.online_consult_chat_price} Consultation Fee</Text>
                                            </Text>
                                        )}




                                    </View>
                                    <Image
                                        style={{height:20,width:20,marginTop:50,marginLeft:25}}
                                        source={require('./arrowlogo.png')}/>



                                </View>


                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=>this.Calcprice(GLOBAL.appointmentArray.online_consult_video_price,2)}>
                            <View style={{height:115,width:400,marginTop:1,backgroundColor:'white'}}>

                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        style={{height:20,width:20,marginTop:22,marginLeft:20}}
                                        source={require('./videologo.png')}
                                    />

                                    <View style={{flexDirection:'column',marginTop:18,marginLeft:12}}>
                                        <Text style={{fontSize:13,fontFamily:'Poppins-Medium',fontWeight:'bold',marginTop:7}}>Video Consult</Text>
                                        <Text style={{fontSize:11,fontFamily:'Poppins-Regular',marginTop:9}}>Schedule for your preferred date/time</Text>

                                        {GLOBAL.appointmentArray.can_book_doctor_free  == 0 &&(
                                            <Text style={{fontSize:11,fontFamily:'Poppins-Medium',marginTop:4}}>15 minutes call duration ₹{GLOBAL.appointmentArray.online_consult_video_price} Consultation Fee</Text>
                                        )}
                                        {GLOBAL.appointmentArray.can_book_doctor_free  != 0 &&(
                                            <Text style={{fontSize:11,fontFamily:'Poppins-Medium',marginTop:4}}>15 minutes call duration ₹ 0 Consultation Fee</Text>
                                        )}



                                    </View>

                                    <Image
                                        style={{height:20,width:20,marginTop:50,marginLeft:25}}
                                        source={require('./arrowlogo.png')}/>


                                </View>



                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

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
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
