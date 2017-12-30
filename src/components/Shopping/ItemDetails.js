import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Title, PrimaryButton, Stepper, Heading3 } from '../.'

class ItemDetails extends Component {
  state = {
    cartItem: {
      item: this.props.item,
      quantity: 1
    }
  }

  constructor(props) {
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)
  }

  updateQuantity(quantity) {
    this.setState({ quantity })
  }

  render() {
    const { style } = this.props
    const { title, price, description } = this.props.item

    return (
      <View style={[styles.container, style]}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 38,
    paddingVertical: 30,
    alignItems: 'center'
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginTop: 15
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
  }).isRequired,
  style: ViewPropTypes.style
}

ItemDetails.defaultProps = {
  style: null
}

export default ItemDetails