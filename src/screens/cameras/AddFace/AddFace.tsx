import React from 'react';

import { useCreateUserFace } from '~/hooks';

import { CameraLayout } from '~/components/molecules';

export default function AddFaceScreen() {
  const { create } = useCreateUserFace();

  return (
    <CameraLayout imageType="face" photoAspectRatio={1} onCreate={create} />
  );
}
