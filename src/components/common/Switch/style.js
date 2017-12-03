import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  borderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderColor: 'rgba(255, 255, 255, .1)',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // This needs to be added so that the title won't fall behind the thumb.
    elevation: 999
  },
  thumb: {
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4
  }
})