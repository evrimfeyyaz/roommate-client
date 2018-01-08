// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

import { Title, PrimaryButton, Stepper, Heading3, Body, SvgIcon, CircularButton, Card } from '../.'
import * as icons from '../../../assets/iconData'
import type { ShoppingCartItem, ShoppingItem } from '../../types/shopping'
import colors from '../../config/colors'

type Props = {
  item: ShoppingItem,
  style?: ?ViewPropTypes.style,
  onCloseButtonPress: () => void,
  onAddButtonPress: (ShoppingCartItem) => void
}

type State = {
  cartItem: ShoppingCartItem
}

class ItemDetails extends Component<Props, State> {
  static defaultProps = {
    style: null
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      cartItem: {
        item: this.props.item,
        quantity: 1
      }
    }
  }

  onQuantityStepperPress = (_: number, quantity: number) => {
    this.setState({
      cartItem: { quantity }
    })
  }

  onAddButtonPress = () => {
    this.props.onAddButtonPress(this.state.cartItem)
  }

  render() {
    const {
      style,
      onCloseButtonPress,
      item: { title, price, description }
    } = this.props
    const { cartItem: { quantity } } = this.state

    return (
      <Card style={[styles.container, style]}>
        <CircularButton
          iconData={icons.cross}
          onPress={onCloseButtonPress}
          style={styles.closeButton}
        />

        <SvgIcon
          iconData={icons.food}
          fill={colors.primaryIconColor}
          height={90}
          width={90}
          style={styles.foodIcon}
          opacity={0.3}
        />

        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
          <Title style={styles.price}>{price}</Title>
        </View>
        <Body style={styles.description}>{description}</Body>

        <Heading3 style={styles.quantityHeading}>Quantity</Heading3>
        <Stepper
          value={quantity}
          minValue={1}
          onButtonPress={this.onQuantityStepperPress}
          style={styles.quantityStepper}
        />

        <PrimaryButton title="Add to Order" onPress={this.onAddButtonPress} />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 38,
    paddingVertical: 30,
    alignItems: 'center'
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
    marginTop: 10
  },
  quantityHeading: {
    marginTop: 70
  },
  quantityStepper: {
    marginTop: 7,
    marginBottom: 30
  }
})

export default ItemDetails