import { createNavigationContainer, createNavigator } from 'react-navigation'

import SubSectionsView from '../views/SubSectionsView/SubSectionsView'
import FoodRouter from '../routers/FoodSectionRouter'

export default createNavigationContainer(createNavigator(FoodRouter)(SubSectionsView))