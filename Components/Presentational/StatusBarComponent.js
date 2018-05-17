import React from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';


export default class StatusBarComp extends React.Component {
  render() {
      const height = StatusBar.currentHeight;
        return(
            <View style={{height}}>
                <StatusBar {...this.props} />
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
   
  },
});
