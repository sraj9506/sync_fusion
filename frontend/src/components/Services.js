import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const checkIcon = (
  <svg width="25" height="6" viewBox="0 0 8 6" className="fill-current">
    <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z" />
  </svg>
);

const crossIcon = (
  <svg width="25" height="7" viewBox="0 0 8 8" className="fill-current">
    <path d="M7.4499 0.512524C7.1124 0.175024 6.5874 0.175024 6.2499 0.512524L3.9999 2.80002L1.7124 0.512524C1.3749 0.175024 0.849902 0.175024 0.512402 0.512524C0.174902 0.850024 0.174902 1.37502 0.512402 1.71252L2.7999 4.00002L0.512402 6.28752C0.174902 6.62502 0.174902 7.15002 0.512402 7.48752C0.662402 7.63752 0.887402 7.75002 1.1124 7.75002C1.3374 7.75002 1.5624 7.67502 1.7124 7.48752L3.9999 5.20002L6.2874 7.48752C6.4374 7.63752 6.6624 7.75002 6.8874 7.75002C7.1124 7.75002 7.3374 7.67502 7.4874 7.48752C7.8249 7.15002 7.8249 6.62502 7.4874 6.28752L5.1999 4.00002L7.4874 1.71252C7.7874 1.37502 7.7874 0.850024 7.4499 0.512524Z" />
  </svg>
);

const OfferList = ({ text, status }) => {
  return (
    <div className="mb-3 flex items-center">
      <span className="mr-3 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
        {status === "active" ? checkIcon : crossIcon}
      </span>
      <p className="m-0 text-base font-medium text-body-color">{text}</p>
    </div>
  );
};

const BackgroundSvg = () => (
  <div className="absolute bottom-0 right-0 z-[-1]">
    <svg width="179" height="158" viewBox="0 0 179 158" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.5"
        d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
        fill="url(#paint0_linear_70:153)"
      />
      <path
        opacity="0.3"
        d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9707 249.304 72.2906 203.455C80.3001 160.636 144.874 133.384 178.255 0.150879Z"
        fill="url(#paint1_linear_70:153)"
      />
      <defs>
        <linearGradient id="paint0_linear_70:153" x1="65.3303" y1="63.256" x2="130.397" y2="132.472" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9D6FF" />
          <stop offset="1" stopColor="#F1F5FF" />
        </linearGradient>
        <linearGradient id="paint1_linear_70:153" x1="133.807" y1="0.150879" x2="69.6909" y2="69.7076" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9D6FF" />
          <stop offset="1" stopColor="#F1F5FF" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const pricingPlans = [
  {
    title: "1 Month",
    price: 100,
    description: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
    offers: [
      { text: "All UI Components", status: "active" },
      { text: "Use with Unlimited Projects", status: "active" },
      { text: "Commercial Use", status: "active" },
      { text: "Email Support", status: "active" },
      { text: "Lifetime Access", status: "inactive" },
      { text: "Free Lifetime Updates", status: "inactive" },
    ],
  },
  {
    title: "2 Months",
    price: 500,
    description: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
    offers: [
      { text: "All UI Components", status: "active" },
      { text: "Use with Unlimited Projects", status: "active" },
      { text: "Commercial Use", status: "active" },
      { text: "Email Support", status: "active" },
      { text: "Lifetime Access", status: "inactive" },
      { text: "Free Lifetime Updates", status: "inactive" },
    ],
  },
  {
    title: "3 Months",
    price: 1000,
    description: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
    offers: [
      { text: "All UI Components", status: "active" },
      { text: "Use with Unlimited Projects", status: "active" },
      { text: "Commercial Use", status: "active" },
      { text: "Email Support", status: "active" },
      { text: "Lifetime Access", status: "inactive" },
      { text: "Free Lifetime Updates", status: "inactive" },
    ],
  },
];

const PricingBox = ({ plan }) => {
  const token = useState();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const handlePurchase = async () => {
    if (!token) {
      navigate('/signin');
      return;
    }
    try {
      // Initiate payment by requesting an orderId from your server
      const { data } = await axios.post('http://localhost:5000/api/payment/order', { planValue: plan.price }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (data.orderId) {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: plan.price * 100, // Razorpay expects amount in paise (i.e., 100 times the price)
          currency: 'INR',
          name: 'Your Company',
          order_id: data.orderId,
          handler: async (response) => {
            try {
              // Verify payment with Razorpay's payment verification endpoint
              const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                planTitle: plan.title,
                planValue: plan.price,
              }, {
                headers: { 'Authorization': `Bearer ${token}` },
              });

              if (verifyResponse.data.success) {
                setNotification('Payment successfully verified!');
                navigate('/welcome');
              } else {
                setNotification('Payment verification failed. Please try again.');
              }
            } catch (error) {
              console.error('Error during payment verification:', error);
              setNotification('Payment verification encountered an error.');
            }
          },
          prefill: {
            name: 'User Name', // Dynamically set user name here
            email: 'user@example.com', // Dynamically set user email here
          },


        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      } else {
        setNotification('Failed to initiate payment. Please try again later.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setNotification('Payment initiation failed. Please try again.');
    }
  };

  return (

    <div className="relative z-10 rounded-sm bg-white px-8 py-10 shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark">
      <div className="flex items-center justify-between">
        <h3 className="price mb-2 text-[32px] font-bold text-black dark:text-white">
          ₹{plan.price}
          <span className="time text-lg font-medium text-body-color">/mo</span>
        </h3>
        <h4 className="mb-2 text-xl font-bold text-dark dark:text-white">
          {plan.title}
        </h4>
      </div>
      <p className="mb-7 text-base text-body-color">{plan.description}</p>

      <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
        <button
          onClick={handlePurchase}
          className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Start Free Trial
        </button>
      </div>

      <ul className="space-y-2">
        {plan.offers.map((offer, index) => (
          <li key={index} className="flex items-center whitespace-nowrap">
            <OfferList text={offer.text} status={offer.status} />
          </li>
        ))}
      </ul>

      {notification && (
        <div className={`notification mt-4 text-center ${notification.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
          {notification}
        </div>
      )}

      <BackgroundSvg />

    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="w-full mx-auto flex flex-col items-center justify-center text-center" style={{ maxWidth: "565px", marginBottom: "100px" }}>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Simple and Affordable Pricing
          </h2>
          <p className="text-base leading-relaxed text-body-color md:text-lg text-center">
            There are many variations of passages of Lorem Ipsum available, but most have been altered in some way.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingBox key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
