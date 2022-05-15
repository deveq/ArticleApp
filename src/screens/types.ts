import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
  Articles: undefined;
  UserMenu: undefined;
};
export type MainTabNavigatorScreenParams =
  NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  RootStackNavigationProp
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigatorScreenParams;
  Article: {
    id: number;
  };
  Register: undefined;
  Login: undefined;
  MyArticles: undefined;
  Write: {
    articleId?: number;
  };
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
