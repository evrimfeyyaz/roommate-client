import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4,
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
  }
})

export default style