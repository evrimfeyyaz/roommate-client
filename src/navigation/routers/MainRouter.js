import { TabRouter } from 'react-navigation'

import HomeScreen from '../../screens/HomeScreen'
import FoodTabNavigator from '../navigators/FoodTabNavigator'

const MainRouter = TabRouter({
  Home: { screen: HomeScreen },
  Food: {
    screen: FoodTabNavigator,
    navigationOptions: {
      title: 'Food'
    }
  }
}, {
  initialRouteName: 'Home'
})

export default MainRouter
