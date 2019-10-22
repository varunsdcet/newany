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

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var arrayholder=[];

export default class BookingAppointment extends Component {
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
        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
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
                    "doctor_condition":GLOBAL.doctor_condition,
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

//                    alert(JSON.stringify(responseJson))


                    if (responseJson.status == true) {
                        this.setState({results:responseJson.doctor_list_s})
                        arrayholder = responseJson.doctor_list_s
                  }else{
                        this.setState({results:[]})
                        arrayholder=[]
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
            title: 'ONLINE APPOINTMENT',
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
    _handleStateChange = (state) => {


if (GLOBAL.appply == 1){
    this.getApicall('')
}else {
    this.setState({department:[]})
    this.setState({speciality:[]})
    this.setState({hospital:[]})
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
            "doctor_condition":GLOBAL.doctor_condition,
            "type":"",
            "departments_filter":"",
            "hospital_filter":"",
            "price_range_min":"",
            "price_range_max":"",
            "is_favrouite":"",
            "specialty":"",




        }),
    }).then((response) => response.json())
        .then((responseJson) => {




            if (responseJson.status == true) {
                this.setState({results:responseJson.doctor_list_s})
                arrayholder = responseJson.doctor_list_s
            }else{
                this.setState({results:[]})
                arrayholder =[]
            }
        })
        .catch((error) => {
            console.error(error);
            this.hideLoading()
        });

}



    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }


    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('OnlineBooking')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,speciality) => {
        GLOBAL.speciality = speciality
        GLOBAL.appointmentArray = item
            this.props.navigation.navigate('DoctorDetail')

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
        {item.can_book_doctor_free  != 0 &&(
            <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                Prime
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




{/*                               <View style = {{flexDirection:'row'}}>
                                   <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                          source={require('./location.png')}/>

                                   <Text style={{marginLeft : 5,width:window.width - 150,height:30,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                       Branch: {item.lat_long_address}
                                   </Text>

                               </View>
*/}
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

                               {item.can_book_doctor_free  == 0 &&(
                                   <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                       Consult online for ₹ {item.online_consult_chat_price} onwards
                                   </Text>
                               )
                               }

                               {item.can_book_doctor_free  != 0 &&(
                                   <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                       Consult online for ₹ 0 onwards
                                   </Text>
                               )
                               }


    </View>

</View>






                    <Button
                        style={{padding:4,marginTop:14,fontSize: 15, color: 'white',backgroundColor:'#0592CC',marginLeft:'55%',width:'20%',height:34,fontFamily:'Poppins-Medium',borderRadius:12,marginBottom: 20}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login(speciality,item)}>
                        Consult
                    </Button>

                </View>





            </TouchableOpacity>
        )
    }


     SearchFilterFunction(text){
  const newData = arrayholder.filter(function(item){
         const itemData = item.name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         results: newData,
         text: text


     })

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

                    <View style = {{margin :10,width:window.width - 20 ,height:45,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100, height:45}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.SearchFilterFunction(text)}
                                   placeholder={"Search"}/>



{/*                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>
*/}

                    </View>

                    <View style = {{flexDirection:'row',marginTop: 6,marginLeft:12,width:'100%'}}>
                        <View style = {{flexDirection:'row',width:'70%'}}>

                        <Text style = {{color:'#8F8F8F',fontFamily:'Poppins-Medium',fontSize:18}}>
                            Sort by:
                        </Text>

                        <Text style = {{color:'#223B75',fontFamily:'Poppins-Medium',fontSize:16,marginTop:2}}>
                            {this.state.text}
                        </Text>
                            <TouchableOpacity onPress={()=>this.setModalVisible(true)}>

                        <Image style = {{width :14 ,height: 14,alignSelf:'center',resizeMode: 'contain',marginLeft:10, marginTop:6}}
                               source={require('./drop.png')}/>
                            </TouchableOpacity>
                    </View>

                        <TouchableOpacity style = {{width:'35%'}}
                                              onPress={()=>this.props.navigation.navigate('Filter')}>

                    <View style = {{flexDirection:'row',width:'30%'}}>
                        <Image style = {{width :30 ,height: 28,alignSelf:'center',resizeMode: 'contain',marginLeft:10}}
                               source={require('./filter.png')}/>


                    <Text style = {{color:'#223B75',fontFamily:'Poppins-Medium',fontSize:16,marginTop:2}}>
                        Filter
                    </Text>

                </View>
                        </TouchableOpacity>

                    </View>

                    <FlatList style= {{flexGrow:0,margin:1}}
                              data={this.state.department}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderDepartment}
                    />

                    <FlatList style= {{flexGrow:0,margin:1}}
                              data={this.state.speciality}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderDepartments}
                    />
                    <FlatList style= {{flexGrow:0,margin:1}}
                              data={this.state.hospital}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderDepartmentss}
                    />




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
                                    <Text style={{fontSize: 30, color:'black', fontFamily: 'Poppins-Regular', borderBottomWidth: 1, borderBottomColor: '#bfbfbf'}}>Sort By</Text>

                                    <View style={{marginTop: 10, flexDirection: 'column'}}>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'a to z')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>A to Z-</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'z to a')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Z to A-</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'high to low')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Price (High to Low)</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'low to high')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Price (Low to High)</Text>
                                            <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible,'most liked')}>
                                            <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular'}}>Most Liked</Text>
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
