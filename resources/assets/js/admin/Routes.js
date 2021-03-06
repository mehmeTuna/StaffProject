import React from 'react'
import {Switch, Route} from 'react-router-dom'

import StaffPage from './src/pages/Staff'
import Profile from './src/pages/Profile'
import Main from './src/Main'
import StaffCreate from './src/pages/StaffCreate'
import ExperienceCreate from './src/pages/ExperienceCreate'
import ExperienceList from './src/pages/ExperienceList'
import KioskCreate from './src/pages/KioskCreate'
import KioskList from './src/pages/KioskList'
import StaffDetail from './src/pages/StaffDetail'

const RouteWithLayout = props => {
  const {component: Component, ...rest} = props
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Main>
          <Component {...matchProps} />
        </Main>
      )}
    />
  )
}

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout component={StaffPage} exact path="/" />
      <RouteWithLayout component={StaffPage} exact path="/:businessName" />
      <RouteWithLayout
        component={StaffPage}
        exact
        path="/:businessName/staff/list"
      />
      <RouteWithLayout
        component={Profile}
        exact
        path="/:businessName/profile"
      />
      <RouteWithLayout
        component={StaffCreate}
        exact
        path="/:businessName/staff/create"
      />
      <RouteWithLayout
        component={ExperienceCreate}
        exact
        path="/:businessName/experience/create"
      />
      <RouteWithLayout
        component={ExperienceList}
        exact
        path="/:businessName/experience/list"
      />
      <RouteWithLayout
        component={KioskCreate}
        exact
        path="/:businessName/kiosk/create"
      />
      <RouteWithLayout
        component={KioskList}
        exact
        path="/:businessName/kiosk/list"
      />
      <RouteWithLayout
        component={StaffDetail}
        exact
        path="/:businessName/staff/list/:staffId"
      />
    </Switch>
  )
}

export default Routes
