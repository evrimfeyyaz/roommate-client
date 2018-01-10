import { TabRouter } from 'react-navigation'

import HomeScreen from '../../screens/HomeScreen'
import FoodTabNavigator from '../navigators/FoodTabNavigator'
import * as icons from '../../../assets/iconData'

const MainRouter = TabRouter({
  Home: { screen: HomeScreen },
  Food: {
    screen: FoodTabNavigator,
    navigationOptions: {
      title: 'Food',
      iconData: icons.food
    }
  }
}, {
  initialRouteName: 'Home'
})

export default MainRouter
