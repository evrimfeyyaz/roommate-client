import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'

import CenterView from './CenterView'
import Welcome from './Welcome'
import {
  Switch,
  SideMenuItem,
  SideMenu,
  Button
} from '../../src/components/common'

import centerViewStyle from './CenterView/style'
import icons from '../../assets/icons'

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
  .add('gradient filled', () => (
    <Button title="Book a Table" onPress={action('button-press')} />
  ))