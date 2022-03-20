import React, { useState, useEffect } from 'react'

const Modal = ({ modalMethod, title, info, action, active, closeModal }) => {
    const [open, setOpen] = useState(active);
    const handleOpen = () => {
        setOpen(false);
        closeModal()
    }
    useEffect(() => {
        setOpen(active)
    }, [active])
    return (
        <div className="custom modal" style={{ display: open ? "block" : 'none', background: "#000000ad" }} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold" >{title}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{info}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn px-4 btn-dark" onClick={handleOpen}>Cancel</button>
                        <button className="btn px-4 btn-primary" onClick={() => modalMethod()}>{action}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal