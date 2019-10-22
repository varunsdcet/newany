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
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class BookingAppointmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name :'',
            value:'',
            dob:'',
            address:'',
            area :'',
            city:'',
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

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'BOOKING APPOINTMENT',
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


    _handleStateChange = (state) => {




            const interest = this.state.member.concat(GLOBAL.mymember)
//            alert(JSON.stringify(interest))



         //   const interests = [...interest, ...a];
            //
            // var b = interest.concat(a)
            //
             this.setState({member:interest})


    }

    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        //   this._handlePressLogin()
    }
    _handlePress() {


        if (this.state.value == 0){
            GLOBAL.onlinegender = "Male";
        }else{
            GLOBAL.onlinegender = "Female";
        }


        GLOBAL.onlinename = "";
        GLOBAL.onlinedob = "";
        GLOBAL.onlineaddress = "";
        GLOBAL.onlinearea = "";
        GLOBAL.onlinecity = "";



        GLOBAL.onlineMember = this.state.member



        this.props.navigation.navigate('BookingDetailFinal')
    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {

        this.props.navigation.navigate('ListMember')

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

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                        <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                            <View style = {{flexDirection:'row',width :'100%'}}>

                                <View>
                                    <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                                           source={{ uri: GLOBAL.appointmentArray.image }}/>
                                    {GLOBAL.appointmentArray.doctor_avail_status == 1 && (

                                        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                            Available Today
                                        </Text>
                                    )}
                                    {GLOBAL.appointmentArray.doctor_avail_status != 1 && (

                                        <Text style={{marginLeft : 10,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:50,textAlign:'center'}}>

                                            Offline
                                        </Text>
                                    )}


                                </View>

                                <View>

                                    <View style = {{flexDirection:'row',width:'100%'}}>
                                        <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'70%',marginTop:18}}>

                                            {GLOBAL.appointmentArray.name}
                                        </Text>

                                        <View style = {{backgroundColor:'#F1AE42',borderRadius:4,width:45,height:25,marginTop:18,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
                                            <Image style = {{width :15 ,height :15,marginLeft:4,resizeMode:'contain'}}
                                                   source={require('./star.png')}/>

                                            <Text style={{marginLeft : 5,fontSize : 12,marginTop:3,color :'white',fontFamily:'Poppins-Medium',}}>

                                                {GLOBAL.appointmentArray.ratting}
                                            </Text>
                                        </View>

                                    </View>

                                    <View style = {{flexDirection:'row', height:'auto'}}>
                                        <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',height:'auto',fontFamily:'Poppins-Medium',width :'60%'}}>

                                            {speciality}
                                        </Text>


                                    </View>

                                    <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                        <View>
                                            <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                                Experience
                                            </Text>
                                            <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                                {GLOBAL.appointmentArray.experience} Years
                                            </Text>
                                        </View>

                                        <View>
                                            <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                                Likes
                                            </Text>
                                            <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                                {GLOBAL.appointmentArray.like}
                                            </Text>
                                        </View>

                                        <View style = {{marginRight:50}}>
                                            <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                                Reviews
                                            </Text>
                                            <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                                {GLOBAL.appointmentArray.total_review}
                                            </Text>
                                        </View>

                                    </View>

                                    <Text style={{fontSize : 12,color :'#0592CC',fontFamily:'Poppins-Medium',}}>

                                        Consult online for ₹ {GLOBAL.appointmentArray.online_consult_chat_price} onwards
                                    </Text>
                                </View>

                            </View>








                        </View>



                    <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                        Is this for you or someone else?
                    </Text>

                        <View style = {{flexDirection:'row',margin:8}}>
                            <View>

                            <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                                   source={require('./myself.png')}/>

                                   <Text style = {{color:'black',font:'Poppins-Medium',textAlign:'center'}}>
                                       Self

                                   </Text>


                            </View>
                            <FlatList style= {{flexGrow:0,backgroundColor:'transparent'}}
                                      horizontal = {true}
                                      data={this.state.member}
                                      numColumns={1}
                                      horizontal={true}
                                      keyExtractor = { (item, index) => index.toString() }
                                      renderItem={this._renderItems}
                            />



<View>
    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('ListMember')}>
                            <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                                   source={require('./add.png')}/>

    <Text style = {{color:'black',font:'Poppins-Medium',textAlign:'center'}}>
        Add

    </Text>
    </TouchableOpacity>


</View>




                        </View>

                    <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                        Basic Information
                    </Text>

                        <View style = {{backgroundColor:'white',borderRadius:8,marginLeft:10,width:window.width - 20}}>
                            <View style = {{marginLeft:10}}>
                            <TextField
                                label= 'Name'
                                value={name}
                                onChangeText={ (name) => this.setState({ name }) }
                                tintColor = {'#0592CC'}
                            />
                            <Text style={{fontSize : 12,color :'rgba(0,0,0,0.5)',fontFamily:'Poppins-Medium',}}>

                               Gender
                            </Text>

                            <RadioForm style={{ marginTop:12}}
                                       labelStyle={{paddingRight:20}}
                                       radio_props={radio_props_one}
                                       initial={0}
                                       buttonSize={10}
                                       formHorizontal={true}
                                       buttonColor={'#0592CC'}
                                       labelHorizontal={true}
                                       animation={false}
                                       labelColor={'black'}
                                       selectedButtonColor={'#0592CC'}
                                       onPress={(value) => {this.setState({value:value})}}
                            />
                            <TextField
                                label= 'Date of Birth'
                                value={dob}
                                onChangeText={ (dob) => this.setState({ dob }) }
                                tintColor = {'#0592CC'}
                            />

                            <TextField
                                label= 'Address'
                                value={address}
                                onChangeText={ (address) => this.setState({ address }) }
                                tintColor = {'#0592CC'}
                            />

                            <TextField
                                label= 'Area Locality'
                                value={area}
                                onChangeText={ (area) => this.setState({ area }) }
                                tintColor = {'#0592CC'}
                            />
                            <TextField
                                label= 'City'
                                value={city}
                                onChangeText={ (city) => this.setState({ city }) }
                                tintColor = {'#0592CC'}
                            />

                        </View>
                        </View>

                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            PROCEED
                        </Button>
                    </KeyboardAwareScrollView>

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
