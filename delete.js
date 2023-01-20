import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FAB, Appbar, Provider as PaperProvider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getTickets } from '../redux/actions';
import { Card, LikeButton, Title, Headline, Button, Searchbar } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';

const HomeScreen = ({ props }) => {
    const { tickets } = useSelector(state => state.ticketsReducer);
    const dispatch = useDispatch();
    const fetchTickets = () => dispatch(getTickets());
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        fetchTickets();
    }, [])

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.header}>Create New Ticket</Text>
                <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('VerifyTicket')}>
                    <Text style={styles.button}>Verify Ticket</Text>
                </TouchableOpacity>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            name: 'ticketNo',
                            type: 'text',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Ticket Number is required',
                                },
                            },
                            textInputProps: {
                                label: 'Ticket Number',
                            },
                        },
                        {
                            name: 'vehicleNo',
                            type: 'text',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Number of Vehicles is required',
                                },
                            },
                            textInputProps: {
                                label: 'Number Of Vehicles',
                            },
                        },
                        {
                            type: 'text',
                            name: 'plateNo',
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Plate Number is required',
                                },
                            },
                            textInputProps: {
                                label: 'Plate Numbers',
                            },
                        },
                        {
                            type: 'text',
                            name: 'totalAmount',
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Total Amount is required',
                                },
                            },
                            textInputProps: {
                                label: 'Total',
                            },
                        },
                    ]}
                />
                <Button
                    style={styles.button}
                    mode={'contained'}
                    onPress={handleSubmit((data: any) => {
                        console.log('form data', data);
                    })}>
                    Generate
                </Button>

                <FAB
                    style={styles.fabStyle}
                    animated={true}
                    color='white'
                    disabled={false}
                    visible={true}
                    loading={false}
                    onLongPress={() => navigation.navigate('NewTicket')}
                    small
                    icon="plus"
                    //label="Veify Ticket"
                    onPress={() => navigation.navigate('NewTicket')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#eee',
        paddingVertical: 20,
    },
    header: {
        fontSize: 26,
        marginLeft: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    flatListStyle: {
        flexGrow: 1,
        paddingHorizontal: 20,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    ticketCard: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 16,
        borderRadius: 5,
        backgroundColor: '#DFE7F5',
        elevation: 0,
    },
    ticketWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    fabStyle: {
        position: 'absolute',
        right: 20,
        top: 10,
        backgroundColor: '#10ac84',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#10ac84',
        padding: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 16,
        borderRadius: 5,
    },
    search: {
        //paddingHorizontal: 20,
        //marginLeft: 10
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 30

    },

    containerStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        flex: 1,
        padding: 15,

    },
    headingStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
    },
});