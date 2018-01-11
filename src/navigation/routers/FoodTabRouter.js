import { createNavigator, StackRouter, TabRouter } from 'react-navigation'

import RoomServiceScreen from '../../screens/RoomServiceScreen'
import TabView from '../views/TabView/TabView'
import RestaurantsScreen from '../../screens/RestaurantsScreen'

const FoodTabHomeRouter = TabRouter({
  RoomService: { screen: RoomServiceScreen },
  Restaurants: { screen: RestaurantsScreen }
}, {
  initialRouteName: 'RoomService'
})
const FoodTabHomeNavigator = createNavigator(FoodTabHomeRouter)(TabView)

const FoodTabRouter = StackRouter({
  FoodSectionHome: {
    screen: FoodTabHomeNavigator,
    navigationOptions: {
      hideNavigationBar: true
    }
  }
}, {
  initialRouteName: 'FoodSectionHome'
})

export default FoodTabRouter
