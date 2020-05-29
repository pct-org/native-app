import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native'

import TextButton from 'components/TextButton'
import Modal from 'components/Modal'

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    alignItems: 'center',
  },

})

export const SubSelector = ({ visible, subtitles, onRequestClose, onSubSelect }) => (
  <Modal
    onRequestClose={onRequestClose}
    visible={visible}>

    <View style={styles.container}>
      {subtitles.map((subtitle) => (
        <TextButton
          key={subtitle.code}
          component={TouchableNativeFeedback}
          color={'primary'}
          onPress={() => {
            onSubSelect(subtitle.code)

            onRequestClose()
          }}>
          {subtitle.language}
        </TextButton>
      ))}
    </View>

  </Modal>
)

SubSelector.propTypes = {
  visible: PropTypes.bool,
  subtitles: PropTypes.array,
  onRequestClose: PropTypes.func.isRequired,
  onSubSelect: PropTypes.func.isRequired,
}

SubSelector.defaultProps = {
  visible: false,
  subtitles: [],
}

export default SubSelector
