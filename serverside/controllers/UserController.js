import { Webhook } from 'svix'
import userModel from '../models/userModels.js'
import express, { response } from 'express'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

// Api controller function to manager clerk user with database 
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with clerk webhook instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        const { data, type } = req.body


        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id, 
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url

                }

                await userModel.create(userData)
                res.json({})


                break;
            }

            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url

                }

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json({})
                break;
            }


            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({})
                break;
            }

            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API controller function to get user available credits data
const userCredits = async (req, res) => {


    try {
        const { clerkId } = req.body; // Extract data from request body 


        const userData = await userModel.findOne({ clerkId })
        res.json({ success: true, credits: userData.creditBalance })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }

}

//Gateway initialize 
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to make payment for credits 
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body

        const userData = await userModel.findOne({ clerkId })
        if (!userData || !planId) {

            return res.json({ success: false, message: "Invalid credentials" })

        }
        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                break;
        }

        date = Date.now()

        // Creating Transaction 
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount:amount * 100,
            currency : process.env.CURRENCY,
            receipt: newTransaction._id

        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if (error) {
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Api controller function to verify razorpay payment
const verifyrazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Failed' });
            }

            // Fetching user data
            const userData = await userModel.findOne({ clerkId: transactionData.clerkId });

            if (!userData) {
                return res.json({ success: false, message: 'User not found' });
            }

            const creditBalance = userData.creditBalance + transactionData.credits;

            await userModel.findByIdAndUpdate(userData._id, { creditBalance });

            // Updating the transaction as paid
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            res.json({ success: true, message: "Credits added" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export { clerkWebhooks, userCredits, paymentRazorpay, verifyrazorpay };