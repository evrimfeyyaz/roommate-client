import { createNavigationContainer, createNavigator } from 'react-navigation'

import FoodTabRouter from '../routers/FoodTabRouter'
import StackView from '../views/StackView/StackView'

export default createNavigationContainer(createNavigator(FoodTabRouter)(StackView))