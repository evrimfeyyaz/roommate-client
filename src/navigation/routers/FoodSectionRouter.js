import { StackRouter } from 'react-navigation'
import FoodHomeScreen from '../../screens/FoodHomeScreen/FoodHomeScreen'

const FoodRouter = StackRouter({
  FoodHome: { screen: FoodHomeScreen }
}, {
  initialRouteName: 'FoodHome'
})

export default FoodRouter
