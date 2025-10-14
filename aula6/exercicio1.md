# Descrição do exercício

Crie um prompt simples pedindo ao modelo para escrever uma carta de recomendação sem fornecer nenhum contexto adicional.  
Depois, revise o prompt adicionando detalhes sobre o destinatário e o propósito da carta.  
**Pergunta:** Como o contexto influenciou a qualidade da resposta?

---

### Modelo
**llama-3.1-8b-instant**

---

## Prompt Inicial
```
Escreva uma carta de recomendação.
```

### Saída inicial
```
[Aqui vai a letra de "Endereço" com a informação completa do destinatário]

[Data]

[Destinatário]  
[Endereço do Destinatário]  
[Cidade, Estado, CEP]

Prezado(a) [Destinatário],

Eu, [Seu Nome], tenho o prazer de redigir esta carta de recomendação em favor de [Nome do Candidato], que é um colega(a) e amigo(a) com quem tive a oportunidade de trabalhar no âmbito de [Carga de Trabalho].

Durante o período de [Período de Trabalho], observei com atenção e interesse o desenvolvimento profissional de [Nome do Candidato]. Suas habilidades, talentos e características são de fato excepcionais, e posso afirmar sem hesitação que ele(a) é uma pessoa de grande competência e experiência em [Área de Especialização].

[Nome do Candidato] é uma pessoa altamente dedicada e disciplinada. Suas habilidades organizacionais e planejamento são de alta qualidade, e ele(a) é capaz de gerenciar múltiplos projetos ao mesmo tempo, sempre atendendo os prazos estipulados e atingindo metas superiores.

Além das suas habilidades técnicas, [Nome do Candidato] é uma pessoa que valoriza a colaboração e o trabalho em equipe. Ele(a) é sempre disposto(a) a ajudar os colegas e a compartilhar suas habilidades e experiências.

Em resumo, estou mais que satisfeito(a) com o trabalho e a contribuição de [Nome do Candidato] enquanto integrante de nossa equipe. Eu tenho certeza de que ele(a) continuará a ser um profissional de alta qualidade e um membro valioso de qualquer equipe que ele(a) pertença.

Por isso, eu gostaria de recomendar [Nome do Candidato] para qualquer oportunidade de emprego ou oportunidade que possa surgir no futuro. Ele(a) é uma pessoa verdadeiramente excepcional e merece uma oportunidade para mostrar suas habilidades e capacidades.

Se você tiver alguma dúvida ou precisar de mais informações, por favor não hesite em entrar em contato comigo.

Agradeço o seu tempo e consideração.

Sinceramente,

[Seu Nome]  
[Seu Cargo]  
[Seu E-mail]  
[Seu Telefone]
```

---

## Prompt Final
```
Escreva uma carta de recomendação para Leonardo Ricci, que está se candidatando à vaga de desenvolvedor frontend na empresa META. Trabalhamos juntos por 3 anos, onde ele atuou como analista sênior de projetos. Quero destacar suas habilidades em liderança, organização e comunicação. A carta deve ser profissional, conter o nome do destinatário no início, uma descrição completa de suas competências com exemplos práticos, além de um parágrafo final reforçando a recomendação. Também inclua uma despedida cordial com meus dados fictícios (nome, cargo, email, telefone).
```

### Saída final
```
Leonardo Ricci  
Cidade, Estado, CEP

Prezado Leonardo,

Eu, Luana Souza, estou mais que feliz em redigir esta carta de recomendação em seu favor, à medida que você está se candidatando à vaga de desenvolvedor frontend na empresa META.

Trabalhamos juntos por 3 anos como analista sênior de projetos, onde você demonstrou habilidades naturais em liderança, organização e comunicação. Suas habilidades de liderança são verdadeiramente notáveis, pois você sempre soube estimular e motivar a equipe, garantindo que todos os membros estivessem cientes dos objetivos e expectativas. Por exemplo, durante o projeto "E-Market", você liderou a equipe de forma assertiva e criou um ambiente colaborativo, onde todos os membros estavam comprometidos e motivados para alcançar os resultados desejados. Sob sua liderança, a equipe entregou um projeto de sucesso, que atendeu às necessidades dos clientes e superou as expectativas do gerente.

Sua organização e planejamento também são habilidades fundamentais para você. Você sempre soube priorizar as tarefas e gerenciar o tempo da equipe de forma eficiente, garantindo que os projetos fossem entregues dentro do prazo e com qualidade. Por exemplo, durante o projeto "E-Store", você criou um cronograma detalhado e estimou as necessidades de recursos necessárias, garantindo que a equipe tivesse acesso a todos os recursos necessários para realizar o trabalho. Isso permitiu que a equipe trabalhasse de forma eficiente e entregasse um projeto de qualidade, dentro do prazo estabelecido.

Além disso, sua habilidade de comunicação é fundamental para qualquer projeto. Você sempre soube explicar conceitos complexos de forma clara e concisa, garantindo que todos os membros da equipe estivessem comprometidos e motivados. Por exemplo, durante a reunião de projeto "E-Commerce", você explicou as necessidades dos clientes e os objetivos do projeto de forma clara e concisa, garantindo que todos os membros da equipe estivessem alinhados e comprometidos.

Em conclusão, estou mais que satisfeito com o trabalho e a contribuição de Leonardo enquanto integrante da nossa equipe. Ele é um profissional de alta qualidade e um membro valioso de qualquer equipe que ele pertença. Se você estiver procurando por um desenvolvedor frontend que seja capaz de criar soluções inovadoras e eficientes, eu não hesitaria em recomendar Leonardo para essa vaga.

Sinceramente,

Luana Souza  
Analista de Negócios  
luana.souza@email.com  
(11) 98765-4321
```

---

## Resposta
Ao comparar os dois prompts:

- O **prompt inicial**, por ser genérico, gerou uma carta vaga e padronizada, sem detalhes específicos sobre o candidato ou o propósito.  
- O **prompt final**, ao incluir nome, cargo, empresa, tempo de trabalho e habilidades com exemplos, gerou uma resposta mais completa, personalizada e convincente.  

- Mais contexto = Mais qualidade.  
