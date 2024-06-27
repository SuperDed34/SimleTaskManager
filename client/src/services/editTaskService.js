import { getTask } from "./DBService"

export const openTaskForEdit = async (id, onEdit, onUpdated, onLoading) => {
  const res = await getTask(id)
  await onEdit(res, 'change', id)
}