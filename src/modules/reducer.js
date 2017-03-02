import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'
import uiReducer, { moduleName as uiPath } from 'modules/ui'
import entitiesReducer, { moduleName as entitiesPath } from 'modules/entities'
import dataReducer, { moduleName as dataPath } from 'modules/data'
import communication, {init as initCommunication} from 'modules/communication'
import paginationReducer, { moduleName as paginationPath } from 'modules/pagination'
import configReducer, { moduleName as configPath } from 'modules/config'

export const initializers = {
  communication: initCommunication
}

const rootReducer = combineReducers({
  [dataPath]: dataReducer,
  [entitiesPath]: entitiesReducer,
  [paginationPath]: paginationReducer,
  [uiPath]: uiReducer,
  [configPath]: configReducer,
  communication,
  routing,
  form: formReducer
})

export default rootReducer
