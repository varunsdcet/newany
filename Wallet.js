import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';

import RazorpayCheckout from 'react-native-razorpay';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';

const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
class Wallet extends Component<Props> {

    static navigationOptions = {
        title: 'Wallet',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
        },
        headerTitleStyle: {
            fontSize: 15,
            width:200
        },
    };





    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: '',
            email: '',
            message: '',
            status :'' ,
            loading : '',
            userid : '',
            notificationslist:[],
            username:'',
            wallet:'',
            referral:'',
        }
    }
    _keyExtractor = (item, index) => item.productID;

    renderRowItem = (itemData) => {
        return (
            <View style={{flexDirection: 'row',
                flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:10,}}>

                <Image style={{width:30, height:30, resizeMode:'contain', margin:12}} source={require('./notification.png')}/>
                <View style={{flexDirection:'column', margin:10, width: '82%'}}>
                    <Text style={{fontSize:15, color:'#21262C', fontFamily: 'Poppins-Regular'}}>{itemData.item.title}</Text>
                    {/*     <Text style={{fontSize:13, marginRight:10,fontFamily: 'Poppins-Regular'}}>{itemData.item.message}</Text>*/}
                    <View style={{flexDirection:'row', width: '100%', alignItems:'flex-end', justifyContent: 'flex-end'}}>
                        <Image style={{width: 18, height: 18, resizeMode: 'contain'}} source={require('./clocks.png')}/>
                        <Text style={{fontSize:13,marginTop: 10,marginLeft: 10,marginRight:10,  color:'#7E7E7E'}}>{itemData.item.added_on}</Text>
                    </View>

                </View>
            </View>



        )
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    _handleStateChange = (state) => {
        const url = GLOBAL.BASE_URL +  'get_profile'
        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: GLOBAL.user_id

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//      alert(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {


                    this.setState({wallet : responseJson.wallet})
                    this.setState({referral : responseJson.refferal_wallet})

                }

            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    componentDidMount(){

        this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
    }

    getReviews= () =>{
        this.showLoading();
        const url = GLOBAL.BASE_URL +  'notification'
        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: GLOBAL.user_id

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

//      alert(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {


                    this.setState({notificationslist : responseJson.notification})

                }

            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }
    capture = (a,s) =>{
//https://rzp_test_26ccbdbfe0e84b:69b2e24411e384f91213f22a@api.razorpay.com/v1/payments/pay_29QQoUBi66xm2f/capture
        alert(a)
        var commonHtml = `https://rzp_test_CDbzQjcE3QD5L3:ipNPnUwhDwPkIjNfyngYOzju@api.razorpay.com/v1/payments/${a}/capture`;



        fetch(commonHtml, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: s.toString(),



            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.navigate('Thankyou')

            })
            .catch((error) => {
                alert(error);
                this.hideLoading();
                alert('Unable to process your request Please try again after some time')

            });


    }
    pay = ()=>{
        if (this.state.username == "" ){
            alert('Please add Some Amount')
        }else{
            var b = parseInt(this.state.username) * 100
        var ss =`${GLOBAL.user_id}|add_wallet`;
            var options = {
                description: ss,
                image: require('./loginlogo.png'),
                currency: 'INR',
                key: 'rzp_test_CDbzQjcE3QD5L3',
                amount:b,

                name: GLOBAL.myname,
                prefill: {
                    email: GLOBAL.myemail,
                    contact: GLOBAL.mymobile,
                    name: GLOBAL.myname
                },
                theme: {color: '#F37254'}
            }

            RazorpayCheckout.open(options).then((data) => {
                var a = data.razorpay_payment_id
                this.capture(a,b);



            }).catch((error) => {
                // handle failure
                // this.myPayments(s,error.description,'')

            });
            RazorpayCheckout.onExternalWalletSelection(data => {



            });
        }
    }
    buttonClickListeners = () =>{
        this.setState({username:'2000'})

    }
    buttonClickListenerss = () =>{
        this.setState({username:'1000'})
    }
    buttonClickListenersss = () =>{
        this.setState({username:'500'})
    }
    render() {


        var commonHtml = `Total Balance :  ${this.state.wallet} Points `;
        var referBal = `Referral Balance : ${this.state.referral} Points`;
        if(this.state.loading){
            return(
                <View style={{flex: 1}}>
                    <ActivityIndicator style = {styles.loading}

                                       size={50} color="#E9128B" />

                </View>
            )
        }
        return (

            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
                                     style = {{backgroundColor:'#f1f1f1',width : windowW ,height :windowH,flex:1}}
            >
                <View style = {{flex : 1  }}>

                    <Text style = {{marginTop :30 ,color :'black',fontSize : 22, fontFamily:'Poppins-Medium' ,alignSelf :'center' }}>
                        {GLOBAL.username}
                    </Text>



                    <Image style={{marginLeft : windowW/2 - 50 ,height : 100 ,marginTop :30 , width : 100,resizeMode :'contain'}}
                           source={require('./wallet_two.png')}/>


                    <Text style = {{alignSelf:'center',marginTop : 50 ,color :'black',fontSize :15}}>
                        {commonHtml}
                    </Text>
                    <Text style = {{alignSelf:'center',marginTop : 10 ,color :'black' ,fontSize :15}}>
                        {referBal}
                    </Text>

                    <View style = {{margin :10 ,marginTop : 30,flexDirection :'row',justifyContent :'space-between',alignItems:'space-between'}}>

                        <Button
                            containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#006FA5',borderRightColor:'#006FA5',  borderTopColor :'#006FA5',borderBottomColor :'#006FA5',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 14, color: '#006FA5',fontFamily:'Poppins-Medium'}}
                            onPress={this.buttonClickListeners}>
                            + 2000
                        </Button>

                        <Button
                            containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100 ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#006FA5',borderRightColor:'#006FA5',  borderTopColor :'#006FA5',borderBottomColor :'#006FA5',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 14, color: '#006FA5',fontFamily:'Poppins-Medium'}}
                            onPress={this.buttonClickListenerss}>
                            + 1000
                        </Button>


                        <Button
                            containerStyle={{padding:10, height:45, overflow:'hidden',borderBottomWidth :2,width :100 ,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderRadius:4,borderLeftColor:'#006FA5',borderRightColor:'#006FA5',  borderTopColor :'#006FA5',borderBottomColor :'#006FA5',backgroundColor :'transparent'}}
                            disabledContainerStyle={{backgroundColor: 'grey'}}
                            style={{fontSize: 14, color: '#006FA5',fontFamily:'Poppins-Medium'}}
                            onPress={this.buttonClickListenersss}>
                            + 500
                        </Button>
                    </View>


                    <Text style = {{margin : 20 ,color :'#006FA5',fontSize :12,fontFamily :'Poppins-Medium'}}>
                        Enter Amount
                    </Text>

                    <TextInput style = {{margin : 30,borderBottomWidth:1,borderBottomColor :'#bfbfbf',
                        marginLeft : 10,marginTop:2, width : windowW - 20 ,height : 40 ,color :'black' ,
                        fontSize : 16 ,fontWeight:'bold'}}
                               placeholder="Enter Your Amount"
                               placeholderTextColor="black"
                               keyboardType = 'numeric'
                               maxLength={5}
                               onChangeText={(username) => this.setState({username : username.replace(/[^0-9]/g, '')})}
                               value={this.state.username}
                    >


                    </TextInput>

                    {/*
   <Button
         containerStyle={{marginLeft :50,marginRight :50,marginTop :10,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
         disabledContainerStyle={{backgroundColor: 'white'}}
         style={{fontSize: 14, color: 'white',fontFamily:'Poppins-Medium'}}
          onPress={this.buttonClickListenerPay}>
         Pay Via Paytm
       </Button>
  <Button
         containerStyle={{marginLeft :50,marginRight :50,marginTop :18,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#90BA45'}}
         disabledContainerStyle={{backgroundColor: 'white'}}
         style={{fontSize: 14, color: 'white',fontFamily:'Poppins-Medium'}}
          onPress={this.buttonClickListener}>
         Others
       </Button>
*/}
                    <Button
                        containerStyle={{marginLeft :50,marginRight :50,marginTop :16,padding:15, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#006FA5'}}
                        disabledContainerStyle={{backgroundColor: 'white'}}
                        style={{fontSize: 14, color: 'white',fontWeight :'bold'}}
                        onPress={this.pay}>
                        PAY
                    </Button>

                </View>
                <Text></Text>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor:'black',
        height: APPBAR_HEIGHT,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default Wallet;
