import React, { useState } from 'react'
import { 
    Modal, 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TouchableOpacity,
    Alert
} from 'react-native'

import commonStyles from '../commonStyles'

const initalState = '' // Estado inicial

/**
 * Componente Modal para o usuário inserir o nome a qual item deve ser salvo
 */
export default props => {
    const [name, setName] = useState(initalState)  // Estado com o nome inserido pelo usuário
    
    /**
     * Função para retornar o nome para o componente pai 
     */
    function save () {
        if (!name.trim()) {
            Alert.alert('Invalid data', 'Insert the location name')
            return
        }
        props.onSave(name)
    }

    return (
        <Modal visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={style.offset}/>
            </TouchableWithoutFeedback>
            <View style={style.container}>
                <Text style={style.title}>Location name</Text>
                <TextInput placeholder='Insert the location name...' style={style.input}
                    onChangeText={desc => setName( desc )}
                    value={name} />
                <View style={style.buttonView}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={style.button}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save}>
                        <Text style={style.button}>Save</Text>
                    </TouchableOpacity>
                </View> 
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={style.offset}/>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

/**
 * Estilos dos compoentes inserido nesse componente
 */
const style = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.colors.backgroundColorGray,
        justifyContent: 'space-between',
        borderRadius: 20
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        color: commonStyles.colors.mainText,
        marginLeft: 25,
        marginTop: 30
    },
    input: {
        alignSelf: 'center',
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.mainText,
    }
})
