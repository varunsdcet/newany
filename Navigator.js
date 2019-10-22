import { createStackNavigator ,createAppContainer ,createDrawerNavigator,createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import { FlexibleTabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button, Share} from 'react-native';
import Splash from './Splash.js';
import Slider from './Slider.js';
import Login from './Login.js';
import Otp from './Otp.js';
import Register from './Register.js';
import Forgot from './Forgot.js';
import Wallet from './Wallet.js';
import BasicDetail from './BasicDetail.js';
import Nurse from './Nurse.js';
import NurseBooking from './NurseBooking.js';
import NurseTime from './NurseTime.js';
import MedicalService from './MedicalService.js';
import  MedicalServiceBooking from './MedicalServiceBooking.js';
import  SurgicalPackage from './SurgicalPackage.js';
import  OpdHealth from './OpdHealth.js';
import DoctorVisit   from './DoctorVisit.js';
import DoctorVisitDetail from './DoctorVisitDetail.js';
import Emergency from './Emergency.js';
import BookingAppointment from './BookingAppointment.js';
import BookingAppointmentDetail from './BookingAppointmentDetail.js';
import BookingDetailFinal from './BookingDetailFinal.js';
import Confirmation from './Confirmation.js';
import DoctorDetail from './DoctorDetail.js';
import HospitalList from './HospitalList.js';
import HospitalDetail from './HospitalDetail.js';
import AmbulanceBooking from './AmbulanceBooking.js';
import Speciality from './Speciality.js';
import Location from './Location.js';
import Home from './Home.js';
import VideoCall from './VideoCall.js';
import HealthPackege from './HealthPackege.js';
import Instamozo from './Instamozo.js';
import Payment from './Payment.js';
import Thankyou from './Thankyou.js';
import Chat from './Chat.js';
import AppointmentResc from './AppointmentResc.js';
import LabHistoryDetail from './LabHistoryDetail.js';
import FullDetail from './FullDetail.js';
import  Pharmacy from './Pharmacy.js';
import Review from './Review.js';
import AddMember from './AddMember.js';
import ListMember from './ListMember.js';
import AddAddress from './AddAddress.js';
import ListAddress from './ListAddress.js';
import Allergies from './Allergies.js';
import Illness from './Illness.js';
import BasicSurgies from './BasicSurgies.js';
import Department from './Department.js';
import Filter from './Filter.js';
import LabHistory from './LabHistory.js';
import PharmacyOrder  from './PharmacyOrder.js';
import ActiveSubscription from './ActiveSubscription.js';
import  SpecialityFilter from  './SpecialityFilter.js';
import  HospitalFilter from  './HospitalFilter.js';
import  OnlineBooking from  './OnlineBooking.js';
import  OnlineVideo from  './OnlineVideo.js';
import  OfflineBooking from  './OfflineBooking.js';
import  Quation from  './OfflineBooking.js';
import  Insurance from  './Insurance.js';
import  Labtest from  './Labtest.js';
import  Search from  './Search.js';
import  SearchSpeciality from  './SearchSpeciality.js';
import  NewOtp from  './NewOtp.js';
import  MyOtp from  './MyOtp.js';
import  LabMember from  './LabMember.js';
import  Cart from  './Cart.js';
import  ArticleDescription from  './ArticleDescription.js';
import  PackageMember from  './PackageMember.js';
import  LabCartDetail from  './LabCartDetail.js';
import  MedicalEquipment from  './MedicalEquipment.js';
import  Appointment from  './Appointment.js';
import  MedicalDetail from  './MedicalDetail.js';
import EquipmentCart  from  './EquipmentCart.js';
import EquipmentAddress  from  './EquipmentAddress.js';
import History  from  './History.js';
import HistoryDetail  from  './HistoryDetail.js';
import Refer  from  './Refer.js';
import AppointmentDetail  from  './AppointmentDetail.js';
import Notification  from  './Notification.js';
import Emergencys  from  './Emergencys.js';
import PurchaseType  from  './PurchaseType.js';

import Drawer  from  './Drawer.js';
import React, {Component} from 'react';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'black',
                headerTintColor: '#ffffff',
                tintColor: {
                    color: '#ffffff'
                },
                headerTitleStyle: { color: 'black' }
            },

        }),
    }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 250
});

const TabNavigator = createBottomTabNavigator({
        DrawerNavigator: { screen: DrawerNavigator ,
            navigationOptions : {
                title:'Home',
                tabBarLabel: 'Home',
                tabBarOptions: {
                    activeTintColor: '#0592CC',
                    inactiveTintColor: '#808080',
                    style: {
                        backgroundColor: 'white',
                    },
                },
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor, focused }) =>{
                    const image = focused
                        ? require('./bottom/home_active.png')
                        : require('./bottom/home_inactive.png')
                    return(
                        <Image
                            source={image}
                            style={{width:20, height:20}}
                        />

                    )

                }
            }
        },

        Search: { screen: Search,
            navigationOptions : {
                title:'Search',

                tabBarLabel: 'Search',
                tabBarOptions: {
                    activeTintColor: '#0592CC',
                    inactiveTintColor: '#808080',
                    style: {
                        backgroundColor: 'white',
                    },

                },

// Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor,focused }) =>{
                    const image = focused
                        ? require('./bottom/health_active.png')
                        : require('./bottom/health_inactive.png')
                    return(
                        <Image
                            source={image}
                            style={{width:20, height:20}}
                        />

                    )
                }
            }

        },

        BookingAppointment: { screen: BookingAppointment ,
            navigationOptions : {
                title:'Consult Now',
                tabBarLabel: 'Consult Now',
                tabBarOptions: {
                    activeTintColor: '#0592CC',
                    inactiveTintColor: '#808080',
                    style: {
                        backgroundColor: 'white',
                    },

                },

                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor, focused }) =>{
                    const image = focused
                        ? require('./bottom/consult_active.png')
                        : require('./bottom/consult_inactive.png')


                    return(
                        <Image
                            source={image}
                            style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
                        />

                    )
                }
            }
        },


        Notification: { screen: Notification ,
            navigationOptions : {
                title:'Notification',
                tabBarLabel: 'Notification',
                tabBarOptions: {
                    activeTintColor: '#0592CC',
                    inactiveTintColor: '#808080',
                    style: {
                        backgroundColor: 'white',
                    },

                },

                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor, focused }) =>{
                    const image = focused
                        ? require('./bottom/bell_active.png')
                        : require('./bottom/bell_inactive.png')


                    return(
                        <Image
                            source={image}
                            style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
                        />

                    )
                }
            }
        },
        Emergencys: { screen: Emergencys ,
            navigationOptions : {
                title:'Emergency',
                tabBarLabel: 'Emergency',
                tabBarOptions: {
                    activeTintColor: '#0592CC',
                    inactiveTintColor: '#808080',
                    style: {
                        backgroundColor: 'white',
                    },

                },

                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({ tintColor, focused }) =>{
                    const image = focused
                        ? require('./bottom/em_active.png')
                        : require('./bottom/em_inactive.png')


                    return(
                        <Image
                            source={image}
                            style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
                        />

                    )

                }
            }
        },

    },
    {
        tabBarComponent: FlexibleTabBarComponent,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({

            tabBarIcon: () => (
                <Image
                    source={require('./bottom/home_active.png')}
                    style={{width:20, height:20}}
                />
            )
        }),
        tabBarOptions: {
            activeTintColor: '#0592CC',
            showLabel:false,
            inactiveTintColor: 'white',
            inactiveBackgroundColor:'white',
            activeBackgroundColor:'white',
            showIcon:'true'
        },

    }
);

const StackNavigator = createStackNavigator({
        Splash: { screen: Splash },
        TabNavigator: { screen: TabNavigator,
            navigationOptions: ({ navigation }) => ({
                header:null,
            }),
        },
        Refer:{screen:Refer},
        History:{screen:History},
        Home:{screen:Home},
        LabHistory:{screen:LabHistory},
        Chat:{screen:Chat},
        Appointment:{screen:Appointment},
        Slider: { screen: Slider },
        Login: { screen: Login },
        MyOtp: { screen: MyOtp },
       PharmacyOrder:{screen:PharmacyOrder},
        Cart: { screen: Cart },
        HistoryDetail:{screen:HistoryDetail},
        EquipmentCart: { screen: EquipmentCart },
    ArticleDescription:{screen:ArticleDescription},
        PackageMember:{screen:PackageMember},
    LabCartDetail :{screen:LabCartDetail},
    MedicalEquipment:{screen:MedicalEquipment},
    PurchaseType:{screen:PurchaseType},
    LabMember:{ screen: LabMember },
        SpecialityFilter:{screen:SpecialityFilter},
            Department:{screen:Department},
        BasicDetail: { screen: BasicDetail },
        Allergies: { screen: Allergies },
        Illness: { screen: Illness },
        BasicSurgies: { screen: BasicSurgies },
        ListAddress: { screen: ListAddress },
        AddAddress: { screen: AddAddress },
    ActiveSubscription:{screen:ActiveSubscription},
        Labtest: { screen: Labtest },
        MedicalDetail: { screen: MedicalDetail },
        Insurance:{screen:Insurance},
            Filter:{screen:Filter},
        OnlineBooking:{screen:OnlineBooking},
        Search:{screen:Search},
        NewOtp:{screen:NewOtp},
    Pharmacy:{screen:Pharmacy},
        EquipmentAddress:{screen:EquipmentAddress},
    AppointmentResc:{screen:AppointmentResc},
        AppointmentDetail:{screen:AppointmentDetail},
        AmbulanceBooking:{screen:AmbulanceBooking},
        HospitalList:{screen:HospitalList},
            BookingAppointment:{screen:BookingAppointment},
            DoctorVisit:{screen:DoctorVisit},
        OpdHealth:{screen:OpdHealth},
        SurgicalPackage:{screen:SurgicalPackage},
        MedicalService:{screen:MedicalService},
        Nurse: { screen: Nurse },
        OnlineVideo: { screen: OnlineVideo },
    SearchSpeciality:{screen:SearchSpeciality},
    LabHistoryDetail:{screen:LabHistoryDetail},

        Otp: { screen: Otp },
        Register: { screen: Register },
        Forgot: { screen: Forgot },
        OfflineBooking:{screen:OfflineBooking},
        NurseTime:{screen:NurseTime},
        Payment:{screen:Payment},
        Thankyou:{screen:Thankyou},
        Instamozo:{screen:Instamozo},
        NurseBooking:{screen:NurseBooking},
        MedicalServiceBooking:{screen:MedicalServiceBooking},
            DoctorVisitDetail:{screen:DoctorVisitDetail},
            Emergency:{screen:Emergency},
        BookingAppointmentDetail:{screen:BookingAppointmentDetail},
        BookingDetailFinal:{screen:BookingDetailFinal},
        Confirmation:{screen:Confirmation},
        DoctorDetail:{screen:DoctorDetail},
        HospitalDetail:{screen:HospitalDetail},
        Location:{screen:Location},
        HealthPackege:{screen:HealthPackege},
        Speciality:{screen:Speciality},
        Notification:{screen:Notification},
        VideoCall:{screen:VideoCall},

        FullDetail:{screen:FullDetail},
            Review:{screen:Review},
            AddMember:{screen:AddMember},
            ListMember:{screen:ListMember},
            HospitalFilter:{screen:HospitalFilter},
        Quation:{screen:Quation},
        Wallet:{screen:Wallet},
    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw