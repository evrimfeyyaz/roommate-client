// @flow
import React, { Component } from 'react'
import {
  LayoutAnimation,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Heading2 } from '../index'
import colors from '../../config/colors'

/**
 * We need bottom padding to keep the shadows within the container.
 * Android can't draw outside a view's bounds.
 */
const SHADOW_PADDING = 6

type Props = {
  /**
   * Current state of the switch.
   *
   * - `true` is on.
   * - `false` is off.
   */
  value: boolean,
  onTitle: string,
  offTitle: string,
  onPress: Function,
  style?: ViewPropTypes.style,
}

class Switch extends Component<Props> {
  static defaultProps = {
    style: null
  }

  componentWillReceiveProps() {
    // Animate thumb location.
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.scaleXY
    ), null)
  }

  thumbLocationStyle() {
    const { value } = this.props

    // Align left when "on."
    if (value) {
      return { left: 0 }
    }

    // Align right when "off."
    return { right: 0 }
  }

  render() {
    const { style, onPress } = this.props

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.containerWithShadowPadding}>
          <View>
            <LinearGradient
              colors={colors.primaryButtonGradient}
              style={[styles.thumb, this.thumbLocationStyle()]}
            />

            <View style={[styles.container, style]}>
              <Heading2 style={styles.title}>{this.props.onTitle}</Heading2>
              <View style={styles.separator} />
              <Heading2 style={styles.title}>{this.props.offTitle}</Heading2>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  containerWithShadowPadding: {
    paddingBottom: SHADOW_PADDING
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: 'rgba(255, 255, 255, .1)',
    borderWidth: 1,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    // This is a bit of a hacky solution to keep the titles elevated above
    // the thumb. I'm not sure if it would properly work on all devices and
    // Android versions. --evrimfeyyaz
    elevation: 999
  },
  title: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    flex: 1
  },
  separator: {
    width: 60
  },
  thumb: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4,
    borderRadius: 999
  }
})

export default Switch