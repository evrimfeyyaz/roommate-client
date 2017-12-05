import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // This needs to be added so that the title won't fall behind the thumb.
    elevation: 999
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 999
  },
  borderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 999
  }
})

export default style