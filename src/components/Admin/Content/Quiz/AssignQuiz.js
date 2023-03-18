import Select from 'react-select';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getDataAllQuizForAdmin, postAssignQuizToUser } from "../../../../services/apiServices";
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
    const dispatch = useDispatch();
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        await getDataAllQuizForAdmin(dispatch);
    }

    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && +res.EC === 0) {
            let newList = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username ? item.username : 'unknown'} - ${item.email}`
                }
            })
            setListUser(newList);
        }
    }

    const listQuiz = useSelector(state => state?.admin?.allQuiz);
    const options = listQuiz.map((item) => {
        return {
            value: item.id,
            label: `${item.id} - ${item.name} - ${item.difficulty}`
        }
    })
    const handleAssign = async (quizId, userId) => {
        let res = await postAssignQuizToUser(quizId, userId);
        if (res && +res.EC === 0) {
            toast.success(res.EM);
            // setSelectedQuiz({});
            // setSelectedUser({});
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select quiz: </label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={options}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select user: </label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div className='assign '>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleAssign(selectedQuiz.value, selectedUser.value)}
                > Assign quiz to user </button>
            </div>
        </div>
    )
}

export default AssignQuiz;