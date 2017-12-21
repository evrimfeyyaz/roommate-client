import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})

export default styles