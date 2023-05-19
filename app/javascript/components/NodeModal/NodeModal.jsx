import React from "react"
import {Input, Select} from "antd"

const { TextArea } = Input

const NodeModal = ({node, setNode, isOpen, close}) => {
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
                value={node.data.name}
                onChange={(e) => setNode({...node, data: {...node.data, name: e.target.value}})}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Описание</p>
              <TextArea
                placeholder="Введите описание"
                rows={4}
                value={node.data.description}
                onChange={(e) => setNode({...node, data: {...node.data, description: e.target.value}})}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Менеджер <span className="text-red-600">*</span></p>
              <Select
                className="w-full"
                placeholder="Выберите менеджера"
                onChange={(value) =>
                  setNode({...node, data: {
                    ...node.data,
                    selected: {
                      ...node.data.selected, manager: value
                    }}
                  })
                }
                value={node.data.selected.manager}
                options={
                  node.data.options.managers.map(employee => ({label: employee.email, value: employee.email}))
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
                onChange={(value) =>
                  setNode({...node, data: {
                    ...node.data,
                    selected: {
                      ...node.data.selected, subordinates: [...value]
                    }}
                  })
                }
                value={node.data.selected.subordinates}
                options={
                  node.data.options.subordinates.map(employee => ({label: employee.email, value: employee.email}))
                }
              />
            </div>
          </div>

          <div className="modal-action flex space-between">
            <button
              className="btn btn-outline"
              onClick={close}
            >
              Отменить
            </button>
            <button
              className="btn"
              disabled={node.data.name === '' && node.data.selected.subordinates.length === 0}
              onClick={close}
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
