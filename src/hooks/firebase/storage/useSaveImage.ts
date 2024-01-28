import storage from '@react-native-firebase/storage';

export function useSaveImage() {
  const uploadImage = async (uri: string, path: string) => {
    let URL;
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = storage().ref();
    const upload = storageRef.child(path);
    await upload.put(blob);
    await upload.getDownloadURL().then((url) => {
      URL = url
    });
    return URL;
  };

  return { uploadImage };
}
