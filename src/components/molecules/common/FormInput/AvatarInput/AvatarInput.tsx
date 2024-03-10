import { useBottomSheet } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { FormControlWrapper } from '~/components/HOCs';
import { Images } from '~/constants';
import { useSaveImage } from '~/hooks';
import { useSystemStore } from '~/stores';
import Styles from '~/styles';
import { showError } from '~/utils';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
};
export default function AvatarInput({ control, name, label }: Props) {
  const camera = useRef<Camera>(null);
  const { fieldState, field } = useController({ control, name });
  const { uploadImage } = useSaveImage();

  const setOpenBottomSheet = useSystemStore(
    (state) => state.setOpenBottomSheet
  );
  const tempImage = useSystemStore((state) => state.tempImage);
  const variant = useSystemStore((state) => state.variant);
  const setTempImage = useSystemStore((state) => state.setTempImage);
  const setLoading = useSystemStore((state) => state.setLoading);

  const handleAddAvatar = async () => {
    setLoading(true);
    try {
      if (tempImage) {
        const savedUrlInFirebase = await uploadImage(
          tempImage,
          new Date().getTime().toString()
        );
        if (savedUrlInFirebase) {
          field.onChange(savedUrlInFirebase);
        }
      }
      setTempImage('');
    } catch (error) {
      showError(error);
    }

    setLoading(false);
  };

  const handleOpenBottomSheet = () => {
    setOpenBottomSheet(true, 'camera');
  };

  useEffect(() => {
    if (tempImage !== '' && variant === 'camera') {
      handleAddAvatar();
    }
  }, [tempImage]);

  return (
    <FormControlWrapper
      label={label}
      invalid={fieldState.invalid}
      error={fieldState.error}
    >
      <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: 'black',
            borderRadius: 1000,
            alignSelf: 'center',
          },
          Styles.shadow,
        ]}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 1000,
          }}
          source={field.value ? { uri: field.value } : Images.defaultAvatar}
        />
      </TouchableOpacity>
    </FormControlWrapper>
  );
}
