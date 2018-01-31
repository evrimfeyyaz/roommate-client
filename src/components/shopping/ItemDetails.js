// @flow
import React, { Component, Fragment } from 'react'
import { View, StyleSheet, ViewPropTypes, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

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
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        quantity
      }
    })
  }

  onAddButtonPress = () => {
    this.props.onAddButtonPress(this.state.cartItem)
  }

  getImageUrl() {
    // TODO: This should depend on the device's pixel density.
    // TODO: This should be in a utility file.
    return this.props.item.image2x
  }

  renderImage() {
    if (this.getImageUrl() != null) {
      return (
        <Fragment>
          <FastImage
            style={styles.image}
            source={{ uri: this.getImageUrl() }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <LinearGradient
            style={styles.gradientOverlay}
            colors={colors.itemDetailImageGradientColors}
            locations={[0, 0.9, 1]}
          />
        </Fragment>
      )
    }

    return (
      <SvgIcon
        iconData={icons.food}
        fill={colors.primaryIcon}
        height={90}
        width={90}
        style={styles.foodIcon}
        opacity={0.3}
      />
    )
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
        <ScrollView centerContent>
          <View style={styles.imageContainer}>
            {this.renderImage()}
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{title}</Title>
              <Title style={styles.price}>{price}</Title>
            </View>
            <Body style={styles.description}>{description}</Body>

            <View style={styles.quantityContainer}>
              <Heading3 style={styles.quantityHeading}>Quantity</Heading3>
              <Stepper
                value={quantity}
                minValue={1}
                onButtonPress={this.onQuantityStepperPress}
                style={styles.quantityStepper}
              />
            </View>

            <PrimaryButton title="Add to Order" onPress={this.onAddButtonPress} style={styles.addButton} />
          </View>
        </ScrollView>

        <CircularButton
          iconData={icons.cross}
          onPress={onCloseButtonPress}
          style={styles.closeButton}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    top: 30,
    borderColor: colors.circularButtonBorderSolid
  },
  foodIcon: {
    marginTop: 120
  },
  informationContainer: {
    paddingHorizontal: 38,
    paddingVertical: 30
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 260
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
    marginTop: 10,
    opacity: 0.7
  },
  quantityHeading: {
    marginTop: 70
  },
  quantityStepper: {
    marginTop: 7,
    marginBottom: 30
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    alignItems: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    bottom: 40
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400
  },
  addButton: {
    alignSelf: 'center'
  },
  quantityContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default ItemDetails