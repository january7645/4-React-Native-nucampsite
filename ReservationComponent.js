import React, { Component } from 'react';
import { Text, View, StyleSheet,
    Picker, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';





class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campers: 1,
            hikeIn: false,
            date: '',
            // showCalendar: false,
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    resetForm() {
        this.setState({
             campers: 1,
             hikeIn: false,
             date: new Date(),
             showCalendar: false, 
             showModal: false
         });
     }

    handleReservation() {
//        console.log(JSON.stringify(this.state));

    //    let message = `Number of Campers: ${this.state.campers}
    //                        \nHike-in? ${this.state.hikeIn}
    //                    \nDate: ${this.state.date}`;

                        Alert.alert(
                            'Begin Search?' , 
                            `Number of Campers: ${this.state.campers}
                        \nHike-in? ${this.state.hikeIn}
                        \nDate: ${this.state.date}`,
//                                message,
                                [
                                    {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => 
//                                    {
//                                        console.log('Reservation Search Canceled');
                                        this.resetForm()
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
//                                        this.presentLocalNotification(this.state.date);
                                        this.resetForm() }
                                }
                            ],
                            { cancelable: false }
//                            ' Number of Campers ' + this.state.campers.toString(), 'Hike-In ' + this.state.date.toString(), //
                            );
                        }

    async obtainNotificationPermission() {
        const permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            const permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
            return permission;
        }
        return permission;
    }

    async presentLocalNotification(date) {
        const permission = await this.obtainNotificationPermission();
        if (permission.status --- 'granted') {
            this.obtainNotificationPermission.presentLocalNotificationAsync({
                title: 'Your Campsite Reservation Search',
                body: 'Search for ' + date + ' requested '
            });
        }
    }

    render() {
        return (
                <Animatable.View animation='zoomIn' duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}> Number of Campers </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.campers}
                            onValueChange={itemValue => this.setState({campers: itemValue})}
                            >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />   
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />                     
                            </Picker>
                    </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.hikeIn}
                            trackColor={{ture: '#5637DD', false: null}}
                            onValueChange={value => this.setState({hikeIn: value})}
                            />
                    </View>
                <View style={styles.formRow}>
                    {/*<Button 
                        onPress={() =>
                        this.setState({showCalendar: !this.state.showCalendar})
                        }
                        title={this.state.date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    /> */}
                    <Text style={styles.formLabel}> Date </Text>
                    <DateTimePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}} 
                          />
                </View>
                <View style={styles.formRow}>
                    <Button                        
                        onPress={() => this.handleReservation()}      
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
                </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;