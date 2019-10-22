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
var arrayholder=[];
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Labtest extends Component {
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
            results: [],
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

//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
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

    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        if (typeof get !== 'undefined') {
            this.getApicall(get)
        }

        this.setState({modalVisible: visible});
    }


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'LAB TEST',
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



    _handleStateChange = (state) => {


            const url =  GLOBAL.BASE_URL  + 'lab_test_list'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,





                }),
            }).then((response) => response.json())
                .then((responseJson) => {

               //     alert(JSON.stringify(responseJson))


                    if (responseJson.status == true) {
                        this.setState({results:responseJson.list})
                        arrayholder = responseJson.list

                    }else{
                        this.setState({results:[]})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });





    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);

        //   this._handlePressLogin()
    }


    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s
        GLOBAL.price = item.normal_appointment_price
        GLOBAL.type = "5"
        GLOBAL.onlinetype = "normal"

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (itemData) => {

         GLOBAL.labid = itemData.item.id

         GLOBAL.lab = itemData.item
         this.props.navigation.navigate('LabMember')

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

    _renderItems = (itemData) => {


        var item = itemData.item


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(itemData)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>


             <Text  style = {{fontFamily:"Poppins-Regular",color:'black',fontSize:14,marginLeft:4,marginTop:4}}>
                 {item.test_name}

             </Text>




                    <Text  style = {{fontFamily:"Poppins-Regular",color:'grey',fontSize:14,marginLeft:4,marginTop:1}}>
                        {item.description}

                    </Text>



                    <View style = {{marginLeft:5,flexDirection:'row',width:'100%'}}>
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'60%',}}>

                                ₹{item.sell_price} /-
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'60%',textDecorationLine: 'line-through',}}>

                                ₹{item.sell_price}/-
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',width :'50%'}}>

                                ₹{item.discount_price}/-
                            </Text>
                        )}
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:1,fontSize : 14,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',width :'50%'}}>


                            </Text>
                        )}
                    </View>



{/*                    <Text  style = {{fontFamily:"Poppins-SemiBold",color:'#0592CC',fontSize:16,textAlign:'right',width:window.width- 50}}>
                        ADD CART

                    </Text>
*/}
                </View>





            </TouchableOpacity>
        )
    }
    SearchFilterFunction(text){
        const newData = arrayholder.filter(function(item){
            const itemData = item.test_name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            results: newData,
            text: text


        })

    }
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
                    <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}
                                   placeholder={"Search"}/>

                    </View>



                        {/*                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>
*/}


                        <FlatList style= {{flexGrow:0,margin:8,height:window.height - 100}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
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