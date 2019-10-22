import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image, Alert ,AsyncStorage,Dimensions ,TouchableHighlight} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import VoipPushNotification from 'react-native-voip-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationPopup from 'react-native-push-notification-popup';
const renderCustomPopup = ( title, body ) => {

    return(
    <View style = {{backgroundColor:'red',height:100,width:200}}>
        <Text>{title}</Text>
        <Text>{body}</Text>
    </View>
)};
class Button extends React.Component<$FlowFixMeProps> {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                style={styles.button}
                onPress={this.props.onPress}>
                <Text style={styles.buttonLabel}>{this.props.label}</Text>
            </TouchableHighlight>
        );
    }
}

type Props = {};
type State = {
    permissions: Object,
};
export default class Splash extends  Component<Props, State>  {


           state = {
               permissions: {},
           }


    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }





    UNSAFE_componentWillMount() {



        VoipPushNotification.requestPermissions(); // required

        VoipPushNotification.addEventListener('register', (token) => {
            GLOBAL.voip = token.toString()

            // send token to your apn provider server
        });

        VoipPushNotification.addEventListener('notification', (notification) => {
            // register your VoIP client, show local notification, etc.
            // e.g.

        //    alert(JSON.stringify(notification))
           // this.doRegister();
           //  this.popup.show({
           //      onPress: function() {console.log('Pressed')},
           //
           //      appTitle: 'Some App',
           //      timeText: 'Now',
           //      title: 'Hello World',
           //      body: 'This is a sample message.\nTesting emoji 😀',
           //      slideOutTime: 500000
           //  });
            /* there is a boolean constant exported by this module called
             *
             * wakeupByPush
             *
             * you can use this constant to distinguish the app is launched
             * by VoIP push notification or not
             *
             * e.g.
             */
            if (VoipPushNotification.wakeupByPush) {
                // do something...

                // remember to set this static variable to false
                // since the constant are exported only at initialization time
                // and it will keep the same in the whole app
                VoipPushNotification.wakeupByPush = true;
            }

            /**
             * Local Notification Payload
             *
             * - `alertBody` : The message displayed in the notification alert.
             * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
             * - `soundName` : The sound played when the notification is fired (optional).
             * - `category`  : The category of this notification, required for actionable notifications (optional).
             * - `userInfo`  : An optional object containing additional notification data.
             */
            VoipPushNotification.presentLocalNotification({
                alertBody: "hello! " + notification.getMessage()
            });
        });

        PushNotificationIOS.addEventListener('register', this._onRegistered);
        PushNotificationIOS.addEventListener(
            'registrationError',
            this._onRegistrationError,
        );
        PushNotificationIOS.addEventListener(
            'notification',
            this._onRemoteNotification,
        );
        PushNotificationIOS.addEventListener(
            'localNotification',
            this._onLocalNotification,
        );
        PushNotificationIOS.addEventListener('notification', (notification) => {
            alert(JSON.stringify(notification))

        })

        PushNotificationIOS.requestPermissions();
                this.timeoutCheck = setTimeout(() => {
   this.proceed();
   }, 1000);

    }




    componentWillUnmount() {
        // PushNotificationIOS.removeEventListener('register', this._onRegistered);
        // PushNotificationIOS.removeEventListener(
        //     'registrationError',
        //     this._onRegistrationError,
        // );
        // PushNotificationIOS.removeEventListener(
        //     'notification',
        //     this._onRemoteNotification,
        // );
        // PushNotificationIOS.removeEventListener(
        //     'localNotification',
        //     this._onLocalNotification,
        // );
    }



//     componentDidMount() {
//         this.timeoutCheck = setTimeout(() => {
//    this.proceed();
//    }, 1000);
// }
    _sendNotification() {
        require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
            remote: true,
            aps: {
                alert: 'Sample notification',
                badge: '+1',
                sound: 'default',
                category: 'REACT_NATIVE',
                'content-available': 1,
            },
        });
    }

    _sendLocalNotification() {
        PushNotificationIOS.presentLocalNotification({
            alertBody: 'Sample local notification',
            applicationIconBadgeNumber: 1
        });
    }

    _onRegistered(deviceToken) {


        GLOBAL.deviceToken = deviceToken.toString()

    }

    _onRegistrationError(error) {
        Alert.alert(
            'Failed To Register For Remote Push',
            `Error (${error.code}): ${error.message}`,
            [
                {
                    text: 'Dismiss',
                    onPress: null,
                },
            ],
        );
    }

    _onRemoteNotification(notification) {



        const result = `Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`;

        Alert.alert('Push Notification Received', result, [
            {
                text: 'Dismiss',
                onPress: null,
            },
        ]);
    }

    _onLocalNotification(notification) {
        Alert.alert(
            'Local Notification Received',
            'Alert message: ' + notification.getMessage(),
            [
                {
                    text: 'Dismiss',
                    onPress: null,
                },
            ],
        );
    }

    _showPermissions() {
        PushNotificationIOS.checkPermissions(permissions => {
            this.setState({permissions});
        });
    }
proceed=()=>{

        var value =  AsyncStorage.getItem('userID');
    value.then((e)=> {
        if (e == '' || e == null ){
            this.props.navigation.replace('Slider')
        }else {
            GLOBAL.user_id = e

            var values =  AsyncStorage.getItem('name');
            values.then((f)=> {
                GLOBAL.myname = f

            })

            var valuess =  AsyncStorage.getItem('email');
            valuess.then((f)=> {
                GLOBAL.myemail = f

            })
            var values2 =  AsyncStorage.getItem('mobile');
            values2.then((f)=> {
                GLOBAL.mymobile = f
            })


          this.props.navigation.replace('TabNavigator')
        }
    })

}
    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <NotificationPopup
                    ref={ref => this.popup = ref}
                    renderPopupContent={()=>renderCustomPopup("hi","jjjd")} />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'blue',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
