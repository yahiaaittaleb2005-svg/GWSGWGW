import express from "express";
import Stripe from "stripe";
const app = express();
app.use(express.json());
app.use(express.static("public"));

const stripe = new Stripe(process.env.STRIPE_KEY);

app.post("/create-checkout-session", async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:[{
      price_data:{
        currency:"eur",
        product_data:{name:"Halal Life Planner"},
        unit_amount:990
      },
      quantity:1
    }],
    mode:"payment",
    success_url:"/success.html",
    cancel_url:"/cancel.html"
  });
  res.json({url:session.url});
});

app.listen(3000);
