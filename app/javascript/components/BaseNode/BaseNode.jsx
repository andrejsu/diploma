import React, {useContext} from "react"
import { Handle, Position, useReactFlow } from "reactflow"
import { popId } from "../actions"
import {EditContext} from "../context"

const BaseNode = (node) => {
  const reactFlowInstance = useReactFlow()
  const canEdit = useContext(EditContext)

  const add = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const id = popId()
    const newNode = {
      id,
      type: 'base',
      position: { x: node.xPos + 600, y: node.yPos + 200 },
      data: {
        label: '',
        name: '',
        description: '',
        options: {
          managers: [node.data.selected.manager].concat(node.data.selected.subordinates),
          subordinates: node.data.options.subordinates,
        },
        selected: {
          manager: null,
          subordinates: [],
        },
      },
    }

    reactFlowInstance.setNodes((nds) => nds.concat(newNode))
    reactFlowInstance.setEdges((eds) => eds.concat({ id, source: node.id, target: id }))
  }

  return (
    <>
      {node.id !== '1' &&
        <Handle type="target" position={Position.Top} />
      }
      <div
        className="p-4 flex flex-col bg-base-100 border rounded-md"
        style={{maxWidth: '500px'}}
      >
        <h3 className="text-lg font-bold">{node.data.name ? node.data.name : "Название"}</h3>
        <div className="divider mb-4"></div>
        <div className="flex flex-col space-y-4">
          {node.data.description &&
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">Описание</p>
              <p className="whitespace-pre-line break-words">{node.data.description}</p>
            </div>
          }
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Менеджер</p>
            {node.data.selected.manager
              ? <p className="">{`${node.data.selected.manager.name} (${node.data.selected.manager.specialization})`}</p>
              : <p className="text-gray-500">Выберите менеджера</p>
            }
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Подчиненные</p>
            <div className="flex flex-col space-y-2">
              {node.data.selected.subordinates.length !== 0
                ? node.data.selected.subordinates.map((subordinate) =>
                  <p>{`${subordinate.name} (${subordinate.specialization})`}</p>
                )
                : <p className="text-gray-500">Подчиненные не выбраны</p>
              }
            </div>
          </div>
        </div>
        {canEdit &&
          <button
            className="btn btn-sm btn-block mt-2"
            onClick={add}
            disabled={node.data.name === '' || !node.data.selected.manager}
          >
            Добавить
          </button>
        }
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  )
}

export default BaseNode
