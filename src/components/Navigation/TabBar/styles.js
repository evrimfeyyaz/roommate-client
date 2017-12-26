import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 1,
    borderColor: 'rgba(151, 151, 151, 0.1)',
    borderBottomWidth: 1
  },
  activeItemIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 34,
    right: 34,
    height: 3,
    alignItems: 'stretch'
  },
  activeItemIndicator: {
    flex: 1,
    backgroundColor: '#CDB58E'
  }
})