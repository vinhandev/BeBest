import React from 'react';

import { useCreateUserBody } from '~/hooks';

import { CameraLayout } from '~/components/molecules';

export default function AddBodyScreen() {
  const { create } = useCreateUserBody();

  return (
    <CameraLayout imageType="body" photoAspectRatio={2 / 3} onCreate={create} />
  );
}
