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
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];
var arrayholder=[]
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Insurance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            images: [
            ]

        };

    }






    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'INSURANCE',
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
        this.showLoading()

        const url = GLOBAL.BASE_URL +  'insurance_for_hospital'

        fetch(url, {
            method: 'GET',



        }).then((response) => response.json())
            .then((responseJson) => {

                this.hideLoading()

                if (responseJson.status == true) {
                    this.setState({results:responseJson.insurence})
                    arrayholder=responseJson.insurence
                }else{
                    this.setState({results:[]})
                    arrayholder=[]

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }


    selectedFirst = (item) => {
        GLOBAL.hid = item.id
        this.props.navigation.navigate('HospitalList')
    }



    _renderItems = ({item,index}) => {

        return (
            <TouchableOpacity onPress = {()=>this.selectedFirst(item)} >


                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>


                            <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :window.width -120,marginTop:8,marginBottom:8}}>

                                {item.insurance_name}
                            </Text>



                </View>
            </TouchableOpacity>


        )
    }

             SearchFilterFunction(text){
  const newData = arrayholder.filter(function(item){
         const itemData = item.insurance_name.toUpperCase()
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




                    </View>





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
