import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

export const getUriImage = (uri: string | undefined | null) => {
  return uri || false ? { uri } : undefined;
};

export const rotateAndSaveImage = async (imagePath: string) => {
  // Rotate the image using Expo ImageManipulator
  const rotatedImage = await ImageManipulator.manipulateAsync(
    imagePath,
    [{ rotate: 90 }], // Rotate the image by 90 degrees (you can adjust the angle)
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG } // You can adjust compression and format as needed
  );

  if (rotatedImage && rotatedImage.uri) {
    // Save the rotated image to the media library
    const asset = await MediaLibrary.createAssetAsync(rotatedImage.uri);
    if (asset) {
      return asset;
      // Asset has been saved to the media library
      console.log('Image saved to the media library:', asset);
    }
  }
};
