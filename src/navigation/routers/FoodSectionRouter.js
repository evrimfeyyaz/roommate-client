import { StackRouter, TabRouter } from 'react-navigation'
import FoodHomeScreen from '../../screens/FoodHomeScreen/FoodHomeScreen'
import HomeScreen from "../../screens/HomeScreen/HomeScreen"

const FoodRouter = TabRouter({
  FoodHome: { screen: FoodHomeScreen },
  FoodHome2: { screen: HomeScreen }
}, {
  initialRouteName: 'FoodHome'
})

export default FoodRouter
