import { Sparkles, Check } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  color: string;
  buttonColor: string;
  bgColor: string;
  shadowColor: string;
  popular?: boolean;
};

const Plans: Plan[] = [
  {
    name: "Básico",
    price: "R$ 199",
    period: "/mês",
    features: [
      "Agendamento de sessões",
      "Prontuários eletrônicos básicos",
      "Relatórios mensais",
      "Suporte por email",
      "Até 20 pacientes",
    ],
    color: "border-sky-600 hover:border-sky-400",
    buttonColor: "bg-sky-600 hover:bg-sky-700",
    bgColor: "bg-sky-900/70",
    shadowColor: "hover:shadow-sky-600/50",
  },
  {
    name: "Profissional",
    price: "R$ 299",
    period: "/mês",
    features: [
      "Tudo do plano Básico",
      "Integração com videoconferência",
      "Relatórios semanais personalizados",
      "Recursos terapêuticos avançados",
      "Suporte prioritário",
      "Até 50 pacientes",
    ],
    popular: true,
    color: "border-purple-600 hover:border-purple-400",
    buttonColor:
      "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
    bgColor: "bg-purple-900/70",
    shadowColor: "hover:shadow-purple-600/50",
  },
  {
    name: "Premium",
    price: "R$ 350",
    period: "/mês",
    features: [
      "Tudo do plano Profissional",
      "API personalizada",
      "Treinamento exclusivo",
      "Gerenciamento de múltiplos consultórios",
      "Suporte 24/7",
      "Pacientes ilimitados",
    ],
    color: "border-sky-600 hover:border-sky-400",
    buttonColor: "bg-sky-600 hover:bg-sky-700",
    bgColor: "bg-sky-900/70",
    shadowColor: "hover:shadow-sky-600/50",
  },
];

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Você continuará tendo acesso até o final do período pago.",
  },
  {
    question: "Como funciona o período de teste gratuito?",
    answer:
      "Oferecemos 7 dias de teste gratuito em todos os planos. Você só será cobrado após esse período se decidir continuar usando nossa plataforma.",
  },
  {
    question: "A plataforma é segura para dados sensíveis de pacientes?",
    answer:
      "Sim, utilizamos criptografia de ponta a ponta e seguimos todas as normas da LGPD e do CFP para garantir a segurança e privacidade dos dados.",
  },
];

function Pricing({ plan }: { plan: Plan }) {
  return (
    <div
      className={`${plan.bgColor} p-8 rounded-2xl shadow-xl border-2 ${plan.color} ${plan.shadowColor} transition-all duration-500 transform hover:scale-105 relative group`}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-max">
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold px-6 py-2 rounded-full uppercase inline-block shadow-lg">
            Mais Escolhido
          </span>
        </div>
      )}

      <div className={`${plan.popular ? "pt-4" : ""}`}>
        <h3 className="text-2xl font-semibold mb-4 text-white tracking-wide">
          {plan.name}
        </h3>
        <p className="text-3xl font-bold mb-2 text-white">
          {plan.price}
          <span className="text-lg text-sky-300 font-normal">{plan.period}</span>
        </p>
        <p className="text-sky-300 mb-8">Cancele a qualquer momento</p>

        <ul className="mb-8 space-y-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sky-200">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Botão comentado para você adaptar */}
        {/* <button
          className={`${plan.buttonColor} text-white py-2 px-4 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-md`}
        >
          Escolher Plano
        </button> */}
      </div>
    </div>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="bg-purple-900/70 p-6 rounded-xl shadow-lg border border-purple-700 hover:border-purple-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h4 className="text-lg font-semibold mb-3 text-white">{faq.question}</h4>
      <p className="text-sky-300 leading-relaxed">{faq.answer}</p>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="precos" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-sky-900/30 rounded-full text-sky-300 font-medium text-sm mb-4">
            <span className="flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-2 text-sky-300" />
              Preços
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-lg text-sky-200">
            Escolha o plano ideal para o seu perfil profissional e comece a
            transformar sua prática.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Plans.map((plan, idx) => (
            <Pricing key={idx} plan={plan} />
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">
            Perguntas Frequentes
          </h3>
          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
