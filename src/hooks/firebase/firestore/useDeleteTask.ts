import { tasksCollection } from '~/services';
import { TaskPropsType } from '~/types/task';

export function useDeleteTask() {
  const deleteTask = async (paramIndex: number, task: TaskPropsType) => {
    const response = await tasksCollection.where('doneTime', '==', task.doneTime).get();
    const docs = response.docs;
    for (let index = 0; index < docs.length; index++) {
      const doc = docs[index];
      await tasksCollection.doc(doc.id).delete();
    }
  };
  return {
    deleteTask,
  };
}
