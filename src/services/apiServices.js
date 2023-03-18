import { getDataQuizSuccess, getProcessFailed, getProcessStart, getProcessSuccess, getQuizByUserSuccess, isLoading, isNotLoading, postSubmitQuizSuccess, postCreateQuizSuccess } from "../redux/slice/userSlice";
import axios from "../utils/axiosCustomize";
import { toast } from 'react-toastify';
import { getAllQuizFailed, getAllQuizStart, getAllQuizSuccess, postCreateNewAnswer, postCreateNewQuestion } from "../redux/slice/adminSlice";
const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => { //form-data
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    console.log('check', data.get(id));
    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = async (email, password, dispatch, navigate) => {
    dispatch(getProcessStart())
    dispatch(isLoading());
    try {
        const res = await axios.post(`api/v1/login`, { email, password, delay: 3000 });
        // console.log(res);

        if (res && +res.EC === 0) {
            toast.success(res.EM);
            dispatch(getProcessSuccess(res.DT));
            dispatch(isNotLoading());
            navigate('/')
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
            dispatch(isNotLoading());
            dispatch(getProcessFailed());
        }

    } catch (error) {
        dispatch(isNotLoading());
        dispatch(getProcessFailed());
    }

}

const registerUser = (username, email, password) => {
    return axios.post(`api/v1/register`, { email, username, password }); //form-urlencoded
}

const getQuizDataByUser = async (dispatch) => {
    dispatch(getProcessStart())
    try {
        const res = await axios.get(`api/v1/quiz-by-participant`);
        console.log('res quiz by user:', res);
        if (res && res.EC === 0) {
            dispatch(getQuizByUserSuccess(res.DT));

        }
    } catch (error) {
        dispatch(getProcessFailed());
    }

}

const putQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id)
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    //console.log('check', data.get(id));
    return axios.put('api/v1/quiz', data)
}

const getDataQuiz = async (quizId, dispatch) => {
    dispatch(getProcessStart())
    try {
        const res = await axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`); //param
        console.log('res detail quiz:', res);
        if (res && res.EC === 0) {
            dispatch(getDataQuizSuccess(res.DT));
        }
    } catch (error) {
        dispatch(getProcessFailed());
    }
}

const getDataAllQuizForAdmin = async (dispatch) => {
    dispatch(getAllQuizStart())
    try {
        const res = await axios.get(`/api/v1/quiz/all`); //param
        console.log('getDataAllQuizForAdmin:', res);
        if (res && res.EC === 0) {
            dispatch(getAllQuizSuccess(res.DT));
        }
    } catch (error) {
        dispatch(getAllQuizFailed());
    }
}

const deleteQuizById = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const postSubmitQuiz = async (data, dispatch) => {
    dispatch(getProcessStart());
    try {
        const res = await axios.post(`api/v1/quiz-submit`, { ...data }); //raw
        if (res && +res.EC === 0) {
            dispatch(postSubmitQuizSuccess(res.DT));
            console.log('res postSubmit: ', res);
        }
    } catch (error) {
        dispatch(getProcessFailed());
    }

    //return 
}

const postCreateNewQuiz = async (quiz, dispatch) => {
    const data = new FormData();
    data.append('description', quiz.description)
    data.append('name', quiz.name);
    data.append('difficulty', quiz.difficulty);
    data.append('quizImage', quiz.quizImage);
    dispatch(getProcessStart());
    try {
        console.log(quiz);
        const res = await axios.post(`api/v1/quiz`, data);
        if (res && +res.EC === 0) {
            dispatch(postCreateQuizSuccess(res.DT));
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    } catch (error) {
        dispatch(getProcessFailed())
    }
    //     console.log('check', data.get(id));
}

const postCreateNewQuestionForQuiz = async (quizId, description, questionImage, dispatch) => {
    const data = new FormData();
    data.append('quiz_id', quizId)
    data.append('description', description);
    data.append('questionImage', questionImage);

    dispatch(getProcessStart());
    try {
        const res = await axios.post(`api/v1/question`, data);
        if (res && +res.EC === 0) {
            dispatch(postCreateNewQuestion(res.DT));

            toast.success(res.EM);
            return res;
        } else {
            toast.error(res.EM);
        }
    } catch (error) {
        dispatch(getProcessFailed());
    }
}

const postCreateNewAnswerForQuestion = async (description, correct_answer, question_id, dispatch) => {
    dispatch(getProcessStart());
    try {
        const res = await axios.post(`api/v1/answer`, { description, correct_answer, question_id });
        // const res = await axios.post(`api/v1/answer`, { description, correct_answer, question_id },
        //     { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        // );
        //console.log(res);
        if (res && +res.EC === 0) {
            dispatch(postCreateNewAnswer(res.DT));
            toast.success(res.EM);
            return res;
        } else {
            toast.error(res.EM);
        }
    } catch (error) {
        dispatch(getProcessFailed());
    }
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId });
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);

}

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data }); //raw
}

const logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token }); //form-urlencoded
}

const getOverView = () => {
    return axios.get(`api/v1/overview`);
}

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    registerUser,
    getQuizDataByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getDataAllQuizForAdmin,
    deleteQuizById,
    putQuiz,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuizToUser,
    getQuizWithQA,
    postUpsertQA,
    logout,
    getOverView
}