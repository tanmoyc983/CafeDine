import React from 'react'
import { BackHandler, Platform,Alert } from 'react-native'
import { addNavigationHelpers,NavigationActions } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

class ReduxNavigation extends React.Component {
  componentWillMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'CaptainDashboardScreen')) {
          Alert.alert('Exit App','Do you want to exit?',
        [{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {BackHandler.exitApp()}}],
        { cancelable: false });
        return true;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    return <AppNavigation navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener: createReduxBoundAddListener('root') })} />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
