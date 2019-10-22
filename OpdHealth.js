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

export default class OpdHealth extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        results:[],
        ishave :false,

        selected:false,
        data:[],
        images :[
            {
                title :'3 Month',
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),
                price :'₹2500',
                desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry'

            },
            {
                title :'6 Month',
                image :require('./female.png'),
                selected:'',
                images :require('./females.png'),
                price :'₹2500',
                desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry'

            },
        ]

    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SUBSCRIPTION',
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
        const url = GLOBAL.BASE_URL +  'opd_health_plans'

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
           //     alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.packag_list})
                    this.setState({ishave:responseJson.is_have})



                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }


    login = (item) => {


        var a = this.state.results
  var b = "0";
        for (var i = 0; i < a.length;i++){
            if (a[i].is_active == 1){
                b = a[i].id
            }

        }




         if (item.discount_price == "0.00"){
             GLOBAL.price = item.base_price
         }else{
             GLOBAL.price = item.discount_price
         }
        var commonHtml = `${GLOBAL.user_id}|package|${item.id}|${b}`;
         GLOBAL.mytypes = commonHtml
         GLOBAL.bookingtype = "package"
         this.props.navigation.navigate('Payment')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
     //   alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {
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

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',
                    justifyContent:'space-around',marginTop: 10,marginBottom:10,borderRadius:6}}>







                    <Text style={{marginLeft : 5,marginTop:5,fontSize : 20,color :'#132439', height:'auto',fontFamily:'Poppins-Medium',width :window.width - 80}}>

                        {item.package_name}
                    </Text>

                    <Text style={{marginLeft : 5,marginTop:2,fontSize : 15,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 40}}>

                     . {item.description}
                    </Text>
                    <Text style={{marginLeft : 5,marginTop:2,fontSize : 15,color :'rgba(0,0,0,0.6)', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 40}}>

                     Valid Upto   . {item.duration} - {item.duration_type}
                    </Text>


                    <View style = {{flexDirection:'row',width:'100%'}}>
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'20%',}}>

                           {item.base_price}
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'20%',textDecorationLine: 'line-through',}}>

                         {item.base_price}
                            </Text>
                        )}
                        {item.discount_price != "0.00" && (
                        <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',width :'50%'}}>

                         {item.discount_price}
                        </Text>
                        )}
                        {item.discount_price == "0.00" && (
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'#000000', height:'auto',fontFamily:'Poppins-Regular',width :'50%'}}>


                            </Text>
                        )}


                        {this.state.ishave == 0 && item.type == "package" && item.is_active == 0 &&(

                        <Button
                            style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:60,height:30,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login(item)}>
                            BUY
                        </Button>
                        )}
                        {this.state.ishave == 1 && item.type == "package" && item.is_active == 0 &&  (

                            <Button
                                style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:60,height:30,fontFamily:'Poppins-Medium',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login(item)}>
                                UPGRADE
                            </Button>
                        )}

                        {this.state.ishave == 1 && item.is_active == 0 && (

                            <Button
                                style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:60,height:30,fontFamily:'Poppins-Medium',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login(item)}>
                                BUY
                            </Button>
                        )}

                        {this.state.ishave == 0 && item.is_active == 2 && (

                            <Button
                                style={{padding:4,fontSize: 14, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:60,height:30,fontFamily:'Poppins-Medium',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this.login(item)}>
                                RENEW
                            </Button>
                        )}


                    </View>


                    {item.is_add_on == 1 && (
                        <View  style = {{backgroundColor:'#e1e1e1'}}>
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'black', height:'auto',fontFamily:'Poppins-SemiBold',width :'90%'}}>
                                {item.add_on_title}

                            </Text>
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 16,color :'black', height:'auto',fontFamily:'Poppins-Regular',width :'90%'}}>
                                {item.benifits}

                            </Text>
                            <Text style={{marginLeft : 5,marginTop:5,fontSize : 18,color :'#FF2D00', height:'auto',fontFamily:'Poppins-Regular',width :'20%',}}>

                                {item.add_price}
                            </Text>
                        </View>
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
            <SafeAreaView>
                <View style={styles.container}>



                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />











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
        height: window.height,
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