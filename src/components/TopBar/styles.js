import { StyleSheet } from 'react-native'

import * as theme from '../../../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30
  },
  title: StyleSheet.flatten([
    theme.textStyles.title,
    {
      flex: 1
    }
  ])
})

export default styles