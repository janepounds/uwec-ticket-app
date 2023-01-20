import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';

import Loader from '../components/loader';

const VerifyTicket = (props) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [errortext, setErrortext] = useState('');
    const [loading, setLoading] = useState(false);
    const [
        isSuccess,
        setIsSuccess
    ] = useState(false);


    const handleSubmitButton = () => {
        setErrortext('');
        if (!ticketNumber) {
            alert('Please fill Ticket number');
            return;
        }

        //Show Loader
        setLoading(true);
        var dataToSend = {
            ticketNumber: ticketNumber,
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://application-mock-server.loca.lt/verifyticket', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsSuccess(true);
                    console.log(
                        'Ticket Verified Successfully.'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../images/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Ticket Verified Successful
                </Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#eee', }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../images/logo.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <Card style={styles.ticketCard}>
                        <View style={styles.container}>
                            <Text style={styles.header}>VERIFY TICKET</Text>
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(ticketNumber) => setTicketNumber(ticketNumber)}
                                underlineColorAndroid="#f000"
                                placeholder="Enter Ticket number"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current && emailInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitButton}>
                            <Text style={styles.buttonTextStyle}>VERIFY</Text>
                        </TouchableOpacity>
                    </Card>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default VerifyTicket;

const styles = StyleSheet.create({
    SectionStyle: {
        //flexDirection: 'row',
        //height: 50,
        //marginTop: 20,
        //marginLeft: 35,
        //marginRight: 35,
        //margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#006400',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        color: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#006400',
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 16,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    ticketCard: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 0,
        marginLeft: 15,
        marginEnd: 15,
    },
    header: {
        fontSize: 18,
        //marginLeft: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    container: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBtn: {
        alignSelf: 'flex-end',
        backgroundColor: '#006400',
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 5,
        marginHorizontal: 12,
    },
    topBtnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
});