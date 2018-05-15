import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

import CustomerComponent from "./Components/Container/CustomerComponent";
import FloorsAndTables from "./Components/Container/FloorsAndTables";
import "expo";

const App = () => {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Customer"
            component={CustomerComponent}
            title="Customer Info"
            initial
          />
          <Scene
            key="Floor"
            component={FloorsAndTables}
            title="Floor Schema"
          />
        </Scene>
      </Router>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;