import React from 'react'
import {
  Text
} from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import CenterView from './CenterView'
import Welcome from './Welcome'
import {
  Switch,
  SideMenuItem,
  SideMenu
} from '../../src/components/common'
import {
  PrimaryButton,
  SecondaryButton
} from '../../src/components'

import centerViewStyle from './CenterView/style'
import icons from '../../assets/icons'
import * as theme from '../../theme'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <Switch tint={['#c1b296', '#998263']} />
  ))

storiesOf('Menu', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <SideMenuItem title="Home" id="home" iconSvgPath={icons.test} />
  ))
  .add('item selected', () => (
    <SideMenuItem title="Home" id="home" iconSvgPath={icons.test} isSelected />
  ))
  .add('full menu', () => (
    <SideMenu />
  ))

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('primary', () => (
    <PrimaryButton title="Book a Table" onPress={action('primary-button-press')} />
  ))
  .add('secondary', () => (
    <SecondaryButton title="Wake-Up Alarm" onPress={action('secondary-button-press')} />
  ))

storiesOf('Text', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('title', () => (
    <Text style={theme.textStyles.title}>Page Title</Text>
  ))
  .add('heading', () => (
    <Text style={theme.textStyles.heading}>Heading</Text>
  ))
  .add('heading 2', () => (
    <Text style={theme.textStyles.heading1}>Heading 2</Text>
  ))
  .add('heading 3', () => (
    <Text style={theme.textStyles.heading2}>Heading 3</Text>
  ))