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

export default class NurseBooking extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        atleastSelected:0,
        selected:false,
        data:[],
        images :[

        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE BOOKING',
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



    componentDidMount(){

        const url = GLOBAL.BASE_URL +  'get_services'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"nurse"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//                alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {


                    var array = [];
                    for (var i = 0; i < responseJson.services.length; i++) {
                        var dict = {
                            title: responseJson.services[i].title,
                            id: responseJson.services[i].id,
                            price: responseJson.services[i].price,
                            selected: '',


                        }
                        array.push(dict)

                    }
                    this.setState({images :array})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

 
    }


    login = () => {
        if(this.state.atleastSelected == 1){
        GLOBAL.nurseArray = this.state.images
        GLOBAL.type = "2"
        this.props.navigation.navigate('NurseTime')

        }
        else{
            alert('Please select nurse service')
        }
    }



    selectedFirst = (indexs) => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[indexs]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[indexs] = index
        this.setState({images:this.state.images})
        this.setState({atleastSelected:1})
    }



    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-between'}}>

            <View>

                        <View style = {{flexDirection:'row'}}>



                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#1F1F1F', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        {item.title}
                    </Text>


                            {item.selected != '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop:20}}
                                       source={require('./check.png')}/>
                            )}
                            {item.selected == '' &&(

                                <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:34,marginTop: 20}}
                                       source={require('./uncheck.png')}/>
                            )}

                        </View>
                    <Text style={{marginTop:-8,fontSize : 16,color :'#0592CC', height:'auto',fontFamily:'Poppins-Light',marginBottom:8}}>

                        {item.price}
                    </Text>
            </View>


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



                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 150}}
                              data={this.state.images}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Button
                        style={{padding:7,marginTop:10,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4, marginBottom:10}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        BOOK
                    </Button>

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