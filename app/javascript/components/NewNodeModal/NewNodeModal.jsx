import React from 'react'

const NewNodeModal = ({isOpen, close}) => {
  return (
    <>
      <input checked={isOpen} type="checkbox" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Редактирование</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label className="btn" onClick={close}>Yay!</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewNodeModal
