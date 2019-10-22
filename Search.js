import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import store from 'react-native-simple-store';

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
var dict = {};
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            department :[],
            speciality :[],
            hospital:[],
            price:[],
            type :'',
            results: [],


        };

    }

    componentWillUnmount() {

    }

    fetchSpeciality = (res,type,depart) => {
        var myArray = [];
        var speciality = '';
        if (res == null || res.length == 0) {
            this.fetchHospital(res,type,depart,'')
        } else {
            var array = res[0].array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    speciality = speciality + array[i].id + ','
                    myArray.push(array[i])

                }
            }
            speciality = speciality.slice(0, -1);

            store.get('hospital')
                .then((res) =>
                    //  alert(JSON.stringify(res))
                    this.fetchHospital(res,type,depart,speciality)
                )

        }
        this.setState({speciality:myArray})

    }
    fetchHospital = (res,type,depart,speciality) =>{
        var myArray = [];
        var hospital = '';
        if (res == null || res.length == 0) {
            this.setState({hospital:[]})

        } else {
            var array = res[0].array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    hospital = hospital + array[i].id + ','
                    myArray.push(array[i])
                }
            }
            this.setState({hospital: myArray})
            hospital = hospital.slice(0, -1);
        }

        const url =  GLOBAL.BASE_URL  + 'fetch_nearest_doctor'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "lat":GLOBAL.lat,
                "long":GLOBAL.long,
                "doctor_condition":'offline',
                "type":type,
                "departments_filter":depart,
                "hospital_filter":hospital,
                "price_range_min":"",
                "price_range_max":"",
                "is_favrouite":"",
                "specialty":speciality,




            }),
        }).then((response) => response.json())
            .then((responseJson) => {

              //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.doctor_list_s})
//                    alert(JSON.stringify(responseJson.doctor_list_s))


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }

    fetchDepartment = (res,type) => {
        var myarray = [];
        var depart = '';
        if (res == null || res.length == 0) {
            this.fetchSpeciality(res,type,'')
        } else {
            var array = res[0].array
            for (var i = 0; i < array.length; i++) {
                if (array[i].selected == "Y") {
                    depart = depart + array[i].id + ','
                    myarray.push(array[i])

                }
            }
            depart = depart.slice(0, -1);
//            alert(depart)

            store.get('speciality')
                .then((res) =>
                    //  alert(JSON.stringify(res))
                    this.fetchSpeciality(res,type,depart)
                )
        }
        this.setState({department:myarray})


    }

    getApicall(type)
    {

        store.get('departments')
            .then((res) =>
                //  alert(JSON.stringify(res))
                this.fetchDepartment(res,type)
            )



    }

    top=(get)=>{
        GLOBAL.appointmentArray = dict

        if (get == "Online") {
            GLOBAL.type = "4"
            GLOBAL.price = dict.online_consult_video_price
            GLOBAL.type = "4"

            this.props.navigation.navigate('OnlineBooking')

        }
        else {

            GLOBAL.price = dict.normal_appointment_price
            GLOBAL.type = "5"
            GLOBAL.onlinetype = "normal"


                this.props.navigation.navigate('BookingAppointmentDetail')



        }

    }

    setModalVisible=(visible,get)=> {


        this.setState({modalVisible : visible})

        this.timeoutCheck = setTimeout(() => {

            this.top(get)
        }, 400);



    }


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SEARCH',
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






    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }


    login = (s,item) => {

        dict = item

        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s
        if (item.online_consult == "3" && item.normal_appointment == "1" ){
            this.setState({modalVisible:true})

        } else if (item.online_consult == "3") {
            GLOBAL.type = "4"
            GLOBAL.price = item.online_consult_video_price
            GLOBAL.type = "4"
            this.props.navigation.navigate('OnlineBooking')
        }
        else if (item.normal_appointment == "1") {

            GLOBAL.price = item.normal_appointment_price
            GLOBAL.type = "5"
            GLOBAL.onlinetype = "normal"
            this.props.navigation.navigate('BookingAppointmentDetail')
        }



       //
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = (item) => {


        this.setState({selected:true})
    }
    selectedFirst = (item,speciality) => {
      //  alert(JSON.stringify(item))
        if (this.state.type == "doctor_result") {
            GLOBAL.speciality = speciality
            GLOBAL.appointmentArray = item
            this.props.navigation.navigate('DoctorDetail')
        } else {
            GLOBAL.searchSpeciality = item.specialty_name
            this.props.navigation.navigate('SearchSpeciality')
        }

    }
    selectedFirstsd = (item,speciality) => {


            GLOBAL.searchSpeciality = item.specialty_name
            this.props.navigation.navigate('SearchSpeciality')


    }
    selectedFirsts = () => {

        if (this.state.type == "doctor_result") {
            GLOBAL.speciality = speciality
            GLOBAL.appointmentArray = item
            this.props.navigation.navigate('DoctorDetail')
        } else {
            GLOBAL.searchSpeciality = item.specialty_name
            this.props.navigation.navigate('SearchSpeciality')
        }

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderDepartmentss =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:'Poppins-Regular',margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartments =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:'Poppins-Regular',margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }
    _renderDepartment =  ({item,index}) => {
        return (
            <View style = {{backgroundColor:'white',borderRadius:12 ,margin :2}}>

                <Text style = {{color:'black',fontFamily:'Poppins-Regular',margin:4,fontSize:10}}>
                    {item.name}

                </Text>


            </View>




        )


    }

     _renderItems = ({item,index}) => {


        var speciality = item.speciality_detail_array


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item,speciality)
            }>
                {this.state.type == "doctor_result" && (
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                    <View style = {{flexDirection:'row',width :'100%'}}>

                        <View>
                            <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                                   source={{ uri: item.image }}/>
                            {item.doctor_avail_status == 1 && (

                                <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                    Available Today
                                </Text>
                            )}
                            {item.doctor_avail_status != 1 && (

                                <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                    Offline
                                </Text>
                            )}


                        </View>

                        <View>

                            <View style = {{flexDirection:'row',width:'100%'}}>
                                <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'70%',marginTop:18}}>

                                    {item.name}
                                </Text>

                                <View style = {{backgroundColor:'#F1AE42',borderRadius:4,width:45,height:25,marginTop:18,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
                                    <Image style = {{width :15 ,height :15,marginLeft:4,resizeMode:'contain'}}
                                           source={require('./star.png')}/>

                                    <Text style={{marginLeft : 5,fontSize : 12,marginTop:3,color :'white',fontFamily:'Poppins-Medium',}}>

                                        {item.ratting}
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

                                    Branch: {item.lat_long_address}
                                </Text>

                            </View>

                            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                <View>
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                        Experience
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                        {item.experience} Years
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                        Likes
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                        {item.like}
                                    </Text>
                                </View>

                                <View style = {{marginRight:50}}>
                                    <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                        Reviews
                                    </Text>
                                    <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                        {item.total_review}
                                    </Text>
                                </View>

                            </View>

                            <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                Consult ₹ {item.normal_appointment_price} onwards
                            </Text>
                        </View>

                    </View>






                    <Button
                        style={{padding:4,marginTop:14,fontSize: 15, color: 'white',backgroundColor:'#0592CC',marginLeft:'55%',width:'20%',height:34,fontFamily:'Poppins-Medium',borderRadius:12,marginBottom: 20}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login(speciality,item)}>
                        BOOK
                    </Button>






                </View>
                )}
                {this.state.type == "speciality" && (
                    <TouchableOpacity onPress={() => this.selectedFirstsd(item,speciality)
                    }>
                    <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>

                    <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'70%'}}>

                            {item.specialty_name}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )}




            </TouchableOpacity>
        )
    }

    SearchFilterFunction(text){


        const url =  GLOBAL.BASE_URL  + 'serach_doctor'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "patient_id":GLOBAL.user_id,
                "lat":GLOBAL.lat,
                "long":GLOBAL.long,
                "search_keyword":text,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.result == true) {
                    this.setState({type:responseJson.type})
                    this.setState({results:responseJson.doctor_list_s})



                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


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

                    <View style = {{margin :10,width:window.width - 20 ,height:35,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}
                                   value={this.state.height}

                                    placeholder={"Search Doctor By Name/Speciality"}/>





                    </View>






                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 160}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />






                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            alignItems: 'center'}}>
                            <View style={{
                                width: 300,backgroundColor: 'white',
                                height: 300}}>
                                <View style={{width: '95%', margin: 10}}>
                                    <Text style={{fontSize: 30, color:'black', fontFamily: 'Poppins-Regular', borderBottomWidth: 1, borderBottomColor: '#bfbfbf'}}>BOOK APPOINTMENT</Text>

                                    <View style={{marginTop: 10, flexDirection: 'column'}}>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(false,'Online')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Online Consultation</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(false,'Offline')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Offline Consultation</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>


                                    </View>

                                </View>


                            </View>

                        </View>
                    </Modal>




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
