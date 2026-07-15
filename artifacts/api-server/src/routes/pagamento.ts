/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HEKSEL GENESIS — Backend de Pagamentos e Produção
 *  Rotas:
 *    POST /api/criar-pagamento   → cria cobrança PIX real no Asaas
 *    POST /api/webhook-asaas     → recebe confirmação de pagamento do Asaas
 *                                  e dispara pedido automático na Printful
 *
 *  Variáveis de ambiente necessárias (arquivo .env na raiz do api-server):
 *    ASAAS_API_KEY
 *    ASAAS_BASE_URL
 *    PRINTFUL_API_KEY
 *    PRINTFUL_STORE_ID
 *    PRINTFUL_VARIANT_MOLETOM
 *    PRINTFUL_VARIANT_CHAVEIRO   (opcional – brinde)
 *    PRINTFUL_VARIANT_ADESIVO    (opcional – brinde)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

// ── Credenciais via variáveis de ambiente ─────────────────────────────────────
const ASAAS_API_KEY   = process.env["ASAAS_API_KEY"]   ?? "";
const ASAAS_BASE_URL  = process.env["ASAAS_BASE_URL"]  ?? "https://sandbox.asaas.com/api/v3";
const PRINTFUL_API_KEY = process.env["PRINTFUL_API_KEY"] ?? "";
const PRINTFUL_STORE_ID = process.env["PRINTFUL_STORE_ID"] ?? "";

// ── Tipos internos ────────────────────────────────────────────────────────────
interface AsaasCustomerList { data: Array<{ id: string }> }
interface AsaasCustomer     { id: string }
interface AsaasPayment      { id: string; status: string; externalReference?: string; customer?: { email?: string } }
interface AsaasPixQrCode    { encodedImage: string; payload: string; expirationDate: string }

interface EnderecoCliente {
  nome?: string;
  rua?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  cep?: string;
  telefone?: string;
}

interface PedidoMeta {
  produto?: string;
  tamanho?: string;
  estampaUrl?: string;
  endereco?: EnderecoCliente;
}

// ── Helper: encontra ou cria cliente no Asaas ─────────────────────────────────
async function obterClienteAsaas(nome: string, cpf: string, email: string): Promise<string> {
  const cpfLimpo = cpf.replace(/\D/g, "");

  const buscaRes = await fetch(`${ASAAS_BASE_URL}/customers?cpfCnpj=${cpfLimpo}`, {
    headers: { access_token: ASAAS_API_KEY },
  });
  const buscaData = (await buscaRes.json()) as AsaasCustomerList;

  if (buscaData.data?.length > 0) {
    return buscaData.data[0].id;
  }

  const criarRes = await fetch(`${ASAAS_BASE_URL}/customers`, {
    method: "POST",
    headers: { access_token: ASAAS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ name: nome, cpfCnpj: cpfLimpo, email }),
  });
  const cliente = (await criarRes.json()) as AsaasCustomer;
  return cliente.id;
}

// ── Helper: cria pedido na Printful ──────────────────────────────────────────
async function criarPedidoPrintful(payload: object) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
  if (PRINTFUL_STORE_ID) headers["X-PF-Store-Id"] = PRINTFUL_STORE_ID;

  const res = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/criar-pagamento
//
//  Body JSON esperado:
//  {
//    nome:       string   – nome completo do cliente
//    cpf:        string   – CPF (com ou sem pontuação)
//    email:      string   – e-mail do cliente
//    telefone:   string   – telefone (opcional)
//    valor:      number   – valor em BRL (ex: 300)
//    produto:    string   – descrição do produto (ex: "Moletom Winter Core")
//    tamanho:    string   – tamanho escolhido (ex: "M")
//    estampaUrl: string   – URL pública do arquivo de estampa customizada
//    endereco:   object   – { nome, rua, complemento, cidade, estado, cep, pais, telefone }
//  }
//
//  Resposta:
//  {
//    pagamentoId:  string  – ID do pagamento no Asaas
//    status:       string  – status inicial (geralmente "PENDING")
//    qrCodeBase64: string  – imagem PNG em base64 para exibir no front-end
//    pixCopiaCola: string  – string "copia e cola" do PIX
//    expiracao:    string  – data/hora de expiração do QR Code
//  }
// ─────────────────────────────────────────────────────────────────────────────
router.post("/criar-pagamento", async (req, res) => {
  try {
    const { nome, cpf, email, valor, produto, tamanho, estampaUrl, endereco } = req.body as {
      nome: string;
      cpf: string;
      email: string;
      telefone?: string;
      valor: number;
      produto?: string;
      tamanho?: string;
      estampaUrl?: string;
      endereco?: EnderecoCliente;
    };

    if (!nome || !cpf || !email || !valor) {
      res.status(400).json({ erro: "Campos obrigatórios: nome, cpf, email, valor" });
      return;
    }

    // 1. Obter (ou criar) cliente no Asaas
    const customerId = await obterClienteAsaas(nome, cpf, email);

    // 2. Calcular vencimento: amanhã
    const vencimento = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // 3. Criar cobrança PIX no Asaas
    const paymentRes = await fetch(`${ASAAS_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        access_token: ASAAS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer:          customerId,
        billingType:       "PIX",
        value:             valor,
        dueDate:           vencimento,
        description:       `Heksel Genesis — ${produto ?? "Moletom Customizado"}`,
        // Dados do pedido guardados no externalReference para uso no webhook
        externalReference: JSON.stringify({ produto, tamanho, estampaUrl, endereco }),
      }),
    });

    const payment = (await paymentRes.json()) as AsaasPayment;

    if (!payment.id) {
      logger.error({ payment }, "Falha ao criar pagamento no Asaas");
      res.status(502).json({ erro: "Falha ao criar pagamento no Asaas", detalhe: payment });
      return;
    }

    // 4. Buscar QR Code PIX gerado pelo Asaas
    const pixRes = await fetch(`${ASAAS_BASE_URL}/payments/${payment.id}/pixQrCode`, {
      headers: { access_token: ASAAS_API_KEY },
    });
    const pixData = (await pixRes.json()) as AsaasPixQrCode;

    logger.info({ pagamentoId: payment.id }, "Pagamento PIX criado com sucesso");

    res.json({
      pagamentoId:  payment.id,
      status:       payment.status,
      qrCodeBase64: pixData.encodedImage,  // Exibir como <img src="data:image/png;base64,...">
      pixCopiaCola: pixData.payload,        // Copiar para o cliente
      expiracao:    pixData.expirationDate,
    });

  } catch (err) {
    logger.error({ err }, "Erro em POST /criar-pagamento");
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/webhook-asaas
//
//  Configure no painel do Asaas:
//    URL:   https://SEU-DOMINIO/api/webhook-asaas
//    Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
//
//  O Asaas enviará um POST com o seguinte body:
//  {
//    event:   "PAYMENT_RECEIVED" | "PAYMENT_CONFIRMED" | ...
//    payment: { id, status, value, externalReference, customer, ... }
//  }
//
//  Ao confirmar pagamento, este webhook:
//    1. Decodifica os dados do pedido (estampa, tamanho, endereço)
//    2. Cria o pedido automaticamente na Printful com a estampa, brindes e endereço
// ─────────────────────────────────────────────────────────────────────────────
router.post("/webhook-asaas", async (req, res) => {
  try {
    const evento = req.body as { event: string; payment: AsaasPayment };
    logger.info({ event: evento.event, paymentId: evento.payment?.id }, "Webhook Asaas recebido");

    // Responder 200 imediatamente para o Asaas não reenviar
    res.json({ ok: true });

    // Processar apenas eventos de pagamento confirmado/recebido
    if (evento.event !== "PAYMENT_RECEIVED" && evento.event !== "PAYMENT_CONFIRMED") {
      return;
    }

    const pagamento = evento.payment;
    if (!pagamento?.id) return;

    // Decodificar dados do pedido guardados no externalReference
    let pedido: PedidoMeta = {};
    try {
      pedido = JSON.parse(pagamento.externalReference ?? "{}") as PedidoMeta;
    } catch {
      logger.warn({ paymentId: pagamento.id }, "externalReference não é JSON válido");
    }

    // ── Montar payload da Printful ────────────────────────────────────────────
    const end = pedido.endereco ?? {};

    const printfulPayload = {
      // Confirmar e enviar imediatamente. Mude para false para revisar antes de enviar.
      confirm: true,

      recipient: {
        name:         end.nome       ?? "Cliente Heksel",
        address1:     end.rua        ?? "",
        address2:     end.complemento ?? "",
        city:         end.cidade     ?? "",
        state_code:   end.estado     ?? "",   // ex: "SP"
        country_code: end.pais       ?? "BR",
        zip:          end.cep        ?? "",
        phone:        end.telefone   ?? "",
        email:        pagamento.customer?.email ?? "",
      },

      items: [
        // ── Item principal: moletom customizado ───────────────────────────────
        // O variant_id deve ser o ID do produto configurado na sua conta Printful.
        // Encontre em: Printful Dashboard → Stores → Products → editar produto → Variants
        {
          variant_id: process.env["PRINTFUL_VARIANT_MOLETOM"] ?? "",
          quantity:   1,
          files: [
            {
              // "default" aplica na frente; use "back" para costas se necessário
              type: "default",
              // URL pública da estampa enviada pelo cliente. Deve ser acessível pela Printful.
              url:  pedido.estampaUrl ?? "",
            },
          ],
          // Se o moletom tiver opção de tamanho configurada na Printful:
          // options: [{ id: "size", value: pedido.tamanho ?? "M" }],
        },

        // ── Brinde 1: Chaveiro ───────────────────────────────────────────────
        // Descomente após cadastrar o chaveiro como produto no seu painel Printful
        // {
        //   variant_id: process.env["PRINTFUL_VARIANT_CHAVEIRO"] ?? "",
        //   quantity:   1,
        // },

        // ── Brinde 2: Adesivo ────────────────────────────────────────────────
        // {
        //   variant_id: process.env["PRINTFUL_VARIANT_ADESIVO"] ?? "",
        //   quantity:   1,
        // },
      ],
    };

    // ── Enviar pedido para a Printful ─────────────────────────────────────────
    const printfulOrder = (await criarPedidoPrintful(printfulPayload)) as { result?: { id: number } };
    logger.info({ printfulOrderId: printfulOrder?.result?.id, paymentId: pagamento.id }, "Pedido Printful criado com sucesso");

    // ── (Opcional) Enviar e-mail de confirmação para o cliente aqui ──────────
    // await enviarEmailConfirmacao({ email: pagamento.customer?.email, pedido });

  } catch (err) {
    logger.error({ err }, "Erro no webhook Asaas");
  }
});

export default router;
