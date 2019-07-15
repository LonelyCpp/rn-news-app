import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './home';
import ArticleScreen from './article';
import TestScreen from './test';

const navigator = createStackNavigator(
  {
    home: HomeScreen,
    article: ArticleScreen,
    test: TestScreen
  },
  {
    initialRouteName: 'home'
  }
);

export default createAppContainer(navigator);
