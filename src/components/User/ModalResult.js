import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ModalBody } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ModalResult = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {

    }
    const dataModal = useSelector(state => state?.user?.submitQuiz);
    return (
        <>
            {/* {console.log('gg', dataDelete)} */}
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-delete-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Result... </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total question: <b>{dataModal.countTotal}</b></div>
                    <div>Total correct answer: <b>{dataModal.countCorrect}</b> </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        // className='btn btn-danger'
                        onClick={handleShow}>
                        Show answers
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ModalResult;