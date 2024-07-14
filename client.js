// client.js

// আপনার Publishable Key দিয়ে Stripe ইনিশিয়ালাইজ করুন
const stripe = Stripe('your_publishable_key');

// Elements তৈরি করুন
const elements = stripe.elements();
const cardElement = elements.create('card');

// Card Element মাউন্ট করুন
cardElement.mount('#card-element');

// পেমেন্ট ফর্ম সাবমিট ইভেন্ট হ্যান্ডলার
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // কার্ড থেকে টোকেন তৈরি করুন
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
        // ত্রুটি বার্তা প্রদর্শন করুন
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // টোকেন সার্ভারে পাঠান
        const response = await fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.id })
        });

        if (response.ok) {
            alert('Payment successful!');
        } else {
            alert('Payment failed. Please try again.');
        }
    }
});
