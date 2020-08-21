import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LocationList from './screens/LocationList'
import SearchLocation from './screens/SearchLocation'
import WatherView from './screens/WeatherView'

const Stack = createStackNavigator()

/**
 * Componente inicial de navegação entre as telas do aplicativo.
 */
export default _ => (
    <SafeAreaView style={{flex: 1}}>     
        <NavigationContainer>
            <Stack.Navigator initialRouteName='List'
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name='List' component={LocationList}/>
                <Stack.Screen name='Search' component={SearchLocation}/>
                <Stack.Screen name='Weather' component={WatherView}/>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
)