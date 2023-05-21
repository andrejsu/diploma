import * as R from "ramda"
import axios from "axios"
import { toast } from "react-toastify"

const notifySuccess = () => toast.success('Успешно сохранено!', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
})

const notifyError = () => toast.error('Упс, что-то пошло не так!', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
})

export const save = (isSending, setIsSending, nodes, edges, data, setChart) => {
  const rootNode = nodes[0]
  const structure = { nodes, edges }
  const payload = {
    organization: {
      name: rootNode.data.name,
      description: rootNode.data.description,
      structure
    }
  }

  if (!isSending) {
    setIsSending(true)

    if (!R.isNil(data.id)) {
      axios.patch(`/organizations/${data.id}`, payload)
        .then(function (response) {
          notifySuccess()
          setChart(structure)
        })
        .catch(function (error) {
          notifyError()
        })
        .finally(() => setIsSending(false))
    } else {
      axios.post('/organizations', payload)
        .then(function (response) {
          notifySuccess()
          setChart(structure)
        })
        .catch(function (error) {
          notifyError()
        })
        .finally(() => setIsSending(false))
    }
  }
}