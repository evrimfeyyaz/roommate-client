import { createNavigationContainer, createNavigator } from 'react-navigation'

import FoodSectionRouter from '../routers/FoodSectionRouter'
import StackView from '../views/StackView/StackView'

export default createNavigationContainer(createNavigator(FoodSectionRouter)(StackView))