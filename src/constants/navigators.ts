export const PublicLinks = {
  SIGN_IN: 'login',
  SIGN_UP: 'register',
  START_UP: 'start-up',
  INIT_PROFILE: 'init-profile',
} as const;

export const AuthorizedLinks = {
  RUN: 'run',
  WATER: 'water',
  HOME: 'home',
  ANALYST: 'analyst',
  PROFILE: 'profile',
} as const;

export const CameraLinks = {
  FACE: 'face-camera',
  BODY: 'body-camera',
  MEAL: 'meals-camera',
  WEIGHT: 'add-weight',
  HEIGHT: 'add-height',
} as const;

export const HomeLinks = {
  HOME: 'home/main',
  TASK_LIST: 'home/task-list',
  FACE_LIST: 'home/face-list',
  BODY_LIST: 'home/body-list',
  MEAL_LIST: 'home/meal-list',
  WEIGHT_LIST: 'home/weight-list',
  HEIGHT_LIST: 'home/height-list',
  TODAY: 'home/today',
  CONFETTI: 'home/confetti',
};
export const ProfileLinks = {
  PROFILE: 'profile',
  EDIT: 'profile/edit',
};
export const WaterLinks = {
  WATER: 'water',
  EDIT: 'water/edit',
};
