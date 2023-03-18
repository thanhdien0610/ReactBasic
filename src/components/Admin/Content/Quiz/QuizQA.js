import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BsPlusSquareFill, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getDataAllQuizForAdmin, getDataQuiz, getQuizWithQA, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz, postUpsertQA } from '../../../../services/apiServices';
import { restOptimizeQuiz } from '../../../../redux/slice/userSlice';
import { store } from "../../../../redux/store";
import { toast } from 'react-toastify';
const QuizQA = (props) => {
    const dispatch = useDispatch();
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        },

    ]
    const [questions, setQuestions] = useState(initQuestions);

    const urlToFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQAofQuiz();
        }
    }, [selectedQuiz])

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        await getDataAllQuizForAdmin(dispatch);
    }
    const fetchQAofQuiz = async () => {
        const res = await getQuizWithQA(selectedQuiz.value);
        if (res && +res.EC === 0) {
            let newQA = [];
            let q = res.DT.qa;
            for (let i = 0; i < q.length; i++) {
                if (q[i].imageFile) {
                    q[i].imageName = `Question-${q[i].id}.png `;
                    q[i].imageFile =
                        await urlToFile(`data:text/png;base64,${q[i].imageFile}`, `Question-${q[i].id}.png `, 'image/png')
                }
                newQA.push(q[i]);
            }
            setQuestions(newQA);
        }
    }



    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    });


    //const [listQuiz, setListQuiz] = useState([]);
    const listQuiz = useSelector(state => state?.admin?.allQuiz);
    const options = listQuiz.map((item) => {
        return {
            value: item.id,
            label: `${item.id} - ${item.description}`
        }
    })
    //const [type, setType] = useState(options);
    console.log('q: ', questions);
    // console.log('slt quiz: ', selectedQuiz);
    // console.log('list quiz: ', listQuiz);
    // useEffect(() => {
    //     fetchAllQuiz();
    // }, [])

    // // useEffect(() => {
    // //    setQuestions(listQuiz.find((item) => item?.name === selectedQuiz?.value));
    // // }, [selectedQuiz])
    // const fetchAllQuiz = async () => {
    //     await getDataAllQuizForAdmin(dispatch);
    // }

    // const handleOnChangeSelectedQuiz = () => {
    //     //
    //     setSelectedQuiz();
    // }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);
            console.log(questions);
        }
        if (type === 'REMOVE') {
            //console.log(type);
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
            console.log(questions);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'QUESTION') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        // console.log(type, questionId, answerId, value, index);        
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                // console.log(answer.id, ' ', answerId, ' ', answer.id === answerId);
                if (answer.id === answerId) {
                    // console.log('found');
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                        // console.log('check: ', value);
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                        // console.log('input: ', value);
                    }
                }
                return answer;
            })
            setQuestions(questionsClone);
        }

    }

    const handleSubmitQuestionForQuiz = async () => {
        console.log('questions: ', questions);
        //todo
        //validate data
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Pls choose a quiz! ');
            return;
        }
        //validate answers & questions
        let isValidAnswer = true;
        let indexQuestion = 0, indexAnswer = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexAnswer = j;
                    break;
                }
            }
            indexQuestion = i;
            if (isValidAnswer === false) {
                break;
            }
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexAnswer + 1} at question ${indexQuestion + 1}!!!`);
            return;
        }

        let isValidQuestion = true;
        let indexQ = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                indexQ = i;
                isValidQuestion = false;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty  question ${indexQ + 1}!!!`);
            return;
        }

        //submit question

        // await Promise.all(questions.map(async (question) => {
        //     const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile, dispatch);
        //     //submit answer
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id, dispatch);
        //     }))
        // }));
        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        if (res && +res.EC === 0) {
            toast.success(res.EM);
            fetchQAofQuiz();
        }
        else toast.error(res.EM)
        // setQuestions(initQuestions);

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            });
            setIsPreviewImage(true);
        }

    }

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='main-content mb-4'>
                                <div className='question-content'>

                                    <div className="form-floating description ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={question.description}
                                            onChange={(e) => { handleOnChange('QUESTION', question.id, e.target.value) }}
                                        />
                                        <label >Question {index + 1}'s  description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(e) => { handleOnChangeFileQuestion(question.id, e) }}
                                            type={'file'} hidden />
                                        <span> {
                                            question.imageName ?
                                                <span
                                                    className='image-name'
                                                    onClick={() => { handlePreviewImage(question.id) }}>{question.imageName}</span>
                                                :
                                                '0 file'} is uploaded</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}> <BsPlusSquareFill className='icon-add' /></span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}> <BsTrash className='icon-remove' /></span>}
                                        {/* <button className=''> Add new question </button> */}
                                    </div>

                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content '>
                                                <input className="form-check-input isCorrect" type="checkbox" checked={answer.isCorrect}
                                                    onChange={(e) => { handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked) }}
                                                />
                                                <div className="form-floating answer ">
                                                    <input type="text" className="form-control" value={answer.description}
                                                        onChange={(e) => { handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value) }}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusCircle className='icon-add' /></span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>}
                                                    {/* <button className=''> Add new question </button> */}
                                                </div>
                                            </div>

                                        )
                                    })
                                }



                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => { handleSubmitQuestionForQuiz() }}
                            className='btn btn-warning'>Save update</button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }

            </div>

        </div>
    )

}

export default QuizQA;