Vídeo explicando o funcionamento do projeto no link: https://drive.google.com/file/d/10KnAi06N5Fw4wx7fGzrbXPleYToynPsH/view?usp=sharing

# Dashboard de Monitoramento Industrial

Sistema de monitoramento em tempo real para linha de produção industrial, desenvolvido como desafio técnico. O dashboard fornece visibilidade sobre o estado das máquinas, métricas de performance e alertas operacionais.

## Pré-requisitos

- **Node.js** 18 ou superior
- **pnpm** 9.x (gerenciador de pacotes)

## Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd industrial-dashboard

# Instale as dependências
pnpm install
```

## Execução

```bash
# Desenvolvimento (inicia o servidor Next.js)
pnpm dev

# Build de produção
pnpm build

# Iniciar em modo produção (após o build)
pnpm start
```

Para rodar apenas o app web:

```bash
pnpm dev --filter=web
```

## Testes

```bash
# Rodar todos os testes
pnpm test --filter=web

# Ou dentro do diretório apps/web
cd apps/web && pnpm test

# Modo watch (re-executa ao alterar arquivos)
cd apps/web && pnpm test:watch
```

## Estrutura do Monorepo

```
industrial-dashboard/
├── apps/
│   └── web/                 # Aplicação Next.js (dashboard)
├── packages/
│   ├── types/               # Tipos TypeScript compartilhados
│   ├── ui/                  # Componentes React reutilizáveis
│   ├── data/                # Simulador de métricas (fallback)
│   └── db/                  # Camada de dados estruturada (mock)
├── turbo.json
└── pnpm-workspace.yaml
```

### Pacotes

- **@repo/types** – Interfaces e tipos (Machine, Alert, OEE, etc.)
- **@repo/ui** – MetricCard, StatusIndicator, AlertBadge
- **@repo/data** – Funções de geração de métricas simuladas
- **@repo/db** – Camada de dados com estrutura de “tabelas” em memória

## Decisões Técnicas

### Turborepo

Monorepo com Turborepo para compartilhar código entre apps e packages, com cache de build e execução paralela de tarefas.

### Next.js 16 + React 19

Framework escolhido para SSR, API Routes e boa DX. As rotas `/api/machine`, `/api/alerts` e `/api/history` servem dados simulados em tempo real.

### SWR

Para fetching e revalidação automática (refresh a cada 2–5 segundos), mantendo a UI atualizada sem polling manual.

### Recharts

Biblioteca de gráficos para histórico de temperatura, RPM e eficiência, com suporte a dark mode.

### Tailwind CSS v4

Estilização utilitária e suporte a dark mode via classe `.dark` no `<html>`.

### Camada de Dados (@repo/db)

Estrutura simulada de banco com “tabelas” em memória (`machineTable`, `alertsTable`, `metricHistoryTable`), preparada para futura migração para SQLite ou outro backend.

## Funcionalidades

- **Monitoramento em tempo real**: estados (Ligada, Desligada, Manutenção, Erro), temperatura, RPM, tempo de operação
- **Indicadores de tendência**: ▲/▼ nos cards de métricas
- **Gráficos**: histórico de temperatura, RPM e eficiência
- **Sistema de alertas**: níveis INFO, WARNING, CRITICAL, ordenação por severidade, tempo relativo, feedback visual/sonoro para críticos
- **Métricas OEE**: Overall, Disponibilidade, Performance, Qualidade
- **Dark/Light mode**: toggle com persistência em `localStorage`
- **Status de conexão**: indicação visual de perda de conexão

## Licença

Projeto desenvolvido para fins de avaliação técnica.

