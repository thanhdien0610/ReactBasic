import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { BiImageAdd } from 'react-icons/bi'
import Select from 'react-select';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { putQuiz } from '../../../../services/apiServices';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;

    const options = [
        { value: 'EASY', label: 'Easy' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'HARD', label: 'Hard' },
    ];

    //console.log('props', dataUpdate);

    const handleClose = () => {
        setShow(false);

    }


    const findDefaultType = (target) => {
        return options.find(item => item.value == target);
    }
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState({});
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        //console.log(dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setPreviewImage(dataUpdate.image ? `data:image/jpeg;base64,${dataUpdate.image}` : "");

        }
    }, [dataUpdate])



    const handleSubmitCreateUser = async () => {

        if (!name || !description) {
            toast.error('name/ description is required');
            return;
        }

        let data = await putQuiz(dataUpdate.id, description, name, type.value, image);

        //console.log(data);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.fetchAllQuiz()
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }



    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            //setPreviewImage('');
        }

    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Create new user
            </Button> */}

            <Modal backdrop="static"
                show={show} onHide={handleClose} size='xl'
                className='modal-add-user'
            // onExiting={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Edit quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={dataUpdate.name}

                                placeholder={dataUpdate.name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={dataUpdate.description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <Select
                                // value={type}
                                defaultValue={findDefaultType(dataUpdate.difficulty)}
                                onChange={setType}
                                options={options}
                                placeholder={"Quiz type..."}
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload' >
                                <FcPlus />
                                Upload File Image</label>
                            <input
                                type='file'
                                hidden id='labelUpload'
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <div>
                                    <label className='form-label label-upload-1' htmlFor='labelUpload1' >
                                        <BiImageAdd /></label>
                                    <input
                                        type='file'
                                        hidden id='labelUpload1'
                                        onChange={(event) => handleUploadImage(event)}
                                    />
                                </div>

                            }


                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalUpdateQuiz;