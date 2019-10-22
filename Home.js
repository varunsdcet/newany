import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView,Linking} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
let textRef = React.createRef();
let menuRef = null;
import moment from 'moment';
const GLOBAL = require('./Global');
//import Geolocation from '@react-native-community/geolocation';
type Props = {};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;
const images = [
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg",
    "https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg"
];
import Carousel from 'react-native-banner-carousel';

var length = 0;
var commonHtml = "";
var booking_type ='';

export default class Home extends Component {



    state = {
        text: '',
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',
        username: '',
        password: '',
        status :'',
        ipAdd : '',
        loading:'',
        marker :[],
        speciality:[],
        banner:[],
        statuss :'',
        isok:0,
        call:'',
        detail:'',
        articles:[],
        package :[],
        location:'',
        FlatListItems: [
            {"key": "#1",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#2",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#3",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#4",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },
            {"key": "#5",
                "name": "Healthy Indian Days Special Package",
                "testno": "includes",
                "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                "recomendation": "Recomended for:",
                "limit": "Age group:",
            },

        ],
        moviesList :[
            {

                title :'Doctor@Doorstep',
                image:require('./doorstep.png')
            },


            {

                title :'Nursing care@ Home',
                image:require('./nurse.png')
            },

            {

                title :'Medical Services @ Doorstep',
                image:require('./medical.png')
            },

            {

                title :'24x7 Online Consultation',
                image:require('./online-consultation.png')
            },

            {

                title :'Doctor Appointment @ Clinic',
                image:require('./appointment.png')
            },
            {

                title :'Hospital Admissions',
                image:require('./hospital.png')
            },
            {

                title :'Ambulance Booking',
                image:require('./ambulance.png')
            },
            {

                title :'Lab Test Booking',
                image:require('./lab-test.png')
            },
            {

                title :'Medical Equipments',
                image:require('./medical.png')
            },
            {

                title :'OPD Health Plans',
                image:require('./health.png')
            },

            {

                title :'Health Packages',
                image:require('./package.png')
            },
            {

                title :'Best Surgical Packages',
                image:require('./surgical.png')
            },
            {

                title :'Pharmacy',
                image:require('./health.png')
            },


        ],

        results: [],
        selected:[],
        name :'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
              header: () => null,
            title: 'AMBULANCE BOOKING',
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

    hideLoading() {
        this.setState({loading: false})
    }
    getRespone = (res) => {
     //   alert(JSON.stringify(res))
        GLOBAL.another = res.doctor_id,
        GLOBAL.anothername = res.doctor_name
        GLOBAL.referal = res.user_detail.referral_code
        GLOBAL.bookingid = res.chat_g_id
        GLOBAL.mybookingid = res.booking_id
        booking_type = res.booking_type

        this.setState({isok:res.is_booking})
        this.setState({call:res.emergency_number})
        this.setState({speciality:res.specialty})
        this.setState({banner:res.banners})
        this.setState({articles:res.articles})
        this.setState({package:res.package})

    }

    call1 = ()=>{
        const url = GLOBAL.BASE_URL +  'get_check_chat_flag'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              //  alert(JSON.stringify(responseJson))

             //   this.call1()

                if (responseJson.status == true) {


this.setState({detail:responseJson.detail})
                        GLOBAL.bookingflag = responseJson.list.flag;
                    GLOBAL.bookingid = responseJson.list.g_booking_id
                    GLOBAL.another = responseJson.list.doctor_id
                    GLOBAL.bookingstatus = responseJson.list.booking_status
                    this.setState({statuss:"0"})
                    if (GLOBAL.bookingflag == "1"){
                        this.setState({statuss:"1"})

                    }
                }else{
                    //this.call1()
                    this.setState({statuss:"0"})
                }

            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });






       // this.setState({location:GLOBAL.location})
    }
    _handleStateChange = (state) =>{
        Geolocation.getCurrentPosition(
            (position) => {
                this.getlog(position)

                //  alert(JSON.stringify(position))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        length = 500

        const url = GLOBAL.BASE_URL +  'home_patient'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"home_patient",
                "user_id":GLOBAL.user_id




            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.getRespone(responseJson)
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });






        this.setState({location:GLOBAL.location})
    }





    renderPage(image, index) {

        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight ,resizeMode:'stretch'}} source={{ uri: image }} />
            </View>
        );
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
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>
                    {item.selected != '' &&(

                        <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:4,marginBottom: 6}}
                               source={require('./check.png')}/>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {


        this.hideLoading()
        if (res.status == 200){
            this.setState({marker:res.role})
            length = 500

            commonHtml = `${stringsoflanguages.thereare} ${length} + ${stringsoflanguages.closed}`;
            this.setState({name:commonHtml})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunction = (info) => {
        let r = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        //  this.mapView.root.animateToRegion(r,1);



        this.mapView.root.animateToCoordinate(r, 1);

        this.setState({currentLongitude:info.coords.longitude})
        this.setState({currentLatitude:info.coords.latitude})
        // this.setMenuRef.animateCamera(info.coords.latitude,info.coords.longitude)
      //  alert(this.state.currentLatitude)


        var url = GLOBAL.BASE_URL + 'getNearLabour';
        var self=this;



        axios.post(url, {
            lat: this.state.currentLatitude.toString(),
            lng: this.state.currentLongitude.toString(),

        })
            .then(function (response) {


                self.myCallbackFunctions(response.data)


                //    self.myCallbackFunction.bind()

                //   this.myCallbackFunction()


            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });


        // GLOBAL.long = info.coords.longitude
        // GLOBAL.lat = info.coords.latitude
        // alert(JSON.stringify(info))
    }
    _handlePress =() => {
        this.props.navigation.navigate('Register')
    }
    getlog = (position)=>{
        var s = position.coords.latitude
        var e = position.coords.longitude
        GLOBAL.lat = s.toString()
        GLOBAL.long = e.toString()

        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "latitude": GLOBAL.lat,
                "longitude":GLOBAL.long,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.setState({location:responseJson.address})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    componentDidMount(){

        var s = moment().format('YYYY-MM-DD')
        GLOBAL.date = s
       // this.call1()   // this.getC


        this.props.navigation.addListener('willFocus', this._handleStateChange);
      //  {this.setState({location:GLOBAL.location})}


        var self=this;
        // Geolocation.getCurrentPosition(info =>
        //
        //
        //
        //
        //
        // );
        // this.callLocation(that);
    }
    _handlePress() {
        console.log('Pressed!');
    }

    callLocation(that){
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    setMenuRef = ref => menuRef = ref;
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    selectedFirst123 = (item) =>{
        GLOBAL.lab = item
        this.props.navigation.navigate('PackageMember')
 //       alert(JSON.stringify(item))
    }

    renderRowItem3=({item}) => {
     //   alert(JSON.stringify(item))

        // var test_included = item.test_included
         var s = "";
        // if (test_included.length == 1){
        //     s = test_included[0]
        // }else {
        //     s = test_included.join(",")
        // }
        return(
            <TouchableOpacity onPress={() => this.selectedFirst123(item)
            }>

                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 10,borderRadius :6,width : Dimensions.get('window').width-20, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>
                    <View style={{flexDirection: 'row', marginTop:6}}>
                        <Text style={{color:'black', fontSize:15,marginLeft:5,fontFamily:'Poppins-Medium',alignItems:'flex-start'}}>{item.package_name}</Text>

                    </View>

                    <View style={{flexDirection:'column', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:5}}>
                            <Text style={{color:'#808080', fontSize:13,fontFamily:'Poppins-Regular',marginLeft:5}}>
                                includes
                            </Text>
                            <Text style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',marginLeft:3}}>{item.includes} Tests</Text>
                        </View>
                        <Text style={{color:'#808080',fontFamily:'Poppins-Regular',fontSize:15,marginTop:3,marginLeft:5}}>{item.include_string}</Text>
                    </View>


                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:5}}
                                containerStyle={{height:25,width:183,backgroundColor:'white',overflow:'hidden',marginLeft:5,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Recomended for:</Text>
                            {item.recommed_for}
                        </Button>

                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:40}}
                                containerStyle={{height:25,width:122,backgroundColor:'white',overflow:'hidden',marginLeft:9,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Age group:</Text>
                            {item.age_group}yrs.
                        </Button>

                    </View>


                    <View style={{flexDirection:'row',marginTop:10,alignItems:'center',width:'100%',marginBottom:10}}>
                        <View style = {{flexDirection:'row',width:'50%'}}>
                            {item.discount_price != "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                            )}
                            {item.discount_price != "0.00" && (

                                <Text style={{fontSize:15,color:'black',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.discount_price}/-</Text>

                            )}

                            {item.discount_price == "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                            )}
                            {item.discount_price == "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}></Text>

                            )}

                        </View>


                    </View>



                </View>
            </TouchableOpacity>

        );
    }



    selectedFirst = (index) =>{
        if (index == 0){
            this.props.navigation.navigate('DoctorVisit')
        }else if (index == 1){
            this.props.navigation.navigate('Nurse')
        }else if (index == 2){
            this.props.navigation.navigate('MedicalService')
        }else if (index == 3){
            this.props.navigation.navigate('BookingAppointment')
        }else if (index == 4){
            this.props.navigation.navigate('OfflineBooking')
        }else if (index == 5){
            this.props.navigation.navigate('Insurance')
        }else if (index == 6){
            this.props.navigation.navigate('AmbulanceBooking')
        }else if (index == 7){
            this.props.navigation.navigate('Labtest')
        }
        else if (index == 8){
            this.props.navigation.navigate('PurchaseType')
        }
        else if (index == 9){
    this.props.navigation.navigate('OpdHealth')
}else if (index == 10){
            this.props.navigation.navigate('HealthPackege')
        }
        else if (index == 11){
            this.props.navigation.navigate('SurgicalPackage')
        } else if (index == 12){
            this.props.navigation.navigate('Pharmacy')
        }
    }
    selectedFirst1 = (itemData) => {
      //  this.props.navigation.navigate('ArticleDescription')
    }
    selectedFirstsd = (item) => {
        GLOBAL.searchSpeciality = item
        this.props.navigation.navigate('SearchSpeciality')
    //  this.props.navigation.navigate('ArticleDescription')
}
    renderRowItem2s = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirst1(itemData.index)
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

    renderRowItem2 = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirstsd(itemData.item.title)
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

    renderRowItem1 = (itemData) => {
        return (
            <TouchableOpacity onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:window.width/3 - 8,margin:4, height:105,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={itemData.item.image}
                           style  = {{width:45, height:45,marginTop: 3,alignSelf:'center',marginLeft:5,resizeMode:'contain'
                           }}

                    />

                    <Text style = {{fontSize:12,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center'}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }


    calls = () =>{
        var phoneNumber = `tel:${this.state.call}`;
          Linking.openURL(phoneNumber);



    }

    call = () =>{
       var phoneNumber = `tel:${this.state.call}`;
      //  Linking.openURL(phoneNumber);
        if (booking_type == "chat"){
            this.props.navigation.navigate('Chat')
        }else {
            this.props.navigation.navigate("VideoCall", {
                channelName: GLOBAL.bookingid,
                onCancel: (message) => {
                    this.setState({
                        visible: true,
                        message
                    });
                }
            })
        }


    }
    render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='white' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View>

                    <View style = {{flexDirection:'row',width:'100%',marginTop: 20,marginBottom: 20}}>



                        <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Image source={require('./drawer.png')}
                                   style  = {{width:30, height:30,marginLeft:10,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity style = {{width:'55%',marginLeft:10}} onPress={() => this.props.navigation.navigate('Location')
                        }>
                        <Text style = {{color:'black',fontFamily:'Poppins-Regular',fontSize:12,width:200,height:40}}>
                            {this.state.location}

                        </Text>
                        </TouchableOpacity>
                        <View style = {{flexDirection:'row'}}>

                            {this.state.isok == 1 && (
                            <TouchableOpacity onPress={() => this.call()
                            }>
                                <Image source={require('./call.png')}
                                       style  = {{width:25, height:25,marginLeft:10,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>
                            )}

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')
                            }>
                            <Image source={require('./search.png')}
                                   style  = {{width:25, height:25,marginLeft:10,resizeMode:'contain'
                                   }}

                            />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.calls()
                            }>
                            <Image source={require('./call.png')}
                                   style  = {{width:25, height:25,marginLeft:10,resizeMode:'contain'
                                   }}

                            />
                            </TouchableOpacity>

                        </View>

                    </View>


                    {this.state.statuss == "1" && (
                        <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Chat')}>

                            <View style = {{width:window.width,height:50,backgroundColor:'black'}}>
                                <Text style = {{alignSelf:'center',marginTop:8,color:'white'}}>
                                    Your Booking Start on {this.state.detail}

                                </Text>


                            </View>
                        </TouchableOpacity>
                    )}
                    <KeyboardAwareScrollView>



                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        showsPageIndicator={false}
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {this.state.banner.map((image, index) => this.renderPage(image, index))}
                    </Carousel>

                    <FlatList style = {{marginLeft:5,width:window.width - 10}}
                              data={this.state.moviesList}
                              numColumns={3}

                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem1}
                              extraData={this.state}
                    />

                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Specialities

                            </Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Speciality')
                            }>

                                <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                                    View All

                                </Text>
                            </TouchableOpacity>


                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>

                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.speciality}
                                  horizontal={true}

                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2}
                                  extraData={this.state}
                        />
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Packages

                            </Text>



                            <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                                View All

                            </Text>


                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>

                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.package}
                                  horizontal={true}
                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem3}
                                  extraData={this.state}
                        />
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Articles

                            </Text>



                            <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>



                            </Text>


                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>
                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.articles}
                                  horizontal={true}

                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2s}
                                  extraData={this.state}
                        />

                        <View style = {{height:150}}>

                        </View>
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

        backgroundColor :'#f7f8f9'
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
    }
})