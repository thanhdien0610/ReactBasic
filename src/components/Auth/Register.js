import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='signup-contain'>
            <div className='left-side'>
                <div className='content'>
                    <h1 className='header-left'>
                        Sign up
                        <br></br>
                        and come on in
                    </h1>
                    <picture className='picture'>
                        <source srcSet="https://www.typeform.com/static/images/signup-page/product-sample@1x.webp" type="image/webp" />
                        <img loading="lazy" src="https://www.typeform.com/static/images/signup-page/product-sample@1x.webp" alt="Alt Text!" />
                    </picture>
                    <h2 className='copyright'> &copy; Typeform</h2>
                </div>


            </div>
            <div className='right-side'>
                <div className='content'>
                    <div className='select-lang'>

                    </div>
                    <div className='header-right'>

                        <p >Already have an account?</p>
                        <div>
                            <button
                                className='btn-submit'
                                onClick={() => { navigate('/login') }}
                            > Login</button>
                        </div>


                    </div>
                    <div className='form-contain'>
                        <p>Typeform</p>
                        <h2 className="slogan">Get better data with conversational forms, surveys, quizzes &amp; more.</h2>
                        <RegisterForm></RegisterForm>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default Register;