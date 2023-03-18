import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const QuizTable = (props) => {


    const dispatch = useDispatch();
    const newQuiz = useSelector(state => state?.user?.newCreatedQuiz);
    useEffect(() => {
        fetchAllQuiz();
    }, [])
    useEffect(() => {
        fetchAllQuiz();
    }, [newQuiz])
    const fetchAllQuiz = async () => {
        await getDataAllQuizForAdmin(dispatch);
    }
    const listQuiz = useSelector(state => state?.admin?.allQuiz);

    console.log('listQuiz: ', listQuiz);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState('');
    const [dataUpdate, setDataUpdate] = useState('');
    const handleEdit = (target) => {
        setShowModalUpdate(true);
        const quizTarget = listQuiz.find(item => item.id === target);
        setDataUpdate(quizTarget);
    }

    const handleDelete = (target) => {
        setShowModalDelete(true);
        setDataDelete(target);

    }
    return (
        <>
            <div className="list-quiz">
                List Quizzes
            </div>
            <table className="table table-hover table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td scope="row">{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className="btn btn-warning mx-3" onClick={() => { handleEdit(item.id) }}> Edit</button>
                                    <button className="btn btn-danger" onClick={() => { handleDelete(item.id) }}> Delete</button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            <ModalDeleteQuiz
                dataDelete={dataDelete}
                show={showModalDelete}
                setShow={setShowModalDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdate}
                dataUpdate={dataUpdate}
                setShow={setShowModalUpdate}
                fetchAllQuiz={fetchAllQuiz}
            />
        </>

    )
}

export default QuizTable;