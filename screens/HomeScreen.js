import React, { useState, useEffect, memo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

//components
import { Card, TextInput, Appbar } from 'react-native-paper';

const CREATE_TICKET = 1;
const VERIFY_TICKET = 2;
const FIRST_ELEMENT = `${Date.now()}-ID`;
const today = new Date();


//create custom AppBar
const MainBar = () => {
    return (
        <Appbar.Header>
            <Appbar.Content title="UWEC" />
        </Appbar.Header>
    );
}

const HomeScreen = memo(() => {

    const [actionState, setActionState] = useState(CREATE_TICKET);
    const [ticketNumber, setTicketNumber] = useState("")
    const [numberOfVechiles, setNumberOfVechiles] = useState(0);
    const [boxPlates, setBoxPlates] = useState([FIRST_ELEMENT]);
    const [vechileNumberPlates, setVechileNumberPlates] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [
        isSuccess,
        setIsSuccess
    ] = useState(false);

    const _toggleFunctionality = () => {
        if(actionState === CREATE_TICKET){
            setActionState(VERIFY_TICKET)
        }else {
            setActionState(CREATE_TICKET)
        }
        formBody = formBody.join('&');
        // console.log(dataToSend);
        fetch('https://application-mock-server.loca.lt/postticket', {
            method: 'POST',
            body: dataToSend,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/json;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log( );
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
            </View>
        );
    }

    const removeField = (boxId, position) => {
        if(boxPlates.length < 2){
            Alert.alert("Erase and input information", "You can't delete this");
            return true;
        }
        const newboxPlates = boxPlates.filter((value, index) => index !== position);
        const newVechileNumberPlates = vechileNumberPlates.filter((value, index) => index !== position);
        setBoxPlates(newboxPlates)
        setVechileNumberPlates(newVechileNumberPlates)
    }

    const _addAnotherCar = () => {
        const newBoxViewId = `${Date.now()}-ID`;
        const BatchBox = [...boxPlates, newBoxViewId]
        setBoxPlates(BatchBox)
    }

    const computeTotal = () => {
        //compute the amount
        //then update it automatically
    }

    const submitResponse = () => {
        if(actionState === CREATE_TICKET){
            //call function to create ticket
            alert("creating ticket")
        }else{
            //call function to verify ticket
            alert("verifying ticket")
        }
    }

    const showCardContent = () => {
        if(actionState === CREATE_TICKET){
            return (
                <View>
                    <View style={styles.mainBody}>
                        <TextInput
                            style={styles.inputStyle}
                            mode={"flat"}
                            value={ticketNumber}
                            onChangeText={(ticketNumber) => setTicketNumber(ticketNumber)}
                            label="Enter Ticket number"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                        />

                        <Card style={styles.innerCard}>
                            {(boxPlates.length) > 0 && (boxPlates.map((boxId, index) => {
                                return (
                                    <TextInput
                                        key={(`${boxId}-id-${index}-date-${Date.now()}`).toString()}
                                        style={styles.inputStyle}
                                        mode={"flat"}
                                        value={vechileNumberPlates[index]}
                                        onChangeText={(numberPlate) => { 
                                            let customArray = vechileNumberPlates
                                            vechileNumberPlates[index]= numberPlate
                                            setVechileNumberPlates(vechileNumberPlates)
                                        }}
                                        label="Enter Number Plate"
                                        autoCapitalize="sentences"
                                        returnKeyType="next"
                                        right={<TextInput.Icon onPress={() => removeField(boxId, index)} icon="delete" />}
                                    />
                                );
                            }))}
                        </Card>
                    </View>

                    <TouchableOpacity style={styles.smallBtn} onPress={_addAnotherCar}>
                        <Text style={styles.smallBtnText}>Add Car Number Plate</Text>
                    </TouchableOpacity>

                    <Card style={styles.bottomCard}>
                        <View style={styles.bottomCardContainer}>
                            <Text>Total</Text>
                            <Text>UGX: {totalAmount}</Text>
                        </View>
                    </Card>
                </View>
            );
        }else{
            return (
                <View style={styles.mainBody}>
                    <TextInput
                        style={styles.inputStyle}
                        mode={"flat"}
                        value={ticketNumber}
                        onChangeText={(ticketNumber) => setTicketNumber(ticketNumber)}
                        label="Enter Ticket number"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                    />
                </View>    
            );
        }
    }


    return (
        <SafeAreaView style={styles.wrapper}>
            <MainBar/>
            
            <ScrollView contentContainerStyle={styles.container}>
                
                <TouchableOpacity style={styles.topBtn} onPress={_toggleFunctionality}>
                    <Text style={styles.topBtnText}>{actionState === 1 ? "Verify ticket" : "Create new ticket"}</Text>
                </TouchableOpacity>

                <Card style={styles.containerCard}>
                    <Text style={styles.header}>{actionState === 1 ? "Create Ticket": "Verify Ticket"}</Text>

                    <View style={styles.dateView}>
                        <Text style={styles.dateText}>Date: <Text style={{color: '#aaa', fontWeight: '300',}}>{today.toLocaleDateString()}</Text></Text>
                    </View>

                    {showCardContent()}

                    <TouchableOpacity style={styles.mainBtn} onPress={submitResponse}>
                        <Text style={styles.mainBtnText}>Submit</Text>
                    </TouchableOpacity>
                    
                </Card>

            </ScrollView>
        </SafeAreaView>
    )
});

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#eee',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 30,
        //justifyContent: 'center', 
    },
    topBtn: {
        alignSelf: 'flex-end',
        backgroundColor: '#006400',
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 5,
    },
    topBtnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    containerCard: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        fontWeight: '500',  
    },
    dateView: {
        marginVertical: 5,
    },
    dateText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500', 
    },
    inputStyle: {
        height: 50,
        marginBottom: 14,
    },
    smallBtn: {
        backgroundColor: 'red',
        alignSelf: 'flex-start',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },
    smallBtnText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center', 
    },
    innerCard: {
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 5,
    },
    bottomCard: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    bottomCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
    },
    mainBtn: {
        backgroundColor: 'blue',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 5,
        marginBottom: 10,
    },
    mainBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500', 
    },
});