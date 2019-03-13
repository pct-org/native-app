import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

import BaseButton from 'components/BaseButton'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Typography from 'components/Typography'

import dimensions from 'modules/dimensions'
import i18n from 'modules/i18n'

const styles = StyleSheet.create({

  seasonSelectorContainer: {
    position    : 'relative',
    marginBottom: dimensions.UNIT * 2,
    marginLeft  : dimensions.UNIT * 2,
    width       : dimensions.EPISODE_CARD_WIDTH,
  },

  subsContainer: {
    width: '100%',
  },

})

export default class SubSelector extends React.Component {

  state = {
    show: false,
  }

  handleToggleShow = () => {
    const { show } = this.state

    this.setState({
      show: !show,
    })
  }

  renderSub = ({ item }) => {
    const { selectSeason } = this.props

    return (
      <BaseButton onPress={() => {
        this.handleToggleShow()

        selectSeason(item)
      }}>
        <Text style={Typography.getTextStyle({
          variant : 'title',
          asObject: true,
          style   : {
            margin   : dimensions.UNIT,
            textAlign: 'center',
            zIndex   : 1000,
          },
        })}>
          {i18n.t('Season {{number}}', { number: item.number })}
        </Text>
      </BaseButton>
    )
  }

  render() {
    const { seasons, activeSeason } = this.props
    const { show } = this.state

    return (
      <React.Fragment>
        <View style={styles.seasonSelectorContainer}>
          <Button onPress={this.handleToggleShow}>
            {i18n.t('Season {{number}}', { number: activeSeason })}
          </Button>
        </View>

        <Modal
          visible={show}
          onRequestClose={this.handleToggleShow}>

          {seasons && (
            <FlatList
              removeClippedSubviews
              style={styles.subsContainer}
              data={seasons}
              numColumns={1}
              initialNumToRender={12}
              windowSize={32}
              renderItem={this.renderSub}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${item.language}-${index}`}
              ListHeaderComponent={() => <View style={{ marginBottom: 100 }} />}
            />
          )}

        </Modal>

      </React.Fragment>
    )
  }

}
