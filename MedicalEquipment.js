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
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MedicalEquipment extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        path:'',

        selected:false,
        data:[],
    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'MEDICAL EQUIPMENT',
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
        const url = GLOBAL.BASE_URL +  'list_products'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "type":GLOBAL.rentPurchase




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                //    alert(JSON.stringify(responseJson))



                if (responseJson.status == true) {
                    this.setState({data:responseJson.list})
                    this.setState({path:responseJson.path})
                    GLOBAL.imagePath = responseJson.path

                    GLOBAL.shipTime = responseJson.time
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




    speciality = (item) => {

        GLOBAL.medicalEquipment = item
        this.props.navigation.navigate('MedicalDetail')
    }

    renderRowItem2 = (itemData) => {
        var imge = this.state.path + itemData.item.image
        var disc = parseInt(itemData.item.rent_price)
        var discp = parseInt(itemData.item.rent_discount)
        var discount = disc - discp

        var discs = parseInt(itemData.item.purchase_price)
        var discps = parseInt(itemData.item.purchase_discount)
        var discounts = discs - discps


        return (
            <TouchableOpacity onPress={() => this.speciality(itemData.item)
            }>

                <View   style  = {{width:window.width/2 - 8,margin:4,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={{uri :imge}}
                           style  = {{width:window.width/2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                           }}

                    />

                    <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center',width:window.width/2.2 - 8}}>
                        {itemData.item.name}

                    </Text>
                    {itemData.item.for == "Rental" && itemData.item.rent_discount == "0.00" && (
                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#e1e1e1',textAlign:'center',width:window.width/2.2 - 8}}>
                       Started from {itemData.item.rent_price}

                        </Text>

                    ) }


                    {itemData.item.for == "Rental" && itemData.item.rent_discount != "0.00" && (
                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#e1e1e1',textAlign:'center',width:window.width/2.2 - 8}}>
                            Started from {itemData.item.rent_discount}

                        </Text>

                    ) }



                    {itemData.item.for == "Purchase" && itemData.item.purchase_discount == "0.00" && (
                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#e1e1e1',textAlign:'center',width:window.width/2.2 - 8}}>
                            Started from {itemData.item.purchase_price}

                        </Text>

                    ) }


                    {itemData.item.for == "Purchase" && itemData.item.purchase_discount != "0.00" && (
                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#e1e1e1',textAlign:'center',width:window.width/2.2 - 8}}>
                            Started from {itemData.item.purchase_discount}

                        </Text>

                    ) }


                </View>
            </TouchableOpacity>
        )
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



                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.data}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this.renderRowItem2}
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
})