import { getTask } from "./DBService"

export const openTaskForEdit = async (id, onEdit) => {
  const res = await getTask(id)
  await onEdit(res, 'change', id)
}