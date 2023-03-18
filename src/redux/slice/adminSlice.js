import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        process: {
            isFetching: false,
            error: false,
        },
        allQuiz: [],
        createdQuestions: [],
        answers: [],

    },
    reducers: {
        getAllQuizStart: (state) => {
            state.process.isFetching = true;
        },
        getAllQuizSuccess: (state, action) => {
            state.process.isFetching = false;
            state.process.error = false;
            state.allQuiz = action.payload;
        },
        getAllQuizFailed: (state) => {
            state.process.isFetching = false;
            state.process.error = true;
        },
        postCreateNewQuestion: (state, action) => {
            state.createdQuestions.push(action.payload);
        },
        postCreateNewAnswer: (state, action) => {
            state.answers.push(action.payload);
        }
    }
})

export const {
    getAllQuizStart,
    getAllQuizSuccess,
    getAllQuizFailed,
    postCreateNewQuestion,
    postCreateNewAnswer
} = adminSlice.actions;

export default adminSlice.reducer;