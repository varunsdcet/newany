import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get('window');

let textRef = React.createRef();
let menuRef = null;
import Geolocation from '@react-native-community/geolocation';
type Props = {};
const GLOBAL = require('./Global');


var length = 0;
var commonHtml = "";

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class AmbulanceBooking extends Component {
    state = {
        text: '',
        currentLongitude: 0,//Initial Longitude
        currentLatitude: 0,
        imageurl:'',
        status :'',data:[],
        ipAdd : '',
        loading:'',location:GLOBAL.currLoc,catid:'',
        marker :[],
        name :'',        initialPosition: {
latitude: 0,
longitude: 0,
latitudeDelta: 0,
longitudeDelta: 0,
},


    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
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

    selectVehicle=(item, indexs)=>{
//        alert(JSON.stringify(item))
                var a = this.state.data
        for (var i = 0;i<this.state.data.length ;i ++){

            this.state.data[i].is_selected = '0'
        }
        var index = a[indexs]
        if (index.is_selected == "0"){
            index.is_selected = "1"
            this.setState({catid : item.id})

        }else{
            index.is_selected = "0"
        }
        this.state.data[indexs] = index
        this.setState({data:this.state.data})

    }

    renderRowItem2 = ({item,index}) => {

        let ic_url = this.state.imageurl + item.icon
        return (
            <TouchableOpacity onPress={() => this.selectVehicle(item,index)
            }>

            <View   style  = {{width:window.width/2.2 - 8,margin:4, height:130,backgroundColor:'white',shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
            >
                <Image source={{uri : ic_url}}
                       style  = {{width:window.width/2.2 - 8, height:70,marginTop: 3,alignSelf:'center',marginLeft:5,
                       }}

                />



                <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                    {item.name}

                </Text>
                <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center',width:window.width/2.2 - 8}}>
                    {item.price}

                </Text>
                            {item.is_selected != 0 &&(

                                <Image style = {{width :25 ,height :25,alignSelf:'flex-end',position:'absolute', bottom:5, right:5}}
                                       source={require('./check.png')}/>
                            )}
                            {item.is_selected == 0 &&(

                                <Image style = {{width :25 ,height :25,alignSelf:'flex-end',position:'absolute', bottom:5, right:5}}
                                       source={require('./uncheck.png')}/>
                            )}



            </View>
            </TouchableOpacity>
        )
    }

    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.currLoc})
        this.loadData()
    }

    liketogo=()=>{
        GLOBAL.like=2
        this.props.navigation.navigate('Location')
    }

    currentPos=()=>{
        GLOBAL.like=1
        this.props.navigation.navigate('Location')
    }

    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
    }

    _handlePress=()=>{
//        alert(this.state.catid)
        const url = GLOBAL.BASE_URL +  'add_ambulence_booking'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "cat_id":this.state.catid,
                "from_":this.state.location,
                "to_": GLOBAL.locationliketogo
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    alert("Your booking is made successfully! Our representative will connect with you soon!")
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    componentDidMount(){
    this.props.navigation.addListener('willFocus', this._handleStateChange);
    Geolocation.getCurrentPosition((position) =>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
        this.mapView.animateToRegion(initialRegion, 1);

    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000,});

    this.loadData()
    }

    loadData=()=>{
                const url = GLOBAL.BASE_URL +  'ambulance_cat'

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
                  this.setState({data:responseJson.list})
                  this.setState({imageurl: responseJson.image_url})

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

  _onMapReady = () => this.setState({marginBottom: 0})

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

                <View style={styles.container}>

                <MapView
                    clusterColor = '#77869E'
                    clusterTextColor = 'white'
                    clusterBorderColor = '#77869E'
                    clusterBorderWidth = {4}
                    showsUserLocation = {true}
                    showsMyLocationButton = {true}
                    pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}
                    onMapReady={this._onMapReady}
                    ref = {(ref)=>this.mapView=ref}
                    region = {this.state.initialRegion}


                    style={{ flex:1, marginBottom:this.state.marginBottom }}
                >


                    {this.state.marker.map(marker => (

                        <Marker coordinate={this.state.initialRegion}
                        title={'Hi User!'}
                        description={'You are here!'}
                        />
                    ))}



                </MapView>

                    <View style = {{position:'absolute',top :10 ,borderRadius:13,
                    width:window.width - 20,height:120 ,flexDirection:'column',alignSelf:'center', alignItems:'center'}}>


                    <View style = {{borderRadius:13,width:window.width - 20,height:45,
                        backgroundColor:'white',borderWidth:1,borderColor:'black',flexDirection:'row', marginTop:10, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{width:'80%',}}
                onPress={()=> this.currentPos()}>
                 <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: 'Poppins-Regular',alignSelf:'center', width:'80%'}}
                 numberOfLines={2}>
                  {this.state.location}

                 </Text>
                 </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')
                    }>

                    <Image style={{width:20, height:20, resizeMode:'contain', marginLeft:30}}
                    source={require('./checks.png')}/>
                    </TouchableOpacity>

                 </View>

                    <TouchableOpacity onPress={() => this.liketogo()
                    }>
                    <View style = {{borderRadius:13,width:window.width - 20,height:45,backgroundColor:'white',borderWidth:1,borderColor:'black', marginTop:10, justifyContent:'center'}}>
                      <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: 'Poppins-Regular',alignSelf:'center', width:'80%'}}
                      numberOfLines={2}>
                      {GLOBAL.locationliketogo}
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>


                <View style= {{margin:8, position:'absolute', bottom:10, flexDirection:'column'}}>
                    <FlatList style= {{flexGrow:0,margin:8, }}
                                horizontal={true}
                              data={this.state.data}

                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this.renderRowItem2}
                    />
                       <Button
                        style={{padding:4,marginTop:5,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePress()}>
                        SUBMIT
                    </Button>


                    </View>

                    </View>


        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'white'
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