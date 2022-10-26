import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imgUrl from '../../../assets/woman.jpg'

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;

    const imgSrc = !dataView.image ? imgUrl : `data:image/jpeg;base64,${dataView.image}`;

    const handleClose = () => {
        setShow(false);

    }


    return (
        <>

            <Modal backdrop="static"
                show={show} onHide={handleClose}
                className='modal-add-user modal-fullscreen-lg-down'
            // onExiting={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title> View detail user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Username : {dataView.username}</h5>
                                    <p className="card-text">Email: {dataView.email}</p>
                                    <p className="card-text">Role: {dataView.role}</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalViewUser;