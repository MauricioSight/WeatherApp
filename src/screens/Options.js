import React, { useState } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import commonStyles from '../commonStyles'

const initalState = ''

export default props => {

    function mode() {
        if (props.saved) {
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
                        <Text style={style.buttonText}> Fovorite </Text>
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

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        backgroundColor: commonStyles.colors.backgroundColorGray,
        borderRadius: 25,
        justifyContent: 'space-between',
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
