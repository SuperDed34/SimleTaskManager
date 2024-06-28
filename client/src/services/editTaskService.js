import { getTask } from "./DBService"

export const openTaskForEdit = async (id, onEdit, setSnackbar) => {
  const res = await getTask(id, setSnackbar)
  await onEdit(res, 'change', id)
}