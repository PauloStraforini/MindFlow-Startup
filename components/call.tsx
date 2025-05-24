import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

function Call() {
  return (
    <>
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-400/20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-pink-300/20 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
    </>
  );
}

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-sm text-pink-800">
      {children}
    </div>
  );
}

function ButtonPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <button className="bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white font-bold py-3.5 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/30 transform hover:-translate-y-1 flex items-center justify-center group">
        {children}
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </Link>
  );
}

function ButtonSecondary({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-pink-300/50 hover:border-pink-300 text-pink-800 font-medium py-3.5 px-8 rounded-full text-lg transition-all duration-300 hover:bg-pink-500/30 backdrop-blur-sm"
    >
      {children}
    </button>
  );
}

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 text-pink-800 pt-20 pb-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <Call />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block px-3 py-1 bg-blue-600/60 rounded-full text-white font-medium text-sm mb-6 backdrop-blur-sm">
          <span className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Comece Hoje Mesmo
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para revolucionar sua prática clínica?
        </h2>
        <p className="text-xl mb-8 text-pink-800 max-w-2xl mx-auto leading-relaxed">
          Junte-se a centenas de psicólogos que já transformaram sua forma de trabalhar. Experimente gratuitamente por 7 dias e veja a diferença.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonPrimary href="psicologos/login">Comece Agora</ButtonPrimary>
          <ButtonSecondary>Agendar Demonstração</ButtonSecondary>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
          <TrustBadge>Dados Protegidos</TrustBadge>
          <TrustBadge>Suporte 24/7</TrustBadge>
          <TrustBadge>Satisfação Garantida</TrustBadge>
          <TrustBadge>Cancele Quando Quiser</TrustBadge>
        </div>
      </div>
    </section>
  );
}
