import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes, Text } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import { Title, PrimaryButton, Stepper, Heading3, SvgIcon, CircularButton, BackgroundCard } from '../.'
import * as iconData from '../../../assets/iconData'

class ItemDetails extends Component {
  constructor(props) {
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)
  }

  state = {
    quantity: 1
  }

  updateQuantity(quantity) {
    this.setState({ quantity })
  }

  render() {
    if (!this.props.item) {
      return null
    }

    const { style, onCloseButtonPress } = this.props
    const { title, price, description } = this.props.item

    return (
      <BackgroundCard style={[styles.container, style]}>
        <CircularButton
          iconData={iconData.cross}
          iconFill="#fff"
          onPress={onCloseButtonPress}
          style={styles.closeButton}
        />

        <SvgIcon
          iconData={iconData.food}
          fill="#fff"
          height={90}
          width={90}
          style={styles.foodIcon}
          opacity={0.3}
        />

        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
          <Title style={styles.price}>{price}</Title>
        </View>
        <Text style={styles.description}>{description}</Text>

        <Heading3 style={styles.quantityHeading}>Quantity</Heading3>
        <Stepper
          minValue={1}
          initialValue={this.state.quantity}
          onValueChange={this.updateQuantity}
          style={styles.quantityStepper}
        />

        <PrimaryButton title="Add to Order" style={styles.addButton} />
      </BackgroundCard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 38,
    paddingVertical: 30,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    top: 30
  },
  foodIcon: {
    marginTop: 68
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 68
  },
  title: {
    fontSize: 32,
    lineHeight: 43
  },
  price: {
    fontSize: 28,
    lineHeight: 38
  },
  description: {
    width: '100%',
    fontFamily: 'NunitoSans-Regular',
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
    marginTop: 10
  },
  quantityHeading: {
    marginTop: 70
  },
  quantityStepper: {
    marginTop: 7
  },
  addButton: {
    marginTop: 30
  }
})

ItemDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string
  }),
  style: ViewPropTypes.style,
  onCloseButtonPress: PropTypes.func
}

ItemDetails.defaultProps = {
  item: null,
  style: null,
  onCloseButtonPress: null
}

export default ItemDetails