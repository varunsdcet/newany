import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';

const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
class Notification extends Component<Props> {

static navigationOptions = {
          title: 'Notifications',
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



componentDidMount(){



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

  render() {



    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

           size={50} color="#E9128B" />

        </View>
      )
    }
    return (

      <View style={styles.container}>



    <KeyboardAwareScrollView style={styles.container2}
    keyboardShouldPersistTaps='always'>
{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'Poppins-Regular'}}>No new notifications!</Text>
  )}

  {this.state.notificationslist.length !=0 &&(
      <FlatList style= {{backgroundColor:'#f2f2f2',flexGrow:0, marginBottom:20}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />

    )}



     </KeyboardAwareScrollView>
     </View>
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

export default Notification;
