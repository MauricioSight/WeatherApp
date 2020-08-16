import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default props => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={style.conteiner}>
            <View style={style.searchArea}>
                <Icon name='chevron-left' color='#FFF' size={20} style={{ marginLeft: 20, marginRight: 20}}/>
                <TextInput placeholder="Search by City..." style='inputText'
                    onChangeText={desc => setSearchText( desc )}
                    value={searchText} 
                    theme={{ colors: { text: theme } }}/>
            </View>
            <View style={style.searchList}>
                {searchText !== '' ? 
                    <TouchableOpacity style={style.hairLine}>
                        <Text style={style.listText}>{searchText}</Text>
                    </TouchableOpacity> : null
                }                
                <TouchableOpacity>
                    <Text style={style.listText}>My Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const theme = {
    colors: {
            placeholder: 'white', 
            text: 'white', 
            primary: 'white',
            underlineColor: 
            'transparent', 
            background: '#003489'
       }
 }

const style = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: commonStyles.colors.backgroundColor
    }, 
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: commonStyles.colors.backgroundColorGray,
        marginTop: 5,
        marginBottom: 10
    },
    searchList: {
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.backgroundColorGray,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    hairLine: {
        borderBottomColor: 'rgba(255,255,255,0.8)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
    }
})