import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, resetAuth } from '../redux/slices/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }
        if (isSuccess || userInfo) {
            navigate('/profile');
        }
        dispatch(resetAuth());
    }, [userInfo, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <div className="pt-32 pb-20 min-h-[80vh] flex flex-col items-center justify-center bg-luxury-dark px-4">
            <div className="bg-luxury-black p-10 mt-10 w-full max-w-md shadow-sm border border-luxury-gray">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif text-white font-bold tracking-widest uppercase mb-2">SIGN IN</h1>
                    <p className="text-sm text-luxury-text-gray tracking-widest">Access your GAMAGE account.</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-luxury-text-gray mb-2 tracking-widest uppercase">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gray text-white focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-luxury-text-gray mb-2 tracking-widest uppercase">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gray text-white focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-luxury-gold text-white hover:bg-white hover:text-luxury-black transition-colors uppercase tracking-widest text-sm font-semibold mt-4"
                    >
                        {isLoading ? 'Processing...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-luxury-text-gray tracking-wide">
                    New to GAMAGE?{' '}
                    <Link to="/register" className="text-luxury-gold hover:text-white transition-colors uppercase tracking-widest font-semibold ml-2">
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
