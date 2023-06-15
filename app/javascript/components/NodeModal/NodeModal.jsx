import React, { useState } from "react"
import {Input, Select} from "antd"
import { useReactFlow } from 'reactflow'

const { TextArea } = Input

const NodeModal = ({node, setNode, isOpen, close}) => {
  const reactFlowInstance = useReactFlow()

  const [localNode, setLocalNode] = useState(node)

  const save = () => {
    reactFlowInstance.setNodes((nds) =>
      nds.map((node) => {
        if (localNode.id === node.id) {
          node.data = { ...localNode.data }
        }
        return node
      })
    )

    close()
  }

  const closeWithDeletion = () => {
    if (localNode.id !== '1' && (localNode.data.name === '' || !localNode.data.selected.manager)) {
      reactFlowInstance.setNodes((nds) => nds.filter((n) => n.id !== node.id))
      reactFlowInstance.setEdges((eds) => eds.filter((n) => n.source !== node.id))
    }

    close()
  }

  return (
    <>
      <input checked={isOpen} type="checkbox" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col">
          <h3 className="mb-6 text-lg font-bold">Редактирование</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Название <span className="text-red-600">*</span></p>
              <Input
                placeholder="Введите название"
                value={localNode.data.name}
                onChange={(e) => setLocalNode({...localNode, data: {...localNode.data, name: e.target.value}})}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Описание</p>
              <TextArea
                placeholder="Введите описание"
                rows={4}
                value={localNode.data.description}
                onChange={(e) => setLocalNode({...localNode, data: {...localNode.data, description: e.target.value}})}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Менеджер <span className="text-red-600">*</span></p>
              <Select
                className="w-full"
                placeholder="Выберите менеджера"
                onChange={(selected) =>
                  setLocalNode({...localNode, data: {
                    ...localNode.data,
                    selected: {
                      ...localNode.data.selected, manager: localNode.data.options.managers.find((employee) => selected === employee.id)
                    }}
                  })
                }
                value={localNode.data.selected.manager?.id}
                options={
                  localNode.data.options.managers.map(employee => ({label: `${employee.name} (${employee.specialization})`, value: employee.id}))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Подчиненные</p>
              <Select
                className="w-full"
                mode="multiple"
                allowClear
                placeholder="Выберите подчиненых"
                onChange={(selected) =>
                  setLocalNode({...localNode, data: {
                    ...localNode.data,
                    selected: {
                      ...localNode.data.selected, subordinates: localNode.data.options.subordinates.filter((employee) => selected.includes(employee.id))
                    }}
                  })
                }
                value={localNode.data.selected.subordinates.map(employee => employee.id)}
                options={
                  localNode.data.options.subordinates.map(employee => ({label: `${employee.name} (${employee.specialization})`, value: employee.id}))
                }
              />
              {console.log(localNode.data.options.subordinates)}
            </div>
          </div>

          <div className="modal-action flex space-between">
            <button
              className="btn btn-outline"
              onClick={closeWithDeletion}
            >
              Отменить
            </button>
            <button
              className="btn"
              disabled={localNode.data.name === '' || !localNode.data.selected.manager || localNode === node}
              onClick={save}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NodeModal
