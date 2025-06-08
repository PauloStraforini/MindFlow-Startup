
import { NextRequest, NextResponse } from "next/server";
import { Preference } from 'mercadopago';
import mpClient from "@/src/lib/mercado-pago";

export async function POST(req: NextRequest) {
    const {testeId, userEmail} = await req.json();

    try{
        const preference = new Preference(mpClient)

        const createdPreference = await preference.create({
            body: {
                external_reference: testeId,
                metadata: {
                    testeId,
                },
                ...(userEmail && {payer: {email: userEmail}}),

                items: [
                    {
                        id: "",
                        title: "",
                        description: "",
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: 200,
                        category_id: "services",
                    },
                ],
                payment_methods: {
                    installments: 12,
                    // excluded_payment_methods:[
                    //     {id: "bolbradesco"},
                    //     {id: "pac"}
                    // ],
                    // excluded_payment_types:[
                    //     {id: "debit_card"},
                    //     {id: "credit_card"}
                    // ],
                },
                auto_return: "approved",
                back_urls: {
                    success: '${process.env.NEXT-PUBLIC_APP_URL}/api/mercado-pago/success',
                    failure: '${process.env.NEXT-PUBLIC_APP_URL}/api/mercado-pago/failure',
                    pending: '${process.env.NEXT-PUBLIC_APP_URL}/api/mercado-pago/pending',
                },
            }
        })

        if(!createdPreference) {
            return NextResponse.json(
                {error: "Failed to create Mercado Pago preference."},
                { status: 500 }
            )
        }

        return NextResponse.json({
            preferenceId: createdPreference.id,
            initPoint: createdPreference.init_point,
        })

    } catch (error) {
        console.error("Error creating Mercado Pago preference:", error);
        return NextResponse.json(
            {error: "Failed to create Mercado Pago preference."},
            { status: 500 }
        )
    }

}
