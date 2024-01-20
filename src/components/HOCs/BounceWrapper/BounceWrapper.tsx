import React from 'react';

import { MotiView, useAnimationState } from 'moti';
import { ReactNode } from 'react';
import { Pressable } from 'react-native';

type Props = {
  children: ReactNode;
};
export default function BounceWrapper({ children }: Props) {
  const animationState = useAnimationState({
    active: {
      scale: [1, 0.9, 1],
      transition: {
        type: 'spring',
      },
    },
  });
  return (
    <Pressable
      onPress={() => {
        animationState.transitionTo((currentState) => {
          return 'active';
        });
      }}
    >
      <MotiView state={animationState}>{children}</MotiView>
    </Pressable>
  );
}
