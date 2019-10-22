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
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Voice from 'react-native-voice';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};
const options = {
    title: 'Select Avatar',
    maxWidth:300,
    maxHeight:500,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Pharmacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name :'',
            myimages:[],
            value:'',
            dob:'',
            address:[],
            area :'',
            city:'',
            path :'',
            avatarSource:'',
            member:[




            ],
            images: [
                {
                    name :'Myself',
                    selected:'',
                    myself:'Y',
                },
                {
                    name :'Someone else',
                    selected:'',
                    myself:'N',

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
            title: 'PHARMACY',
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
    _handleStateChange = (state) => {



        this.setState({address :GLOBAL.selectedAddress})



        //   const interests = [...interest, ...a];
        //
        // var b = interest.concat(a)
        //



    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        const url = GLOBAL.BASE_URL + 'list_upload_images_pharmacy'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({


                "user_id": GLOBAL.user_id,



            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                //  this.rajorPay()
                if (responseJson.status == true) {

                    this.setState({myimages:responseJson.list})
                  //  alert(JSON.stringify(responseJson.list))
                    this.setState({path:responseJson.path})

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

        //   this._handlePressLogin()
    }
    _handlePress() {



        var imgid = ""

        for (var i = 0; i< this.state.myimages.length ; i ++){
            imgid = imgid + this.state.myimages[i].image + '|'
        }
        if (imgid == ""){

        } else{
            imgid = imgid.slice(0,-1)

        }

 this.setState({loading:true})
        const url = GLOBAL.BASE_URL + 'add_pharmacy_query'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({


                "user_id": GLOBAL.user_id,
                "name": GLOBAL.myname,
                "email":GLOBAL.myemail,
                "mobile":GLOBAL.mymobile,
                "address":this.state.address.address,
                "area":this.state.address.area,
                "pincode":this.state.address.pincode,
                "city_state":this.state.address.city_state,
                "images":imgid



            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({loading:false})


                //  this.rajorPay()
                if (responseJson.status == true) {

                  alert('Your Order Placed Successfully.')
                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({loading:false})
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
    selectedFirst = (indexs) => {

        if (GLOBAL.appointmentArray.can_book_doctor_free == 0){
        } else {


            this.props.navigation.navigate('ListMember')
        }

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
    _handlePressd = () => {
        if (this.state.myimages.length >= 3){
            alert('You have not upload any image')
            return
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };


                const url = GLOBAL.BASE_URL +  'image_attchment_upload_pharmacy'
                const data = new FormData();
                data.append('user_id', GLOBAL.user_id);
                data.append('flag',1);


                // you can append anyone.
                data.append('image', {
                    uri: response.uri,
                    type: 'image/jpeg', // or photo.type
                    name: 'image.png'
                });
                fetch(url, {
                    method: 'post',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }

                }).then((response) => response.json())
                    .then((responseJson) => {
                        //       this.hideLoading()
                        this.setState({myimages:responseJson.images})

                        this.setState({path:responseJson.path})




                    });
            }




            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };


        });
    }

    selectedFirstd  = (item) => {

        const url = GLOBAL.BASE_URL + 'delete_images_pharmacy'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({


                "user_id": GLOBAL.user_id,
                "id":item.id


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                alert(JSON.stringify(responseJson))

                //  this.rajorPay()
                if (responseJson.status == true) {

                    this.setState({myimages:responseJson.list_of_images})

                } else {


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    _renderItemsd  = ({item,index}) => {
        var uri = `${this.state.path}${item.image}`;

        return (



            <View style = {{backgroundColor:'transparent',margin:1}}>
                <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                       source={{uri:uri}}/>
                <TouchableOpacity style = {{width :20 ,height :20,position:'absolute',right:2}} onPress={() => this.selectedFirstd(item)
                }>

                    <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                           source={require('./add.png')}/>
                </TouchableOpacity>

            </View>



        )

    }
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                <View style = {{backgroundColor:'transparent',margin:1}}>
                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./myself.png')}/>

                    <Text style={{fontSize : 14,color :'#0592CC',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                        {item.member_name}
                    </Text>
                </View>


            </TouchableOpacity>
        )
    }
    render() {
        var speciality = GLOBAL.appointmentArray.speciality_detail_array
        // name :'',
        //     value:'',
        //     dob:'',
        //     address:'',
        //     area :'',
        //     city:'',

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        let { name } = this.state;
        let { dob } = this.state;
        let { address } = this.state;
        let { area } = this.state;
        let { city } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListAddress')
                        }>

                            <Text style={{marginLeft : 10,marginTop:10,fontSize : 20,color :'#000000', height:'auto',fontFamily:'Poppins-Medium',width :window.width - 80}}>

                                Select  Address
                            </Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10,flexDirection:'row'}}>

                            <View style = {{width:window.width - 100}}>


                                <Text style={{marginLeft : 5,fontSize : 18,color :'black',fontFamily:'Poppins-Medium',width :'80%',marginTop:8}}>

                                    Address:   {this.state.address.address}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                                    Area:   {this.state.address.area}
                                </Text>

                                <Text style={{marginLeft : 5,fontSize : 15,color :'grey',fontFamily:'Poppins-Medium',width :'80%'}}>

                                    State:   {this.state.address.city_state}
                                </Text>
                            </View>





                        </View>
                        <View >
                            <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                               ADD YOUR PRESCRIPTION
                            </Text>



                            {this.state.myimages.length != 0 && (

                                <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                          horizontal = {true}
                                          data={this.state.myimages}
                                          numColumns={1}
                                          horizontal={true}
                                          keyExtractor = { (item, index) => index.toString() }
                                          renderItem={this._renderItemsd}
                                />

                            )}

                            <Button
                                style={{padding:7,marginTop:18,fontSize: 20,borderWidth:1,borderColor:"#0592CC",color:"#0592CC",marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressd()}>
                                ATTACH IMAGES /REPORT
                            </Button>
                            <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                                Attach up to 3 images here.
                            </Text>

                        </View>





                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            SUBMIT
                        </Button>
                    </KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
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
