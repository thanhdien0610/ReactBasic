import _ from "lodash";
import { useState } from "react";
import Lightbox from 'react-awesome-lightbox';
const Question = (props) => {
    const { data } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    // console.log('detail quiz:', data);
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (e, answerId, questionId) => {
        // console.log('check: ', e.target.checked);
        props.handleCheckBox(answerId, questionId)

    }
    console.log('dt: ', data);
    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data?.image}`} />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data?.image}`}
                            title={`Question image`}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>
                    }
                </div>
                :
                <div className="q-image">

                </div>
            }
            <div className="question">Question {data?.questionId}: {data?.questionDescription}? </div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        onChange={(e) => { handleCheckBox(e, a.id, data?.questionId) }}
                                        checked={a.isSelected}
                                    />
                                    <label className="form-check-label" >
                                        {a.description}

                                    </label>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Question;