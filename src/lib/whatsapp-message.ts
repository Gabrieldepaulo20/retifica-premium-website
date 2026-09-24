/** Keep supplied answers intact; only add missing qualification prompts. */
export function buildEvaluationMessage(base: string, leadCode?: string) {
  const prompts: Array<[RegExp, string]> = [
    [/(veículo|veiculo|modelo)\s*:/i, "Veículo/modelo: "],
    [/motor\s*:/i, "Motor (se souber): "],
    [/cidade\s*:/i, "Cidade: "],
    [/(peça|peca|cabeçote|cabecote)\s*:|desmontad|no carro/i, "Cabeçote: ainda no carro / já desmontado"],
  ];
  const missing = prompts.filter(([pattern]) => !pattern.test(base)).map(([, text]) => text);
  const lines = [base.trim(), ...(missing.length ? ["", ...missing] : [])];
  // A short reference enables deterministic matching; never expose click IDs.
  if (leadCode && !base.includes(leadCode) && !/RP-[A-Z0-9-]+/.test(base)) lines.push("", `Referência do atendimento: ${leadCode}`);
  return lines.join("\n");
}
