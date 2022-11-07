import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => {
        setShow(false);
    }

    const handleSubmitDelete = async () => {
        //dataDelete.id = dataDelete.id.toString();
        // console.log('gg', dataDelete);
        let data = await deleteUser(dataDelete.id);
        // console.log('data', data);
        if (data?.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        } else {
            toast.error(data.EM)
        }

    }
    return (
        <>
            {/* {console.log('gg', dataDelete)} */}
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-delete-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE USER?</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
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

export default ModalDeleteUser;