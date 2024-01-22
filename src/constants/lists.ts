export const ages: { label: string; value: string }[] = Array.from(
  { length: 88 },
  (_, index) => ({
    label: `Age ${index + 12}`,
    value: (index + 12).toString(),
  })
);

export const genders = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];
export const taskTypes = [
  { label: 'Habit', value: 'HABIT' },
  { label: 'Task', value: 'TASK' },
];
