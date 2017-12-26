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
    left: 0,
    right: 0,
    height: 3,
    alignItems: 'center'
  },
  activeItemIndicator: {
    flex: 1,
    width: '57%',
    backgroundColor: '#CDB58E'
  }
})