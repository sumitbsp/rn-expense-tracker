import React from 'react'
import { View, Modal } from 'react-native'
import { styles } from './styles'

type modalProps = {
    visibility: boolean,
    children?: React.FC | JSX.Element
}

export default function ModalComponent(props: modalProps) {
    return (
        <Modal visible={props.visibility} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.childrenContainer}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}