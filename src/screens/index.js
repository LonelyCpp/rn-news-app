import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './home';

const navigator = createStackNavigator({
  home: HomeScreen
});

export default createAppContainer(navigator);
