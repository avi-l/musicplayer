import { View, Text, Modal } from 'react-native'
import React, {useState} from 'react'
import FilePicker from '../../app/component/FilePicker'

const FilePickerModal = ({showModal, setShowModal}) => {
        return (
            <View >
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setShowModal(!showModal);
              }}
            >
              <FilePicker setShowModal={setShowModal}/>
              </Modal>
          </View> 
        )
    
}

export default FilePickerModal