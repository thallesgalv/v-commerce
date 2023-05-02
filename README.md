Link vercel para aplicação hospedada: https://v-commerce-visie.vercel.app/

# Comandos:

-   `pnpm install`  - Instala as dependências do projeto
-   `pnpm run dev`  - Inicia projeto em modo de desenvolvimento
-   `pnpm run build`  - Faz o build da aplicação para produção
-   `pnpm run start`  - Incicia o servidor de produção do projeto
-   `pnpm run lint`  - Realiza lint 


# Stack utilizada:

- React / Next.js /Typescript: Diversos motivos motivaram a escolha do Next.js: utilização de SSR para obter produtos faz todo sentido em um e-commerce (SEO é importante), sistema de rotas out of the box, recomendação da utilização na própria documentação oficial do React ao invés do CreateReactApp;
- TailwindCSS: para estilização rápida e produtiva;
- Axios: para requisições HTTP;
- ESlint + Prettier: para linting e padronização do código;
- React Hot Toast: para utilização de toasts;
- Iconify: biblioteca de ícones;
- NProgress: biblioteca para barra de carregamento de uma página

# Desafio:

A entrega deve ser feita através do Github.

Este teste de React é basicamente a criação de um e-commerce bastante simplificado.

Os dados devem ser obtidos através da API do DummyJSON. A documentação está disponível em "https://dummyjson.com/docs/products", e nela temos todos os endpoints necessários.

A aplicação deve ser composta por 3 telas. A seguir, você tem a descrição destas telas, seus requisitos e o tópico "diferencial(ais)", onde destacamos implementações não-obrigatórios que podem agregar pontos à sua entrega.

Sugestão: atente-se à tarefa de atender os requisitos básicos do teste. O básico bem feito será uma ótima entrega. Após esta entrega, caso queira, você pode implementar algum diferencial atualizando o conteúdo do repositório.

## (1) Tela "índice": listagem de produtos

Página que lista os produtos da loja, onde cada produto terá seu conjunto de botões de ação. Nesta página temos de ter um link para acesso à página/rota "carrinho de compras".

- Cada card de produto deve exibir: nome, preço "cheio" (exibir tachado), porcentagem de desconto e valor com desconto aplicado (com destaque), marca, "rating" e quantidade em estoque.

- A quantidade de produtos exibidos na listagem fica a critério do candidato.

- Cada produto deve também disponibilizar botões de ação:
  - ver mais: leva o usuário à página/rota "produto selecionado";
  - adicionar ao carrinho: adiciona o produto ao carrinho (quantidade = 1);
  - favoritar: favorita produto (a interface deve indicar que o produto foi favoritado, seja por texto ou ícone).

**Diferenciais**: carrossel exibindo alguns dos produtos; paginação; separação de produtos por categorias; caixa de busca.

## (2) Tela "produto selecionado": dados completo sobre o produto selecionado

Página que exibe todos os dados existentes do produto, inclusive imagens.

- A página deve ter um link "voltar", para o usuário retornar à página/rota "listagem de produtos".

- O produto deve ter os botões de ação:
  - adicionar ao carrinho: adiciona o produto ao carrinho (disponibilizar campo "quantidade" ao usuário);
  - favoritar: favorita produto (a interface deve indicar que o produto foi favoritado, seja por texto ou ícone).

**Diferencial**: carrossel exibindo as imagens do produto.

## (3) Tela "carrinho de compras": listagem dos produtos adicionados ao carrinho

Página que exibe os produtos adicionados ao carrinho de compras.

- Na página devemos ter o botão de ação "limpar carrinho", o qual exclui todos os itens do carrinho de compras (o usuário deve ser questionado se tem certeza sobre a ação).

- Cada produto deve ter os botões de ação:
  - atualizar quantidade: cada produto deve ter um campo para atualizar quantidade. O usuário deve ser alertado sobre a atualização da quantidade;
  - excluir: exclui produto do carrinho (usuário deve ser questionado se tem certeza sobre a ação).

## INSTRUÇÕES JAVASCRIPT

Pode-se utilizar "micro-frameworks" react, como o "Toastify", "React Rating", por exemplo. É altamente desejável o uso de Typescript.

Para alguns recursos, haverá a necessidade de armazenar dados (como dados para o carrinho e o recurso de favoritar produtos). Não é necessária a persistência de dados, podendo-se perder os dados na atualização da página. Caso opte-se pela persistência, pode-se usar localStorage / sessionStorage.
