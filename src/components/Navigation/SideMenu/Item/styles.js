import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: 'center'
  },
  selectedIndicator: {
    backgroundColor: '#CDB58E',
    width: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  title: {
    marginTop: 6,
    fontSize: 9,
    color: 'silver'
  },
  selectedTitle: {
    color: '#CDB58E'
  }
})