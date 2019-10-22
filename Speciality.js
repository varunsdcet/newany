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

export default class Speciality extends Component {
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
            title: 'Speciality',
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


    componentDidMount(){


        const url = GLOBAL.BASE_URL +  'view_all_specialty'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "key":"all_specialty"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
              this.setState({data:responseJson.specialty})


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }

    login = () => {
        //this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {
        //  this.props.navigation.navigate('MedicalServiceBooking')
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

    speciality = ({item}) => {
//        alert(JSON.stringify(item))
        GLOBAL.searchSpeciality = item.title
        this.props.navigation.navigate('SearchSpeciality')
    }

    renderRowItem2 = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.speciality(itemData)
            }>

            <View   style  = {{width:window.width/2.2 - 8,margin:4, height:200,backgroundColor:'white',shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >




                <Image source={{uri :itemData.item.image}}
                       style  = {{width:window.width/2.2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                       }}

                />

                <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'##0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                    {itemData.item.title}

                </Text>

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