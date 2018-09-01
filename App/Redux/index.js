import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  userReducer:require('./OnestaReducers/UserReducer').userReducer,
  floorReducer:require('./OnestaReducers/FloorReducer').floorReducer,
  menuitemsReducer:require('./OnestaReducers/MenuItemsReducer').menuItemsReducer,
  OrderReducer:require('./OnestaReducers/OrderReducer').OrderReducer,
  SearchCustomersReducer:require('./OnestaReducers/SearchCustomersReducer').SearchCustomersReducer,
  tableReducer:require('./OnestaReducers/TableReducer').tableReducer,
  DashBoardReducer:require('./OnestaReducers/DashBoardReducer').DashBoardReducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
