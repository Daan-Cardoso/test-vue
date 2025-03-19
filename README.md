# Teste Técnico para Desenvolvedor(a) Front-end Vue.js

## Descrição

Este teste técnico tem como objetivo avaliar suas habilidades de desenvolvimento Front-end com Vue.js. Você deverá criar uma aplicação de lista de tarefas interativa, seguindo os requisitos e diferenciais descritos abaixo.

## Requisitos Obrigatórios

1.  **Adição de Tarefas:**
    - [x] Implementar um campo de input de texto e um botão "Adicionar".
    - [x] Ao clicar no botão, a tarefa digitada no input deve ser adicionada à lista de tarefas.
    - [x] O campo de input deve ser limpo após a adição da tarefa.
    - [x] Implementar validação para impedir a adição de tarefas vazias.
2.  **Exibição da Lista de Tarefas:**
    - [x] Exibir a lista de tarefas abaixo do campo de input.
    - [x] Cada tarefa deve ser exibida em um item de lista individual.
    - [x] A lista deve ser ordenada por data de criação (tarefas mais recentes no topo).
    - [x] Implementar a funcionalidade de excluir tarefas individualmente.
3.  **Marcar Tarefa como Concluída:**
    - [x] Implementar um checkbox ao lado de cada tarefa.
    - [x] Ao marcar o checkbox, a tarefa deve ser marcada como concluída.
    - [x] Aplicar uma estilização visual para tarefas concluídas (por exemplo, riscar o texto).
4.  **Persistência de Dados:**
    - [x] Utilizar `localStorage` para armazenar as tarefas.
    - [x] As tarefas devem ser persistidas mesmo após o fechamento e reabertura do navegador.
5.  **Uso de `computed` e `watch`:**
    - [x] Utilizar `computed` para criar uma lista filtrada de tarefas concluídas.
    - [x] Utilizar `watch` para salvar a lista de tarefas no `localStorage` sempre que a lista for alterada.
6.  **Estilização:**
    - [x] Aplicar estilização básica à aplicação utilizando Tailwind CSS.
    - [x] A estilização deve ser responsiva, adaptando-se a diferentes tamanhos de tela.
    - [x] Criar um layout básico para a aplicação, com boa organização visual.

## Diferenciais (Opcionais, mas valorizados)

* **Nível Básico:**
    - [x] Implementar filtragem por tarefas concluídas/pendentes.
    - [x] Implementar ordenação por data de conclusão.
* **Nível Intermediário:**
    - [x] Criar um modal para edição do texto da tarefa.
    - [x] Implementar autenticação fake com um formulário de login simples.
    - [x] Proteger rotas da aplicação, permitindo acesso apenas a usuários autenticados (utilizando Vue Router).
* **Nível Avançado:**
    - [x] Utilizar `async setup` e Composition API para buscar tarefas de uma API externa (simulada).
    - [] Implementar testes e2e com Cypress para os principais cenários de uso.
    - [x] Otimizar a performance da aplicação com lazy loading de imagens (se aplicável) e debounce na pesquisa de tarefas.
    - [x] Implementar atualizações em tempo real da lista de tarefas utilizando WebSockets ou polling (simulando um backend).

## Instruções de Execução

1.  Faça um fork deste repositório para a sua conta do GitHub.
2.  Clone o fork para a sua máquina local:

    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repo.git](https://github.com/seu-usuario/nome-do-repo.git)
    cd nome-do-repo
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

4.  Inicie o projeto:

    ```bash
    npm run dev
    ```

    O servidor local será iniciado e a aplicação poderá ser acessada em `http://localhost:5173`.

5.  Em outro console rode a micro-api*:
    ```bash
    cd micro-api
    npm install
    npm run start
    ```

    A api será iniciada possibilitando a conexão com o websocket e poderá ser requisitada em `http://localhost:3000`

    *Ps: Quando a api é requisitada em qualquer endpoint, por estar dentro do mesmo diretorio do projeto ele força uma atualização na página, eu desenvolvi a api apenas para esse teste, então mantive dentro do diretorio

## Critérios de Avaliação

* **Funcionalidade:** A aplicação atende a todos os requisitos obrigatórios?
* **Qualidade do Código:** O código é limpo, organizado, legível e segue boas práticas de desenvolvimento Vue.js?
* **Estilização:** A estilização é agradável, responsiva e utiliza Tailwind CSS de forma eficiente?
* **Testes (se aplicável):** Os testes cobrem os cenários de teste especificados e são implementados de forma adequada?
* **Performance:** A aplicação apresenta bom desempenho e otimizações relevantes?
* **Implementação de Diferenciais:** O candidato implementou diferenciais, demonstrando habilidades adicionais?

## Tempo Estimado

* Não foi definido um tempo para a conclusão do teste, apenas faça e faça da melhor forma que você conseguir! Envie para a gente bem caprichado, pois o carinho do código também será um diferencial para a avaliação.

## Observações

* Utilize a versão mais recente do Node.js e npm.
* Sinta-se à vontade para utilizar bibliotecas adicionais, desde que justifique o uso.
* Documente o código de forma clara e concisa.
* Em caso de dúvidas, entre em contato com alexandre@take5.com.br.
* Assim que o teste for realizado por favor envie um e-mail para alexandre@take5.com.br informando sua conclusão.
