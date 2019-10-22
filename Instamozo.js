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
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Voice from 'react-native-voice';
import { TextField } from 'react-native-material-textfield';
const GLOBAL = require('./Global');
import axios from 'react-native-axios';
type Props = {};
import { WebView } from 'react-native-webview';
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Instamozo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
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
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart(e) {
        this.setState({
            started: '√',
        });

    };
    onSpeechEnd (e){
        alert('stop')
    }
    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });


    };
    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
        alert(JSON.stringify(this.state.results))

    }
    async _startRecognition(e) {



        this.setState({
            recognized: '',
            started: '',
            results: [],
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PAYMENT',
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
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

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
        //   this._handlePressLogin()


        const data = new FormData();

        data.append('purpose', 'Doctor');
        data.append('amount', 10);
        data.append('buyer_name', GLOBAL.myname);
        data.append('redirect_url', 'http://example.com');
        data.append('email', GLOBAL.myemail);
        data.append('mobile', GLOBAL.mymobile);
        data.append('send_email', true);
        data.append('webhook', 'http://www.example.com/webhook/');
        data.append('allow_repeated_payments', false);
        var url = 'https://www.instamojo.com/api/1.1/payment-requests/'

        fetch(url, {
            method: 'POST',
            headers: {
                'X-Api-Key': '7f3587dab60d7a5cc563965410250bb7',
                'X-Auth-Token': '7ae6bfc8797a7f0faec11e367c79eb94',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })

            .then((response) => response.json())
            .then((responseData) => {
                this.setState({started:responseData.payment_request.longurl})
                alert(JSON.stringify(responseData.payment_request.longurl))

            })
            .catch((error) =>{
                console.error(error);
            })
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    login = () => {
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {

        this.props.navigation.navigate('HospitalDetail')

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


    onNavigationChange(webViewState) {
        let hitUrl = webViewState.url;
        console.log(hitUrl);
        if (hitUrl.includes('http://example.com/')) {
            console.log(hitUrl);
            // we need the payment_req_id to get the status of paymnt
            let payment_final_id = hitUrl.split("request_id=").pop();
            var response = {
                url: hitUrl,
                payment_final_id: payment_final_id
            }


            this.getPaymentDetails(payment_final_id);
        }
    }
    getPaymentDetails(trans_id) {


        //insted of this you can do whatever you wan with therequests response , loading a custom success page with details etc
        const self = this;
        axios.get(`https://www.instamojo.com/api/1.1/payment-requests/${trans_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': '7f3587dab60d7a5cc563965410250bb7',
                'X-Auth-Token': '7ae6bfc8797a7f0faec11e367c79eb94',
            }
        }).then(function (response) {
            console.log(response);
            Alert.alert('Response of txn', JSON.stringify(response.data));

        })
            .catch(function (error) {
                console.log(JSON.stringify(error));


            })
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                    <View style = {{flexDirection:'row',width :'100%'}}>
                        <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                               source={require('./splash.png')}/>

                        <View style = {{width :window.width -120}}>


                            <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :window.width -120,marginTop:8}}>

                                Appolo
                            </Text>








                            <View style = {{flexDirection:'row'}}>
                                <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                       source={require('./location.png')}/>

                                <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                    Hyderabad
                                </Text>

                            </View>


                        </View>

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



            <WebView
                ref="webview"
                source={{ uri: this.state.started }}
                onNavigationStateChange={this.onNavigationChange.bind(this)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                // renderLoading={this.renderLoading.bind(this)}
                onMessage={(event) => console.log(event.nativeEvent.data)} />











            
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
