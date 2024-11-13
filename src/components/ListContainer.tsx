import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-placeholder';

// ha, remove the silly Array(3) every render.... egads
// don't call Dimensions.get multiple times for the same value 
export const ListContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View style={{flex: 1}}>
      <View style={StyleSheet.absoluteFill}>
        <SkeletonContent>
          <>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <SkeletonContent.Item
                  flexDirection="row"
                  alignItems="center"
                  margin={10}
                  key={index}>
                  <SkeletonContent.Item
                    width={Dimensions.get('window').width}
                    height={200}
                  />
                </SkeletonContent.Item>
              ))}
          </>
        </SkeletonContent>
      </View>
      {children}
    </View>
  );
};
