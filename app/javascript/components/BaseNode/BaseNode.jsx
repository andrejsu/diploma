import React from 'react'
import { Handle, Position } from 'reactflow'

const BaseNode = ({ data }) =>
  <>
    <Handle type="target" position={Position.Top} />
    <div
      className="p-4 flex flex-col bg-base-100 border rounded-md"
      style={{maxWidth: '500px'}}
    >
      <h3 className="text-lg font-bold">{data.name ? data.name : "Название"}</h3>
      <div className="divider mb-4"></div>
      <div className="flex flex-col space-y-4">
        {data.description &&
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Описание</p>
            <p className="whitespace-pre-line">{data.description}</p>
          </div>
        }
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium">Менеджер</p>
          {data.selected.manager
            ? <p className="">{data.selected.manager}</p>
            : <p className="text-gray-500">Выберите менеджера</p>
          }
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium">Подчиненные</p>
          <div className="flex flex-col space-y-2">
            {data.selected.subordinates.length !== 0
              ? data.selected.subordinates.map((subordinate) =>
                  <p>{subordinate}</p>
                )
              : <p className="text-gray-500">Подчиненные не выбраны</p>
            }
          </div>
        </div>
      </div>
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      id="a"
    />
  </>

export default BaseNode
