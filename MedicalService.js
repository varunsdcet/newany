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
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MedicalService extends Component {
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
                title :'Physiotherapy',
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),
                price :' INR 100 ',

            },
            {
                title :'Radiation Therapy',
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
            title: 'SERVICES',
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


    componentDidMount(){
        const url = GLOBAL.BASE_URL +  'get_services'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"services"




            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {
                    this.setState({images:responseJson.services})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }


    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (item) => {
     GLOBAL.serviceid = item.id

        GLOBAL.price = item.price
        GLOBAL.type = '3'
       this.props.navigation.navigate('MedicalServiceBooking')
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

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    marginTop: 10,marginBottom:10}}>






                            <View style = {{flexDirection:'row'}}>
                            <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#1F1F1F', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                                {item.title}
                            </Text>



                                <Image style = {{width :22 ,height :22,alignSelf:'flex-end',marginRight:34,marginBottom:2}}
                                       source={require('./service-doorstep_03.png')}/>

                            </View>




                <Text style={{marginLeft : 5,marginTop:0,fontSize : 16,color :'grey', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                   Price : {item.price}
                </Text>

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
                              data={this.state.images}
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

        backgroundColor :'#f1f1f1',
        flex:1
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