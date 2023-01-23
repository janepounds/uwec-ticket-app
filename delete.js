import React, {useState, createRef} from 'react';
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

const HomeScreen = (props) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [numberPlates, setNumberPlates] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isSuccess,
    setIsSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!ticketNumber) {
      alert('Please fill Ticket number');
      return;
    }
    if (!vehicleNumber) {
      alert('Please fill Number of Vehicles');
      return;
    }
    if (!numberPlates) {
      alert('Please fill Number Plates');
      return;
    }
    if (!totalAmount) {
      alert('Please fill Total Amount');
      return;
    }
    
    //Show Loader
    setLoading(true);
    var dataToSend = {
        vehicleRegNo: numberPlates,
        numberOfVehicles: numberOfVehicles,
        amount: totalAmount,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://application-mock-server.loca.lt/postticket', {
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
            'Ticket Issue Successful.'
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
          //backgroundColor: '#307ecc',
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
          Ticket Issue Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('VerifyTicket')}>
          <Text style={styles.buttonTextStyle}>Verify Ticket</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
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
        <Text style={styles.header}>CREATE NEW TICKET</Text>
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
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(vehicleNumber) => setVehicleNumber(vehicleNumber)}
              underlineColorAndroid="#f000"
              placeholder="Enter Number of Vehicles"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(numberPlates) =>
                setNumberPlates(numberPlates)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Number Plates"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              autoCapitalize="sentences"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(totalAmount) => setTotalAmount(totalAmount)}
              underlineColorAndroid="#f000"
              placeholder="Enter Total Amount"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
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
            <Text style={styles.buttonTextStyle}>GENERATE</Text>
          </TouchableOpacity>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#006400',
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: '#DFE7F5',
    elevation: 0,  
    marginLeft: 15, 
    marginEnd: 15, 

    header: {
        fontSize: 26,
        marginLeft: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
}
});