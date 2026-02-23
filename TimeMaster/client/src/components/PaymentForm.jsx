import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentForm = ({ orderId, amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { userInfo } = useSelector(state => state.auth);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL isn't strictly necessary if redirect is 'if_required', but good practice
                return_url: `${window.location.origin}/order/${orderId}`,
            },
            redirect: 'if_required'
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment status: ' + paymentIntent.status);

            // Call our backend to mark order as Paid
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                };
                await axios.put(`/api/orders/${orderId}/pay`, {}, config);
                onSuccess(); // Trigger parent reload
            } catch (err) {
                setMessage('Payment succeeded but failed to update order system.');
            }
        } else {
            setMessage('Unexpected state');
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-sm w-full mx-auto shadow-sm">
            <h3 className="text-xl font-serif text-luxury-black tracking-widest uppercase mb-6 text-center">Complete Payment</h3>
            <PaymentElement className="mb-6" />
            <button
                disabled={isLoading || !stripe || !elements}
                className={`w-full py-4 text-sm font-bold tracking-widest uppercase text-white bg-luxury-black transition-colors flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-luxury-gold'}`}
            >
                {isLoading ? (
                    <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                    </span>
                ) : (
                    `Pay $${amount.toLocaleString()}`
                )}
            </button>
            {message && <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm border-l-4 border-red-500">{message}</div>}
        </form>
    );
};

export default PaymentForm;
