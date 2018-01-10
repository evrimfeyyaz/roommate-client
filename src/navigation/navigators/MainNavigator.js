import { createNavigationContainer, createNavigator } from 'react-navigation'
import MainNavigationView from '../views/MainNavigationView'
import MainRouter from '../routers/MainRouter'

export default createNavigationContainer(createNavigator(MainRouter)(MainNavigationView))