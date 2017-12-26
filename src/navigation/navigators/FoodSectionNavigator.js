import { createNavigationContainer, createNavigator } from 'react-navigation'

import SubSectionsView from '../views/TabView/TabView'
import FoodRouter from '../routers/FoodSectionRouter'

export default createNavigationContainer(createNavigator(FoodRouter)(SubSectionsView))