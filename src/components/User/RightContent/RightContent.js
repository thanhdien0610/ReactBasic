import './RightContent.scss'
import { useSelector } from 'react-redux';
import CountDown from './CountDown';
const RightContent = (props) => {

    const onTimeUp = () => {
        props.handleFinish();
    }
    const { dataQuiz, indexSelectedQuestion } = props;
    const getClassQuestion = (question, index) => {
        //console.log('question: ', question);
        //console.log('check: ', );
        //console.log('index: ', index, '::: selectedIndex: ', indexSelectedQuestion);
        const listClassName = ['question'];
        let isClicked = false;
        let isSelected = false;
        if (index === +indexSelectedQuestion) {
            isClicked = true;
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.some(answer => answer.isSelected === true)
            if (isAnswered) {
                isSelected = true;
            }
        }
        if (isClicked) listClassName.push('clicked');
        if (isSelected) listClassName.push('selected');
        //console.log(listClassName.join(" "));
        //return 'question'
        return listClassName.join(" ");
    }


    return (
        <>
            <div className='main-timer'>
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-${index}`}
                                className={getClassQuestion(item, index)}
                                onClick={() => props.setIndex(index)}
                            >{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent;