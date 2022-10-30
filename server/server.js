const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ urlencoded: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("sk_test_51LyTBDSILt1YPv2Q2kpT7Sejjnl041tUvOTn1Afb0RViRc1avNafxapcd7eQwQfGEBeAaQuS5bK51T0JRaWWIkPo00n72ApaQf")

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'IN'],
        },
            shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'inr',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 5,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 7,
                    },
                }
                }
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'inr',
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 1,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 1,
                    },
                }
                }
            },
            ],
           line_items:  req.body.items.map((item) => ({
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.name,
                images: [item.product]
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })),
           mode: "payment",
           success_url: "http://localhost:4242/success.html",
           cancel_url: "http://localhost:4242/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log("app is running on 4242"))