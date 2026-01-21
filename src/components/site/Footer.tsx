import { cn } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-rp-dark text-white" role="contentinfo">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" aria-label="Retífica Premium - Página inicial">
              <span className="text-xl font-heading font-bold">
                RETÍFICA PREMIUM
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              {/* TODO: Adicionar descrição quando disponível */}
              Especialistas em retífica de cabeçotes com mais de 20 anos de
              experiência.
            </p>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">CONTATO</h3>
            <div className="space-y-2 text-sm text-gray-400">
              {/* TODO: Adicionar informações de contato reais */}
              <p>Rua das Oficinas, 24</p>
              <p>Sertãozinho - SP, 14170-000</p>
              <p>(16) 3624-4610</p>
              <p>(16) 99302-1919</p>
              <p>contato@retificapremium.com.br</p>
            </div>
          </div>

          {/* Funcionamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">
              FUNCIONAMENTO
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              {/* TODO: Adicionar horários reais */}
              <p>SEG - SEX: 08:00 - 18:00</p>
              <p>SÁBADO: 08:00 - 12:00</p>
              <p>DOMINGO: FECHADO</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Retífica Premium. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
