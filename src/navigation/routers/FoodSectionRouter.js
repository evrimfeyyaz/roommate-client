import { createNavigator, StackRouter, TabRouter } from 'react-navigation'
import FoodHomeScreen from '../../screens/FoodHomeScreen/FoodHomeScreen'
import HomeScreen from "../../screens/HomeScreen/HomeScreen"
import TabView from "../views/TabView/TabView"

const FoodSectionHomeRouter = TabRouter({
  FoodHome: { screen: FoodHomeScreen },
  FoodHome2: { screen: HomeScreen }
}, {
  initialRouteName: 'FoodHome'
})
const FoodSectionHomeNavigator = createNavigator(FoodSectionHomeRouter)(TabView)

const FoodSectionRouter = StackRouter({
  FoodSectionHome: {
    screen: FoodSectionHomeNavigator,
    navigationOptions: {
      hideNavigationBar: true
    }
  },
  NextInStack: { screen: HomeScreen }
}, {
  initialRouteName: 'FoodSectionHome'
})

export default FoodSectionRouter
