import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: 200,
    borderRadius: 10,
    padding: 15,
    paddingTop: 135,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4,
    overflow: 'hidden'
  },
  title: {
    marginBottom: 3
  },
  description: {
    marginBottom: 5,
    flex: 1
  },
  price: {
    textAlign: 'right'
  },
  image: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  gradientOverlay: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})

export default styles