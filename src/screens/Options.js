import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'

/**
 * Componente Modal mostra opções relacionadas ao compoenente pai.
 */
export default props => {

    /**
     * Configura o que as opções do componente pai possui.
     * Podendo ser: Favorito, para favoritar o item, ou Editar e Deletar um item já salvo.
     * @returns {JSX} referente ao botões
     */
    function mode() {
        if (props.mode) {
            return (
                <>
                    <TouchableOpacity onPress={() => props.onEdit()}>
                        <View>
                            <Text style={style.buttonText}> Edit </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onDelete()}>
                        <View>
                            <Text style={style.buttonText}> Delete </Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => props.onSave('')}>
                    <View>
                        <Text style={style.buttonText}> Favorite </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <Modal visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='fade' transparent={true}>
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                    <View style={style.buttons}>
                        {mode()}
                    </View>
                </View >
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            </View >
        </Modal >
    )
}

/**
 * Estilos dos compoentes inserido nesse componente.
 */
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba( 0, 0, 0, 1)',
        borderRadius: 25,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText,
        paddingBottom: 10
    }
})
