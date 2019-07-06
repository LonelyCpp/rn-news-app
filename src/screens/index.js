import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './home';
import ArticleScreen from './article';

const navigator = createStackNavigator({
  home: HomeScreen,
  article: ArticleScreen
});

export default createAppContainer(navigator);
