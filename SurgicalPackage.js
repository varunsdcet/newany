import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Linking,
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

export default class SurgicalPackage extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        images :[
            {
                title :'BRACHIAL PLEXUS PALSY',
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),
                price :' INR 100 ',

            },
            {
                title :'BREAST CANCER',
                image :require('./female.png'),
                selected:'',
                images :require('./females.png'),
                price :' INR 100 ',

            },
        ]

    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SURGICAL PACKAGES',
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

        const url =  GLOBAL.BASE_URL  + 'surgery_module_list'

        fetch(url, {
            method: 'GET',



        }).then((response) => response.json())
            .then((responseJson) => {

//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.depart})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


        //   this._handlePressLogin()
    }

    login = (item) => {

        this.props.navigation.navigate('Quation')
    }

    logind = (item) => {
        var url = 'http://139.59.76.223/anytimedoc/uploads/surgery/' + item.pdf
        Linking.openURL(url)
        //this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {
      //  this.props.navigation.navigate('MedicalServiceBooking')
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-around',marginTop: 10,marginBottom:10,borderRadius:4}}>







                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#1F1F1F', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        {item.name}
                    </Text>

                    <View style = {{flexDirection:'row',marginBottom:10}}>

                        <Button
                            style={{padding:6,marginTop:'1%',fontSize: 15, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:window.width/2 - 50,height:35,fontFamily:'Poppins-Regular',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login(item)}>
                            For quotation
                        </Button>

                        <Button
                            style={{padding:6,marginTop:'1%',fontSize: 15, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:window.width/2 - 50,height:35,fontFamily:'Poppins-Regular',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.logind(item)}>
                            Get quotation
                        </Button>
                    </View>





                </View>





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

                <View style={styles.container}>



                    <FlatList style= {{flexGrow:0,margin:8}}
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
})