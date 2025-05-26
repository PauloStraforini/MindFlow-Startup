import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes"

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {

    const metadata = paymentData.metadata 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testeId = metadata.teste_id as string
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userEmail = metadata.user_email as string
    console.log ("PAGAMENTO COM SUCESSO", paymentData)
} 