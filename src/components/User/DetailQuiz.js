import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import { store } from "../../redux/store";
import _ from "lodash";
import './DetaiQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
import { restOptimizeQuiz } from "../../redux/slice/userSlice";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const dispatch = useDispatch();
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    useEffect(() => {
        fetchQuestions();
    }, [quizId])
    //const [optimizeQuiz, setOptimizeQuiz] = useState([]);


    //store.getState()?.user?.listQuiz;
    const fetchQuestions = async () => {
        await getDataQuiz(quizId, dispatch);
        let data = store.getState()?.user?.detailQuiz;
        let result = _.chain(data)
            .groupBy("id")
            .map((value, key) => {

                let answers = [];
                let questionDescription, image = null;
                value.forEach((item, index) => {
                    if (index === 0) {
                        questionDescription = item.description;
                        image = item.image
                    }
                    let newItem = {
                        ...item.answers, isSelected: false
                    }
                    //item.answers.isSelected = false;
                    answers.push(newItem);
                })
                answers = _.orderBy(answers, ['id'], ['asc']);
                return { questionId: key, answers, questionDescription, image }
            }
            )
            .value();
        dispatch(restOptimizeQuiz());

        setDataQuiz(result);
    }
    // console.log('detail result quiz:', dataQuiz);
    // const optimizeQuiz = useSelector(state => state?.user?.optimizeQuiz);
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        //console.log('q', question);
        if (question && question.answers) {

            let temp = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = temp;
            //console.log('nq', temp);
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
        //dataQuizClone

    }

    const handleFinish = () => {
        console.log('before submit: ', dataQuiz);
        if (dataQuiz && dataQuiz.length > 0) {
            const dataSubmit = {
                "quizId": +quizId,
                "answers": []
            };
            dataQuiz.forEach((value) => {
                let userAnswerId = [];
                value.answers.forEach((item) => {
                    if (item.isSelected === true) {
                        userAnswerId.push(+item.id);
                    }
                })
                dataSubmit.answers.push({
                    "questionId": +value.questionId,
                    "userAnswerId": userAnswerId
                })
            })
            console.log('submit: ', dataSubmit);
            postSubmitQuiz(dataSubmit, dispatch);
            const isFinish = store.getState()?.user?.submitQuiz;
            if (isFinish) {
                setIsShowModalResult(true);
            }

        }

        //console.log('otmq: ', optimizeQuiz);
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content ">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[index] : []}

                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footer">

                    <button className="btn btn-secondary" onClick={() => { setIndex(index === 0 ? 0 : index - 1) }}>Prev</button>
                    <button className="btn btn-primary " onClick={() => { setIndex(index === dataQuiz.length - 1 ? dataQuiz.length - 1 : index + 1) }}>Next</button>
                    <button className="btn btn-warning " onClick={() => { handleFinish() }} >Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    setIndex={setIndex}
                    indexSelectedQuestion={index}
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish} />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
            />
        </div>
    )
}

export default DetailQuiz;