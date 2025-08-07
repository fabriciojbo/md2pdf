# Markdown to PDF

Uma ferramenta simples e eficiente para converter arquivos Markdown em PDF usando Node.js, markdown-it e Puppeteer.

## 📋 Descrição

O **md2pdf** é um conversor de Markdown para PDF que oferece:

- **Conversão rápida**: Transforma arquivos Markdown em PDF de alta qualidade
- **Estilização personalizada**: CSS customizado para melhor apresentação
- **Suporte completo ao Markdown**: Tabelas, listas, código, links, etc.
- **Interface simples**: Linha de comando fácil de usar
- **Cross-platform**: Funciona em Windows, macOS e Linux

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Instalação do projeto

1. Clone o repositório:
```bash
git clone https://github.com/fabriciojbo/md2pdf.git
cd md2pdf
```

2. Instale as dependências:
```bash
pnpm install
```

3. Torne o script executável (Linux/macOS):
```bash
chmod +x md2pdf
```

## 📖 Como usar

### Uso básico

```bash
# Converter um arquivo Markdown para PDF
./md2pdf arquivo.md

# Especificar o nome do arquivo de saída
./md2pdf arquivo.md saida.pdf

# Usar o script npm
pnpm convert arquivo.md
```

### Exemplos

```bash
# Converter README.md para README.pdf
./md2pdf README.md

# Converter com nome personalizado
./md2pdf documentacao.md relatorio.pdf

# Converter arquivo em subdiretório
./md2pdf docs/guia.md
```

## 🛠️ Funcionalidades

### Suporte ao Markdown

- **Cabeçalhos**: `# ## ### #### ##### ######`
- **Ênfase**: *itálico*, **negrito**, `código inline`
- **Listas**: ordenadas e não ordenadas
- **Links**: [texto](url)
- **Imagens**: ![alt](url)
- **Tabelas**: com formatação automática
- **Blocos de código**: com syntax highlighting
- **Citações**: > texto citado

### Estilização

O PDF gerado inclui:

- Fonte legível (Segoe UI, Arial)
- Cores contrastantes para melhor leitura
- Espaçamento otimizado
- Bordas e sombras em elementos de código
- Formatação de tabelas profissional
- Margens adequadas para impressão

## 📁 Estrutura do projeto

```
md2pdf/
├── index.js          # Script principal de conversão
├── md2pdf           # Script executável (Linux/macOS)
├── package.json      # Configurações do projeto
├── pnpm-workspace.yaml
└── README.md        # Este arquivo
```

## 🔧 Dependências

- **markdown-it**: Parser Markdown para HTML
- **puppeteer**: Geração de PDF a partir de HTML

## 🐛 Solução de problemas

### Erro: "Node.js is not installed"
Instale o Node.js a partir do [site oficial](https://nodejs.org/).

### Erro: "Chrome not found" (Linux)
O Puppeteer tentará usar o Chrome instalado no sistema. Se não encontrar, instale o Google Chrome.

### Erro de permissão no script
Execute:
```bash
chmod +x md2pdf
```

## 📝 Licença

Este projeto está licenciado sob a GPL - General Public License v3.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Fabricio Pereira Rabelo**

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
