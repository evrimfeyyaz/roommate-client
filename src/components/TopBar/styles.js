import { StyleSheet } from 'react-native'

import * as theme from '../../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: StyleSheet.flatten([
    theme.textStyles.title,
    {
      flex: 1
    }
  ])
})

export default styles