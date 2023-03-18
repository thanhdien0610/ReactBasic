import './ManageQuiz.scss'
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { store } from '../../../../redux/store';
import QuizTable from './QuizTable';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const ManageQuiz = (props) => {
    const options = [
        { value: 'EASY', label: 'Easy' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'HARD', label: 'Hard' },
    ];
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({});
    const [image, setImage] = useState(null);
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const dispatch = useDispatch();
    const quizStatus = useSelector(state => state?.user?.newCreatedQuiz);
    const handleSubmitQuiz = () => {
        if (!name || !description) {
            toast.error('name/ description is required');
            return;
        }
        const quiz = {
            description: description,
            name: name,
            difficulty: type.value,
            quizImage: image
        }
        console.log('quiz handle:', quiz);
        postCreateNewQuiz(quiz, dispatch);
        // const quizStatus = store.getState()?.user?.newCreatedQuiz;
        //console.log('status', quizStatus);
        if (quizStatus) {
            setName('')
            setDescription('')
            setImage(null)

        }

    }



    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Manage quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">

                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz </legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description'
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        value={type}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>

                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(e) => handleChangeFile(e)}
                                    />

                                </div>
                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <QuizTable

                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header> Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    )
}

export default ManageQuiz;