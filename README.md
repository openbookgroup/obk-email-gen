# Openbook Email Signature Generator

Aplicação Next.js pronta para deploy no Vercel.

## O que faz

- Gera a assinatura oficial Openbook Group em HTML.
- Usa o template responsivo aprovado.
- Permite editar apenas:
  - Nome
  - Cargo, através de lista fechada
  - Número de telemóvel opcional
- Remove o telemóvel quando a opção “Não quero colocar o número” está ativa.
- Gera um ficheiro HTML para abrir no browser, copiar a assinatura renderizada e colar no Outlook.

## Como correr localmente

```bash
npm install
npm run dev
```

Abrir: http://localhost:3000

## Deploy no Vercel

1. Criar um repositório GitHub.
2. Enviar estes ficheiros para o repositório.
3. Ir a https://vercel.com.
4. New Project.
5. Selecionar o repositório.
6. Deploy.

## Atualizar lista de funções

Editar o array `JOB_TITLES` em `app/page.tsx`.

## Atualizar campos fixos

Editar o objeto `STATIC_CONFIG` em `app/page.tsx`.


## Atualização v5

- Cargos BIM normalizados em maiúsculas.
- Campo de telemóvel força o indicativo +351 e formata automaticamente como +351 xxx xxx xxx.
- Geração bloqueada quando o telemóvel não tem 9 dígitos, excepto quando o número é omitido.


## v6 hardening

- Table keeps responsive CSS while adding `width="500"` as an Outlook Classic fallback.
- Downloaded HTML body uses zero margin/padding to avoid copied spacing.
- Official flow remains: generate HTML, open in browser, copy rendered signature, paste into Outlook.


## v9 UI refinement

- Interface background updated to #000000.
- Form panels and footer use a dark theme with high-contrast white input fields.
- Removed the secondary CTA “Limpar campos”.
- Preview area hardened against overlap with fixed left column, min-width protection, max-width protection and table-layout fallback in preview only.
