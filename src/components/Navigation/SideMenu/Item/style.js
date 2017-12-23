import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  selectedIndicator: {
    backgroundColor: '#d2b994',
    width: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  title: {
    marginTop: 10,
    fontSize: 10,
    color: 'silver'
  },
  selectedTitle: {
    color: '#d2b994'
  }
})