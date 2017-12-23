import { TabRouter } from 'react-navigation'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import FoodScreen from '../../screens/FoodScreen/FoodScreen'

const MainRouter = TabRouter({
  Home: { screen: HomeScreen },
  Food: { screen: FoodScreen }
}, {
  initialRouteName: 'Home'
})

export default MainRouter
