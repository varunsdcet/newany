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
    SafeAreaView,
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


export default class EquipmentCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            prices:'',
            text :'',
            department :[],
            speciality :[],
            hospital:[],
            price:[],
            myprice:'',
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

                alert(JSON.stringify(responseJson))


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
            alert(depart)

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
            title: 'CART',
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



    getCheck =()=>{
        const url =  GLOBAL.BASE_URL  + 'get_check_chat_flag'

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




                if (responseJson.status == true) {


                }else{

                }

                this.getCheck()
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    _handleStateChange = (state) => {


        const url =  GLOBAL.BASE_URL  + 'list_cart_medical'

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

                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})


                    // this.props.navigation.navigate("VideoCall", {
                    //     channelName: 'Picasoid',
                    //     onCancel: (message) => {
                    //         this.setState({
                    //             visible: true,
                    //             message
                    //         });
                    //

                    //
                    //     }
                    // });
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
    }


    login = () => {

        alert(JSON.stringify(this.state.results))

        for (var i = 0;i<this.state.results.count;i++){
            GLOBAL.equipmentfor = this.state.results[0].for

        }

        GLOBAL.price = this.state.prices
        GLOBAL.type = "13"

        this.props.navigation.navigate('EquipmentAddress')


    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item,index) => {
        alert(JSON.stringify(item))
        var a = this.state.results[index]
        if (a.in_cart == 0){
            a.in_cart = 1
        }else{
            a.in_cart = 0
        }
        this.state.results[index] = a
        this.setState({results:this.state.results})





        var indexs = 0;
        for (var i = 0; i<this.state.results.length; i++){
            if (this.state.results[i].in_cart == 1){
                indexs = indexs + 1;
            }else{

            }
        }
        alert(indexs)



        var a = "";

        if (GLOBAL.lab.discount_price  == "0.00"){
            a = GLOBAL.lab.sell_price
        }else{
            a = GLOBAL.lab.discount_price
        }

        var f = parseInt(a) * indexs
        alert(f)
        this.setState({myprice:f})

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

    logins =  (item) => {


        var s = parseInt(item.quantity) - 1
        if (item.quantity == "1"){


            const url =  GLOBAL.BASE_URL  + 'delete_cart_medical'



            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id":GLOBAL.user_id,
                    "cart_id":item.id,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    alert(JSON.stringify(responseJson))




                    if (responseJson.status == true) {
                        this.setState({results:responseJson.list})
                        this.setState({prices:responseJson.sum_total})
                    }else{
                        this.setState({results:[]})
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });
            //this.selectedFirstss(item)

        }else {
            const url = GLOBAL.BASE_URL + 'update_quantity'


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id": GLOBAL.user_id,
                    "cart_id": item.id,
                    "quantity": s,
                    "price": item.price

                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == true) {
                        this.setState({results: responseJson.list})
                        this.setState({prices: responseJson.sum_total})
                    } else {

                    }
                })
                .catch((error) => {
                    console.error(error);

                });
        }

    }
    loginss =  (item) => {
        var s = parseInt(item.quantity) + 1
        const url =  GLOBAL.BASE_URL  + 'update_quantity'



        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "cart_id":item.id,
                "quantity":s,
                "price":item.price

            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);

            });

    }

    selectedFirstss =  (item) => {
        alert(item.cart_id)

        const url =  GLOBAL.BASE_URL  + 'delete_cart_medical'



        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "cart_id":item.id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                    this.setState({prices:responseJson.sum_total})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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

var s = item.path + item.image

        return (
            <View style ={{borderBottomColor:'#e1e1e1',borderBottomWidth:1,marginBottom:10}}>

            <View style={{ flex: 1 ,flexDirection:'row',marginLeft : 5,width:window.width - 10,marginTop: 10,marginBottom:10,borderRadius:10 }}>

                <View>
                <Image source={{uri :s}}
                       style  = {{width:150, height:150,marginTop: 3,marginLeft:5,
                       }}

                />
                </View>
                <View>

                <Text  style = {{color:'black',fontSize:14,marginLeft:4,marginTop:4,fontFamily:'Poppins-Regular'}}>
                    {item.name}

                </Text>


                    <Text  style = {{color:'grey',fontSize:14,marginLeft:4,marginTop:4,fontFamily:'Poppins-Regular'}}>
                        ₹ {item.price}

                    </Text>


                    <View style = {{flexDirection:'row',width:100,borderWidth:1,borderColor:'grey',height:20,marginLeft:20,justifyContent:'space-around'}}>

                        <Button
                            style={{ color: 'black',backgroundColor:'white'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.logins(item)}>
                           -
                        </Button>
                        <Text  style = {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular'}}>
                             {item.quantity}

                        </Text>
                        <Button
                            style={{ color: 'black',backgroundColor:'white'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.loginss(item)}>
                            +
                        </Button>


                    </View>



                </View>


            </View>

            <View style = {{flexDirection:'row',width:'100%'}}>
                <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:'#000000',width:'88%'}}>Delivery & Setup in {GLOBAL.shipTime} hours</Text>

                <TouchableOpacity onPress={() => this.selectedFirstss(item)
                }>
                <Image source={require('./delete.png')}
                       style  = {{width:20, height:20,resizeMode:'contain',marginRight:20,
                       }}

                />
                </TouchableOpacity>
        </View>
        </View>

        )
    }
    render() {
        alert(JSON.stringify(GLOBAL.lab))


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


                    <View style={{ marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                        <FlatList style= {{flexGrow:0,margin:8,height:window.height - 100}}
                                  data={this.state.results}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                        />

                    </View>
                    <View style = {{position:'absolute',bottom:70,flexDirection:'row',width:'100%',backgroundColor:'white',height:50}}>

                        <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'60%',}}>

                            ₹{this.state.prices}/-
                        </Text>

                        <Button
                            style={{padding:4,fontSize: 14,marginTop:10, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:100,height:30,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            CHECKOUT
                        </Button>
                    </View>



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