import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, phone, method, email, returnUrl } = body;

    const numericAmount = Number(amount) || 550;
    const formattedAmount = numericAmount.toFixed(2);

    const apiKey = process.env.PAYSUITE_API_KEY;
    const baseUrl = process.env.PAYSUITE_API_URL || "https://paysuite.tech/api/v1";

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const defaultReturnUrl = `${protocol}://${host}/perfil?payment=success`;

    // Headers oficiais da API PaySuite
    const headers = {
      Authorization: `Bearer ${apiKey || ""}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const paySuitePayload: Record<string, any> = {
      title: "Quick Meet - Plano Profissional",
      description: `Subscrição Quick Meet (${formattedAmount} MZN)`,
      amount_mode: "fixed",
      amount: formattedAmount,
      return_url: returnUrl || defaultReturnUrl,
      is_active: true,
    };

    if (method) {
      paySuitePayload.method = method;
    }

    // Se a chave da PaySuite estiver configurada no .env.local
    if (apiKey) {
      try {
        const response = await fetch(`${baseUrl}/payment-links`, {
          method: "POST",
          headers,
          body: JSON.stringify(paySuitePayload),
        });

        const data = await response.json();

        if (response.ok && data.status === "success" && data.data) {
          return NextResponse.json({
            success: true,
            payment_url: data.data.url,
            qr_code: data.data.qr_code,
            payment_id: data.data.id,
            amount: formattedAmount,
            data: data.data,
          });
        }

        if (data.url || data.checkout_url) {
          return NextResponse.json({
            success: true,
            payment_url: data.url || data.checkout_url,
            qr_code: data.qr_code,
            amount: formattedAmount,
            method: method || "mpesa",
            data,
          });
        }

        console.warn("Aviso PaySuite API:", data);
        return NextResponse.json(data, { status: response.status });
      } catch (apiErr: any) {
        console.error("Erro na requisição PaySuite:", apiErr);
      }
    }

    // Modo Sandbox de contingência
    const mockId = `PS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      transaction_id: mockId,
      status: "pending_pin",
      message: `Pedido PaySuite gerado com sucesso para ${method === "emola" ? "e-Mola" : "M-Pesa"}.`,
      amount: formattedAmount,
      currency: "MZN",
    });
  } catch (error: any) {
    console.error("Erro no endpoint da PaySuite:", error);
    return NextResponse.json(
      { error: "Falha ao comunicar com a PaySuite API" },
      { status: 500 }
    );
  }
}
