export interface Line_items{
    price_data:{
        currency: "hkd",
        product_data: {
            name:string,
            images:string[]
        },
        unit_amount: number},
    quantity: number
    }[]
    


    // app.post('/create-checkout-session', async (req, res) => {
    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ['card'],
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: 'usd',
    //             product_data: {
    //               name: 'Stubborn Attachments',
    //               images: ['https://i.imgur.com/EHyR2nP.png'],
    //             },
    //             unit_amount: 2000,
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //       mode: 'payment',
    //       success_url: `${YOUR_DOMAIN}/success.html`,
    //       cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    //     });
    //     res.json({ id: session.id });
    //   });
      