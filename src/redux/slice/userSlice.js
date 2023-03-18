import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        process: {
            isFetching: false,
            isLoading: false,
            error: false,
        },
        account: {
            access_token: null,
            refresh_toke: null,
            username: null,
            email: null,
            role: null,
            image: null,
        },
        isAuthenticated: false,
        listQuiz: [],
        detailQuiz: [],
        submitQuiz: {},
        newCreatedQuiz: {},
        optimizeQuiz: []
    },
    reducers: {
        getProcessStart: (state) => {
            state.process.isFetching = true;
        },
        getProcessSuccess: (state, action) => {
            state.process.isFetching = false;
            state.process.error = false;
            state.account = action.payload;
            state.isAuthenticated = true;
        },
        getProcessFailed: (state) => {
            state.process.error = true;
            state.process.isFetching = false;
            state.isAuthenticated = false;
        },
        getUser: (state, action) => {
            state.account = action.payload;
        },
        isLoading: (state) => {
            state.process.isLoading = true;
        },
        isNotLoading: (state) => {
            state.process.isLoading = false;
        },
        getQuizByUserSuccess: (state, action) => {
            state.listQuiz = action.payload;
        },
        getDataQuizSuccess: (state, action) => {
            state.detailQuiz = action.payload;
        },
        postSubmitQuizSuccess: (state, action) => {
            state.submitQuiz = action.payload;
        },
        postCreateQuizSuccess: (state, action) => {
            state.newCreatedQuiz = action.payload;
        },
        restOptimizeQuiz: (state) => {
            state.optimizeQuiz = _.chain(state.detailQuiz)
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
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value();
        },
        doLogOut: (state) => {
            state.process = {
                isFetching: false,
                isLoading: false,
                error: false,
            };
            state.account = {
                access_token: null,
                refresh_toke: null,
                username: null,
                email: null,
                role: null,
                image: null,
            };
            state.isAuthenticated = false;

            state.listQuiz = [];
            state.detailQuiz = [];
            state.submitQuiz = {};
            state.newCreatedQuiz = {};
            state.optimizeQuiz = []
        }
    }
})

export const {
    getProcessStart,
    getProcessSuccess,
    getProcessFailed,
    isLoading,
    isNotLoading,
    getQuizByUserSuccess,
    getDataQuizSuccess,
    postSubmitQuizSuccess,
    postCreateQuizSuccess,
    restOptimizeQuiz,
    doLogOut
} = userSlice.actions;

export default userSlice.reducer;