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

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class ListAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
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
    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Text style={{color :'#0592CC',fontFamily:'Poppins-Regular',fontSize: 16,marginRight:10}} >

                    ADD
                </Text>
            </TouchableOpacity>,
            //   header: () => null,
            title: 'LIST ADDRESS',
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


    _handleStateChange = (state) => {
        const url = GLOBAL.BASE_URL +  'list_user_address'

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
          //      alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.patient_saved_address})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }

    componentDidMount(){
        this.props.navigation.setParams({ handleSave: this._saveDetails });
        this.props.navigation.addListener('willFocus',this._handleStateChange);


        //   this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');



        this.props.navigation.navigate('AddAddress')
    }

    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = (item) => {


        this.setState({selected:true})
    }
    selectedFirst = (item) => {
    //    alert(JSON.stringify(item))
        const url = GLOBAL.BASE_URL +  'make_default_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "address_id":item.id





            }),
        }).then((response) => response.json())
            .then((responseJson) => {



                if (responseJson.status == true) {
                    GLOBAL.selectedAddress = item

                   alert('Successfully Address Became Default')
                    this.props.navigation.goBack()


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


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

    _saveDetails = ()=>{
        this.props.navigation.navigate('AddAddress')
    }
    _renderItems = ({item,index}) => {


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10,flexDirection:'row'}}>

                    <View style = {{width:window.width - 100}}>


                    <Text style={{marginLeft : 5,fontSize : 18,color :'black',fontFamily:'Poppins-Medium',width :'80%',marginTop:8}}>

                     Address:   {item.address}
                    </Text>

                    <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                     Area:   {item.area}
                    </Text>

                    <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                     State:   {item.city_state}
                    </Text>
                    </View>


                    {item.is_deafult == "0" && (
                        <TouchableOpacity onPress={() => this.selectedFirst(item)
                        }>

                    <Image style = {{width :30 ,height: 30,alignSelf:'center',marginTop:5,resizeMode: 'contain'}}
                           source={require('./uncheck.png')}/>
                        </TouchableOpacity>
                    )}


                    {item.is_deafult == "1" && (

                        <Image style = {{width :30 ,height: 30,alignSelf:'center',marginTop:5,resizeMode: 'contain'}}
                               source={require('./check.png')}/>
                    )}


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

                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 160}}
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
        backgroundColor :'#f1f1f1'

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
