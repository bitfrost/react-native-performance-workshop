// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

// do we need to load them all? see if this can be a smaller subset
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  // memo style here?  seems like re-render bug
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
