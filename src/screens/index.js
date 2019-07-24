import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './home';
import ArticleScreen from './article';
import TestScreen from './test';
import SettingsScreen from './settings';

const navigator = createStackNavigator(
  {
    home: HomeScreen,
    article: ArticleScreen,
    settings: SettingsScreen,
    test: TestScreen
  },
  {
    initialRouteName: 'home'
  }
);

export default createAppContainer(navigator);
