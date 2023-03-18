import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { toast } from 'react-toastify';
import { deleteQuizById } from '../../../../services/apiServices';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => {
        setShow(false);
    }

    const handleSubmitDelete = async () => {
        let data = await deleteQuizById(dataDelete);
        if (data?.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchAllQuiz();

        } else {
            toast.error(data.EM)
        }

    }
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-delete-quiz'>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE Quiz?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        className='btn btn-danger'
                        onClick={handleSubmitDelete}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ModalDeleteQuiz;