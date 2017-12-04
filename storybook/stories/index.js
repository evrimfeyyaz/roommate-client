import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'
import Welcome from './Welcome'
import {
  Switch,
  SideMenuItem,
  SideMenu
} from '../../src/components/common'

import centerViewStyle from './CenterView/style'
import icons from '../../assets/icons'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <Switch tint={['#c1b296', '#998263']} />
  ))

storiesOf('Menu', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <SideMenuItem title="Home" iconSvgPath={icons.test} />
  ))
  .add('item selected', () => (
    <SideMenuItem title="Home" iconSvgPath={icons.test} isSelected />
  ))
  .add('full menu', () => (
    <SideMenu />
  ))