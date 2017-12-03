import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'
import Welcome from './Welcome'
import { Switch } from '../../src/components/common'

import centerViewStyle from './CenterView/style'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <Switch tint={['#c1b296', '#998263']} />
  ))
