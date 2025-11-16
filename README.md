# 🏎️ Monaco GP - Retro Racing Game

Um jogo de corrida retrô inspirado no clássico Monaco GP, desenvolvido com Next.js, React e TypeScript. Jogue diretamente no seu navegador com controles simples e desafios progressivos.

**[🚀 Clique aqui para jogar](https://monacogp.vercel.app/)**


---

## 📋 Sobre o Jogo

Monaco GP é um jogo de corrida vertical onde você controla um carro que precisa desviar dos adversários enquanto a velocidade aumenta progressivamente. Quanto mais carros você ultrapassa, mais rápido e desafiador o jogo fica!

### Características

- **Personalização do Carro**: Escolha entre 6 cores diferentes para o seu veículo
- **Dificuldade Progressiva**: A velocidade aumenta a cada carro ultrapassado
- **Sistema de Pontuação**: Acompanhe sua pontuação e recorde pessoal
- **Visual Retro-Futurista**: Efeitos visuais inspirados nos arcades dos anos 80
- **Partículas de Velocidade**: Feedback visual da velocidade atual
- **Geração Aleatória**: Carros adversários aparecem em posições aleatórias
- **Responsivo**: Jogue em qualquer dispositivo

### Como Jogar

1. **Escolha a cor do seu carro** clicando no botão de paleta no canto superior esquerdo
2. Use as **setas do teclado** para controlar:
   - **← Seta Esquerda**: Move o carro para a esquerda
   - **→ Seta Direita**: Move o carro para a direita
3. **Desvie dos carros adversários** para evitar colisões
4. A **velocidade aumenta automaticamente** a cada carro ultrapassado
5. Pressione **R** para reiniciar após game over

### Objetivo

Ultrapasse o máximo de carros possível sem colidir! A cada carro ultrapassado, sua pontuação aumenta e o jogo fica mais rápido e desafiador.

---

## Tecnologias Utilizadas

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19.2](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário

### UI & Design
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes reutilizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Componentes headless acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Suporte a temas claro/escuro

### Ferramentas & Utilitários
- **Canvas API** - Renderização 2D do jogo
- **React Hooks** - Gerenciamento de estado e efeitos
- **Custom Hooks** - `use-keyboard` para controles do teclado
- **Vercel Analytics** - Análise de desempenho e uso

## Estrutura do Projeto

\`\`\`
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz da aplicação
│   ├── page.tsx                 # Página inicial (jogo)
│   └── globals.css              # Estilos globais e tema
│
├── components/                   # Componentes React
│   ├── game/                    # Componentes do jogo
│   │   ├── color-selector.tsx   # Seletor de cores do carro
│   │   ├── game-canvas.tsx      # Canvas principal do jogo
│   │   ├── game-over-screen.tsx # Tela de game over
│   │   └── game-renderer.ts     # Lógica de renderização
│   ├── ui/                      # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (50+ componentes)
│   └── monaco-gp-game.tsx       # Componente principal do jogo
│
├── hooks/                        # Custom React Hooks
│   ├── use-keyboard.ts          # Hook para controles do teclado
│   ├── use-mobile.ts            # Detecção de dispositivos móveis
│   └── use-toast.ts             # Sistema de notificações
│
├── lib/                          # Funções utilitárias
│   ├── game-constants.ts        # Constantes do jogo
│   ├── game-utils.ts            # Funções auxiliares do jogo
│   └── utils.ts                 # Utilitários gerais
│
├── types/                        # Definições TypeScript
│   └── game.ts                  # Tipos do jogo
│
└── public/                       # Arquivos estáticos
    └── ...
\`\`\`

### Arquitetura do Jogo

O jogo é estruturado em camadas modulares:

1. **Camada de Apresentação** (`src/components/game/`)
   - `game-canvas.tsx`: Componente React que gerencia o canvas
   - `game-over-screen.tsx`: Interface de game over
   - `color-selector.tsx`: UI de personalização

2. **Camada de Lógica** (`src/components/monaco-gp-game.tsx`)
   - Loop principal do jogo (requestAnimationFrame)
   - Gerenciamento de estado do jogo
   - Detecção de colisões
   - Sistema de pontuação

3. **Camada de Renderização** (`src/components/game/game-renderer.ts`)
   - Desenho da pista e elementos visuais
   - Renderização de carros com efeitos 3D
   - Partículas de velocidade
   - HUD (pontuação, velocidade, recorde)

4. **Camada de Entrada** (`src/hooks/use-keyboard.ts`)
   - Captura de eventos do teclado
   - Prevenção de scroll com setas
   - Estado dos controles

5. **Camada de Dados** (`src/lib/game-constants.ts`, `types/game.ts`)
   - Constantes do jogo (velocidade, dimensões, cores)
   - Tipos TypeScript para entidades do jogo
   - Funções utilitárias

---

## Como Executar Localmente

### Pré-requisitos

- **Node.js** 18+ instalado
- **npm**, **yarn** ou **pnpm** como gerenciador de pacotes

### Instalação

1. Clone o repositório:
\`\`\`bash
git clone <seu-repositorio>
cd monaco-gp-racing
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

\`\`\`bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria a build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter
\`\`\`

---

## Personalização

### Ajustar Dificuldade

Edite o arquivo `src/lib/game-constants.ts`:

\`\`\`typescript
export const GAME_CONSTANTS = {
  BASE_SPEED: 3,              // Velocidade inicial
  SPEED_INCREMENT: 0.5,       // Incremento por carro ultrapassado
  CARS_PER_SPEED_UP: 1,      // Carros para aumentar velocidade
  // ...
}
\`\`\`

### Adicionar Cores

Adicione novas cores no array `PLAYER_COLORS` em `lib/game-constants.ts`:

\`\`\`typescript
export const PLAYER_COLORS = [
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Verde', value: '#10b981' },
  // Adicione mais cores aqui
]
\`\`\`

### Modificar Dimensões

Ajuste as dimensões do canvas em `lib/game-constants.ts`:

\`\`\`typescript
export const CANVAS_WIDTH = 400    // Largura do canvas
export const CANVAS_HEIGHT = 600   // Altura do canvas
export const LANE_WIDTH = 80       // Largura das pistas
\`\`\`

---

## Mecânicas do Jogo

### Sistema de Velocidade

A velocidade base aumenta progressivamente:
- **Velocidade Inicial**: 3 pixels/frame
- **Distância Percorrida**: 
- **Velocidade Máxima**: Sem limite (aumenta indefinidamente)

### Detecção de Colisão

O jogo usa colisão por bounding box (AABB):
- Verifica sobreposição de retângulos entre o jogador e adversários
- Colisão resulta em game over imediato

### Sistema de Pontuação

- **1 ponto** por cada metro ultrapassado
- **Recorde** salvo no estado do jogo
- Display em tempo real no HUD

### Geração de Carros

- Carros aparecem em uma das 4 pistas disponíveis
- Posição aleatória com intervalo mínimo entre spawns
- Cores aleatórias da paleta de adversários

---

## Deploy na Vercel

### Deploy Automático

1. Faça push do código para o GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. A Vercel detecta Next.js automaticamente
4. Clique em "Deploy"


## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request


## Créditos

Inspirado no clássico **Monaco GP** (1979) da SEGA.

Desenvolvido usando tecnologias modernas da web.

### Desenvolvedor

- **Nome**: Gustavo Xavier Saldanha
- **Curso**: Information Systems
- **Instituição**: CEFET/RJ Campus Nova Friburgo
- **Email**: [gustavosaldxav@gmail.com](mailto:gustavosaldxav@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/gustavosaldxav](https://www.linkedin.com/in/gustavosaldxav)


<div align="center">
  <p>Desenvolvido para a metéria de Desenvolvimento de Jogos Digitais</p>
  <p>© 2025</p>
</div>