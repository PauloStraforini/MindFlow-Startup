// hooks/useMercadoPago.ts
import { useRouter } from "next/navigation";

export default function useMercadoPago() {
    const router = useRouter();

    async function createMercadoPagoCheckout({
        testeId,
        userEmail
    }: {
        testeId: string;
        userEmail?: string;
    }) {
        try {
            const response = await fetch("/api/mercado-pago/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testeId,
                    userEmail,
                }),
            });

            const data = await response.json();
            router.push(data.initPoint);
        } catch (error) {
            console.error("Error creating Mercado Pago checkout:", error);
            throw error;
        }
    }

    return {
        createMercadoPagoCheckout
    };
}
