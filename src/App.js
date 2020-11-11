import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Main from './screens/Main'
import ShowPost from './screens/ShowPost'
import AddPost from './screens/AddPost'

import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware) 

const App = () => {
  return (
    <SafeAreaView style={{flex:1}} edges={['right', 'top', 'left']} >
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="ShowPost" component={ShowPost} />
            <Stack.Screen name="AddPost" component={AddPost} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};


export default App;
