import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDataByUser } from "../../services/apiServices";
import { store } from "../../redux/store";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getQuizDataByUser(dispatch);
    }, [])

    //const arrQuiz = store.getState()?.user?.listQuiz; 
    const arrQuiz = useSelector(state => state?.user?.listQuiz);
    const isAuthenticated = useSelector(state => state?.user?.isAuthenticated);
    console.log('arr', arrQuiz);




    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary" onClick={() => {
                                    navigate(`/quiz/${quiz.id}`,
                                        { state: { quizTitle: quiz.description } })
                                }} >Start Now</button>
                            </div>
                        </div>
                    )
                })

            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now
                </div>
            }

        </div>
    )
}

export default ListQuiz;