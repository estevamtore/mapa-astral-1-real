// Textos baseados na abordagem de Elizabeth Teissier — psicológica, simbólica e centrada no caráter.
// Listas de signos na ordem Áries → Peixes. Só o servidor importa este arquivo.
import "server-only";

// O que cada planeta representa (aparece como subtítulo de cada seção).
export const TEMA = {
  sol: "sua essência",
  lua: "suas emoções",
  mercurio: "como você pensa e se comunica",
  venus: "como você ama e o que te atrai",
  marte: "como você age e luta pelo que quer",
  jupiter: "onde você cresce e tem sorte",
  saturno: "suas lições e responsabilidades",
  urano: "onde você busca liberdade",
  netuno: "seus sonhos e sua sensibilidade",
  plutao: "onde você se transforma",
};

export const MERCURIO = [
  // Áries
  "Seu pensamento é rápido, assertivo e direto. Teissier descrevia Mercúrio em Áries como a mente que decide antes de terminar de pensar — uma intuição veloz que frequentemente acerta, mas que pode atropelhar nuances importantes. Você fala com convicção e tem o dom de iniciar conversas e projetos. Aprender a ouvir com a mesma energia com que fala é o caminho para se comunicar com ainda mais eficácia.",
  // Touro
  "Seu pensamento é metódico e sensorial. Teissier associava Mercúrio em Touro à mente que precisa de tempo para processar — não por lentidão, mas por profundidade. Você não muda de opinião facilmente, porque raramente forma uma sem ter pesado cada aspecto. Quando fala, vale a pena ouvir: há solidez e senso prático em cada palavra.",
  // Gêmeos
  "Mercúrio em Gêmeos é o planeta em seu próprio signo — e Teissier via nisso uma mente excepcionalmente ágil, capaz de apreender rapidamente qualquer tema e de comunicá-lo com clareza. Você pensa em múltiplas direções ao mesmo tempo e tem o dom raro de simplificar o complexo. O desafio é o foco: sua mente prefere a amplitude à profundidade, e às vezes precisar escolher.",
  // Câncer
  "Você pensa com o coração. Teissier descrevia Mercúrio em Câncer como a mente que retém o que tocou — que aprende pelo afeto e se comunica melhor quando se sente seguro. Sua memória emocional é extraordinária; sua intuição, um instrumento de leitura do outro que raramente falha. Em ambientes de confiança, você se expressa com uma riqueza que surpreende.",
  // Leão
  "Você pensa com criatividade e se comunica com autoridade. Teissier via em Mercúrio em Leão o dom do contador de histórias: você narra, convence e ilumina com palavras. Há um calor natural na sua forma de falar que cativa. O cuidado está em não confundir convicção com inflexibilidade — nem toda ideia brilhante precisa ser defendida como uma bandeira.",
  // Virgem
  "Mercúrio em Virgem é o pensamento em seu estado mais preciso. Teissier considerava essa posição uma das mais analíticas do zodíaco: você percebe o detalhe que todos deixaram passar, organiza com rigor e comunica com clareza cirúrgica. Sua mente é uma ferramenta de serviço — o risco é deixar o perfeccionismo bloquear o que poderia ser apenas bom o suficiente.",
  // Libra
  "Você pensa pesando os dois lados — e Teissier via nisso uma virtude rara. Mercúrio em Libra produz uma mente diplomática, capaz de ver a lógica de pontos de vista opostos e de comunicar ideias com elegância. Você convence sem agredir. O desafio é tomar posição quando necessário: a busca pelo equilíbrio perfeito pode paralisar a decisão.",
  // Escorpião
  "Seu pensamento é investigativo e penetrante. Teissier descrevia Mercúrio em Escorpião como a mente que vai ao fundo — que não aceita a superfície como resposta e que percebe o que está oculto por trás do que é dito. Você tem um talento natural para a psicologia, a pesquisa e o que permanece não dito. Sua comunicação pode ser intensa; sua percepção, quase telepática.",
  // Sagitário
  "Você pensa em grande escala. Teissier associava Mercúrio em Sagitário à mente filosófica — aquela que busca o sentido por trás dos fatos e que prefere as grandes ideias aos detalhes miúdos. Você tem entusiasmo genuíno ao compartilhar o que sabe e uma sinceridade que, às vezes, dispensa os filtros. Profundidade e diplomacia são os aprendizados.",
  // Capricórnio
  "Seu pensamento é estratégico e econômico. Teissier via em Mercúrio em Capricórnio uma mente que fala pouco e pesa cada palavra — que prefere a eficiência à eloquência e o longo prazo ao imediato. Você tem credibilidade natural porque não diz o que não verificou. A seriedade do seu pensamento é uma forma de respeito pelo outro.",
  // Aquário
  "Você pensa fora do padrão — e Teissier considerava isso um dom genuinamente raro. Mercúrio em Aquário produz ideias que aparecem antes do tempo, conexões que ninguém faria e uma capacidade de analisar o sistema de fora dele. Você comunica de forma original e pode ser incompreendido antes de ser admirado. Ambos, em geral, acontecem.",
  // Peixes
  "Você pensa por imagens, intuições e associações. Teissier descrevia Mercúrio em Peixes como a mente poética — aquela que apreende o mundo de forma impressionista e que comunica muito mais do que as palavras dizem. Você entende o subtexto e o não-dito com facilidade. O desafio é estruturar esse fluxo quando a precisão é necessária.",
];

export const VENUS = [
  // Áries
  "No amor, você é direto e apaixonado. Teissier via em Vênus em Áries a expressão mais impulsiva do afeto: você sente, declara e age. A conquista te energiza; a rotina afetiva, menos. Precisa de alguém que te desafie e que tenha vida própria. Amor, para você, começa sempre com uma centelha — e precisa continuar sendo aceso.",
  // Touro
  "Você ama com lealdade e com os sentidos. Teissier associava Vênus em Touro — planeta em seu próprio signo — à expressão mais constante e sensorial do amor: presença, toque, conforto, e a segurança de saber que o outro ficará. Você não ama por impulso: ama por escolha, e quando escolhe, raramente muda de ideia.",
  // Gêmeos
  "Você se apaixona pela inteligência. Teissier descrevia Vênus em Gêmeos como o amor que vive de conversa e de novidade — de alguém que surpreende, que faz rir e que mantém o interesse vivo. Você pode amar mais de uma dimensão de uma pessoa ao mesmo tempo e tem dificuldade com o que é repetitivo. Leveza não é superficialidade: é o idioma do seu coração.",
  // Câncer
  "Você ama cuidando. Teissier identificava em Vênus em Câncer um afeto profundo e protetor — aquele que cuida antes de ser pedido e que guarda com carinho tudo que teve valor. Você precisa de segurança emocional para se abrir completamente. Quando se sente em casa ao lado de alguém, ama com uma devoção que poucas posições igualitam.",
  // Leão
  "Você ama de forma calorosa, generosa e com toda a sua presença. Teissier via em Vênus em Leão um coração que precisa ser admirado — e que, quando o é, transborda em lealdade e devoção. Romance é essencial: gestos, declarações e demonstrações públicas de afeto importam. Você não ama pela metade.",
  // Virgem
  "Você demonstra amor pelo que faz, não pelo que diz. Teissier descrevia Vênus em Virgem como a expressão discreta do afeto: você cuida, resolve, organiza e está presente nos detalhes que passam despercebidos para os outros. Precisa de um parceiro que valorize essa linguagem. Aprender a pedir e a receber com a mesma graça com que dá é o trabalho amoroso desta posição.",
  // Libra
  "Você é romântico e refinado — e Teissier via em Vênus em Libra, seu domicílio, a expressão mais harmoniosa do amor: elegante, justo, atento e profundamente comprometido com a beleza da relação. Você não tolera grosseria nem desequilíbrio afetivo. Parceria, para você, é uma arte que se cultiva com cuidado e reciprocidade.",
  // Escorpião
  "Você ama com intensidade total. Teissier considerava Vênus em Escorpião uma das posições mais profundas do zodíaco: você não consegue amar pela superfície, nem suportar vínculos sem substância. Entrega e confiança são a base — e quando se sente traído, a ferida é real e longa. Mas quando a confiança existe, a profundidade do que você oferece é extraordinária.",
  // Sagitário
  "Você ama com liberdade e com ideais. Teissier descrevia Vênus em Sagitário como o amor que precisa de espaço para crescer — de aventura, de expansão, de um parceiro que seja também um companheiro de descobertas. Você ama com entusiasmo e generosidade, mas sufoca em relações possessivas. A fidelidade, quando existe, é por escolha consciente — e muito mais forte por isso.",
  // Capricórnio
  "Você leva o amor a sério. Teissier associava Vênus em Capricórnio a um afeto que constrói — que prefere o comprometimento real ao romance passageiro, e que demonstra amor com constância, presença e responsabilidade. Você não se entrega fácil, mas quando o faz, é para sempre. Parceiros que confundem sua seriedade com frieza logo descobrem a ternura que havia por baixo.",
  // Aquário
  "Você valoriza amizade dentro do amor — e Teissier via nisso uma exigência genuinamente moderna. Vênus em Aquário ama quem respeita sua liberdade e sua singularidade. Você se atrai por pessoas originais e não tolera relacionamentos que sufocam o que você é. O amor ideal, para você, é uma parceria entre iguais — intelectualmente estimulante e emocionalmente honesta.",
  // Peixes
  "Você ama com uma generosidade que beira o absoluto. Teissier descrevia Vênus em Peixes — exaltação do planeta — como a posição do amor transcendente: compassivo, sensível, capaz de perdoar o que outros não perdoariam. O risco está em dissolver-se no outro, em confundir compaixão com sacrifício. Quando você ama alguém que sabe receber esse amor, acontece algo raro e belo.",
];

export const MARTE = [
  // Áries
  "Você age com a velocidade do instinto. Teissier via em Marte em Áries — planeta em seu próprio signo — a expressão mais pura da vontade em ação: você decide, parte e pergunta depois. Competição te estimula; espera te esgota. Sua coragem é real, e quando direcionada, capaz de abrir caminhos que outros nem vislumbram.",
  // Touro
  "Sua força é a persistência silenciosa. Teissier descrevia Marte em Touro como a energia que demora a arrancar, mas que, uma vez em movimento, não para. Você constrói com determinação e raramente deixa algo pela metade. A raiva, quando surge, emerge devagar — mas quando aparece, é avassaladora. Paciência é sua arma mais poderosa.",
  // Gêmeos
  "Você age com a mente. Teissier associava Marte em Gêmeos à luta travada em palavras — argumentos, debates, estratégias comunicativas. Você é mais eficiente quando pode usar a inteligência como ferramenta. Diversidade de frentes te mantém ativo; monotonia, paralisa. Aprenda a finalizar o que começa com a mesma energia com que inicia.",
  // Câncer
  "Você age movido pela emoção e pelo instinto protetor. Teissier via em Marte em Câncer uma força que emerge especialmente quando alguém que você ama está em risco. Você defende com uma intensidade que surpreende quem só conhecia sua face acolhedora. O desafio é separar o que precisa de proteção do que simplesmente precisa de espaço.",
  // Leão
  "Você age com paixão e orgulho. Teissier descrevia Marte em Leão como o guerreiro que luta pela própria honra — e pela dos outros. Você precisa acreditar no que faz; sem entusiasmo, a energia cai pela metade. Com ele, é capaz de liderar, inspirar e conquistar com uma grandiosidade que raramente passa despercebida.",
  // Virgem
  "Você age com método e precisão. Teissier identificava em Marte em Virgem uma eficiência notável: você planeja antes de executar, corrige no caminho e entrega com um cuidado que outros raramente alcançam. Perfeccionismo pode ser obstáculo quando exige demais do processo. Quando calibrado, é uma das posições mais competentes do zodíaco.",
  // Libra
  "Você age pela via da persuasão e da estratégia. Teissier via em Marte em Libra — posição de queda do planeta — uma energia que prefere negociar a confrontar, mas que tem uma firmeza real quando uma causa justa está em jogo. Você luta pelo equilíbrio e pela justiça com uma elegância que nem sempre é reconhecida como força — mas é.",
  // Escorpião
  "Você age com determinação absoluta e silenciosa. Teissier considerava Marte em Escorpião — signo de co-regência — uma das posições de maior poder de realização do zodíaco. Você não recua, não desiste e raramente revela o que está planejando. Sua intensidade pode intimidar; sua perseverança, transformar montanhas. Use essa força com consciência.",
  // Sagitário
  "Você age por ideais e com entusiasmo. Teissier via em Marte em Sagitário uma energia expansiva — que precisa de propósito para se mover e de liberdade para se expressar plenamente. Você luta com otimismo e raramente com amargura. Quando acredita em algo, não há obstáculo que diminua sua disposição de ir até o fim.",
  // Capricórnio
  "Você age com ambição disciplinada. Teissier associava Marte em Capricórnio — posição de exaltação — à expressão mais madura e estratégica da ação: você planeja a longo prazo, elimina o supérfluo e constrói com paciência cirúrgica. Não desperdiça força; investe. O resultado, quando chega, tende a ser sólido e duradouro.",
  // Aquário
  "Você age de forma independente e, frequentemente, antes do tempo. Teissier via em Marte em Aquário uma energia revolucionária — que luta por princípios coletivos com uma convicção pessoal intensa. Você não aceita injustiça passivamente e tem o dom de mobilizar outros em torno de causas que acredita. O caminho é unir visão e pragmatismo.",
  // Peixes
  "Você age guiado pela intuição e pela compaixão. Teissier descrevia Marte em Peixes como uma força sutil — não de confronto, mas de dedicação silenciosa ao que tem sentido. Você se mobiliza profundamente quando há um propósito maior envolvido. A dificuldade está em agir quando as águas estão turvas e a direção, incerta.",
];

export const JUPITER = [
  // Áries
  "Você cresce quando assume riscos e vai à frente sem esperar permissão. Teissier associava Júpiter em Áries à expansão pelo pioneirismo — a sorte que aparece para quem age com coragem e iniciativa, mesmo sem garantias.",
  // Touro
  "Você prospera quando constrói com paciência e valoriza o que já tem. Teissier via em Júpiter em Touro uma abundância que cresce devagar e dura — ligada à terra, à beleza, aos recursos materiais bem administrados.",
  // Gêmeos
  "Você cresce aprendendo, trocando e se comunicando. Teissier associava Júpiter em Gêmeos à expansão pelo conhecimento e pelas conexões — cursos, contatos, projetos paralelos e a capacidade de circular entre mundos diferentes.",
  // Câncer
  "Você prospera pelo cuidado e pela família. Teissier via em Júpiter em Câncer — sua exaltação — uma generosidade que atrai generosidade: quanto mais você nutre os outros, mais abundância volta para você, em afeto, segurança e reconhecimento.",
  // Leão
  "Você cresce quando se expressa com confiança e assume o centro. Teissier associava Júpiter em Leão à expansão pela criatividade e pela liderança — oportunidades que se abrem quando você ousa ser quem é sem pedir desculpas.",
  // Virgem
  "Você prospera pelo trabalho bem-feito e pela disposição de ser útil. Teissier via em Júpiter em Virgem uma sorte que vem do esforço cotidiano — da precisão, da entrega e da capacidade de ver onde os outros podem melhorar.",
  // Libra
  "Você cresce através das parcerias e das alianças. Teissier associava Júpiter em Libra à expansão pelas relações — bons acordos, parcerias frutíferas e a capacidade de criar equilíbrio onde havia conflito.",
  // Escorpião
  "Você prospera nas transformações e no que os outros consideram perdas. Teissier via em Júpiter em Escorpião uma abundância que emerge das crises — dos recursos compartilhados, das heranças, do que é regenerado e transformado.",
  // Sagitário
  "Júpiter em Sagitário é o planeta em seu próprio signo. Teissier considerava essa posição a mais afortunada do zodíaco: você cresce por natureza — pela fé, pela busca, pelo otimismo que abre portas que a lógica fecharia.",
  // Capricórnio
  "Você prospera com disciplina e visão de longo prazo. Teissier via em Júpiter em Capricórnio uma expansão sólida — que constrói devagar, que não desperdiça e que colhe com uma consistência que atravessa o tempo.",
  // Aquário
  "Você cresce em grupos, causas e redes de pessoas. Teissier associava Júpiter em Aquário à expansão pelo coletivo — ideias inovadoras que encontram seu momento, projetos sociais que ganham escala e amizades que se tornam oportunidades.",
  // Peixes
  "Você prospera pela compaixão e pela espiritualidade. Teissier via em Júpiter em Peixes — também seu domicílio tradicional — uma abundância que vem do invisível: intuição, fé, criatividade e a capacidade de tocar o que está além do racional.",
];

export const SATURNO = [
  // Áries
  "Sua lição é a paciência e a maturidade da ação. Teissier via em Saturno em Áries o desafio de aprender que a impulsividade sem estrutura não sustenta conquistas. Com o tempo, você transforma coragem em liderança verdadeira.",
  // Touro
  "Sua lição está na relação com recursos e segurança. Teissier associava Saturno em Touro ao aprendizado de construir estabilidade sem apego — de valorizar o que tem sem temer perder o que ainda virá.",
  // Gêmeos
  "Sua lição é dar profundidade ao pensamento e clareza à comunicação. Teissier via em Saturno em Gêmeos o desafio de transformar a dispersão em foco — de aprender a dizer menos e significar mais.",
  // Câncer
  "Sua lição está na segurança emocional e nos vínculos familiares. Teissier associava Saturno em Câncer ao aprendizado de construir um lar interno — de aprender a pedir apoio e a receber cuidado sem sentir que isso é fraqueza.",
  // Leão
  "Sua lição é se expressar sem depender da aprovação alheia. Teissier via em Saturno em Leão o desafio de confiar no próprio valor — de brilhar por convicção, não por necessidade de reconhecimento externo.",
  // Virgem
  "Sua lição é equilibrar exigência e aceitação. Teissier associava Saturno em Virgem ao aprendizado de que a perfeição não existe — e que o bom trabalho bem-feito já é, em si, uma forma de excelência.",
  // Libra
  "Saturno em Libra está em exaltação. Teissier via aqui a lição do compromisso maduro: aprender que relações verdadeiras exigem limites, respeito e responsabilidade mútua. Quando integrado, você torna-se um mestre nas parcerias.",
  // Escorpião
  "Sua lição está na entrega e na confiança. Teissier associava Saturno em Escorpião ao aprendizado de lidar com a perda, o poder e os próprios abismos — de transformar o medo da profundidade na sua maior força.",
  // Sagitário
  "Sua lição é construir crenças com responsabilidade e humildade. Teissier via em Saturno em Sagitário o desafio de transformar o idealismo em sabedoria — de buscar a verdade não como certeza, mas como caminho permanente.",
  // Capricórnio
  "Saturno em Capricórnio é o planeta em seu próprio domicílio. Teissier considerava essa posição a expressão mais pura do aprendizado saturnino: você sabe que nada vem sem esforço — e encontra dignidade justamente nisso.",
  // Aquário
  "Sua lição é unir liberdade e responsabilidade coletiva. Teissier via em Saturno em Aquário — também seu domicílio — o aprendizado de servir à comunidade sem perder a individualidade; de ser original dentro de uma estrutura.",
  // Peixes
  "Sua lição é dar forma aos sonhos sem destruí-los. Teissier associava Saturno em Peixes ao aprendizado de estruturar a sensibilidade — de descobrir que fronteiras não aprisionam: liberam o que há de mais valioso em você.",
];

// Urano, Netuno e Plutão ficam anos em cada signo: os textos falam da geração.
export const URANO = [
  "Sua geração rompe com o passado através da ação individual. Teissier via em Urano em Áries a urgência de uma geração que não pede licença para mudar — que transforma por impulso e abre caminhos que outros seguirão.",
  "Sua geração revoluciona a relação com a matéria. Teissier associava Urano em Touro a uma geração que desafia estruturas econômicas e ressignifica o que tem valor — da terra ao dinheiro, das posses às trocas.",
  "Sua geração transforma a comunicação e o pensamento. Teissier via em Urano em Gêmeos uma geração que reinventa a linguagem, a informação e as formas de aprender — que pensa de maneiras que antes não existiam.",
  "Sua geração revoluciona o conceito de lar e de pertencimento. Teissier associava Urano em Câncer a mudanças profundas nas estruturas familiares e nos vínculos afetivos que definem identidade.",
  "Sua geração rompe com o que é convencional na expressão e na criatividade. Teissier via em Urano em Leão uma geração que reivindica o direito de existir plenamente — de amar, criar e brilhar fora dos moldes estabelecidos.",
  "Sua geração transforma o trabalho e a saúde com inovação. Teissier associava Urano em Virgem a uma geração que questiona a rotina, reinventa os métodos e aplica tecnologia ao cotidiano de formas disruptivas.",
  "Sua geração revoluciona os relacionamentos e os acordos entre as pessoas. Teissier via em Urano em Libra uma geração que desafia o que é justo — nas parcerias, no direito e nas formas de cooperação.",
  "Sua geração transforma tabus sobre poder, intimidade e morte. Teissier associava Urano em Escorpião a uma geração que vai fundo onde as anteriores não ousavam — que expõe o que estava oculto e libera o que estava reprimido.",
  "Sua geração revoluciona crenças, conhecimento e fronteiras. Teissier via em Urano em Sagitário uma geração que expande o horizonte do possível — em espiritualidade, ciência, viagens e na busca por sentido.",
  "Sua geração transforma estruturas de poder e instituições. Teissier associava Urano em Capricórnio a uma geração que desmonta e reconstrói — que questiona o que foi estabelecido como permanente e descobre que nada é.",
  "Urano em Aquário é o planeta em seu próprio signo. Teissier via aqui a geração mais uraniana de todas — aquela que impulsiona a tecnologia, a rede, o coletivo e as formas de organização social que antes eram ficção.",
  "Sua geração busca liberdade através da espiritualidade e do inconsciente. Teissier associava Urano em Peixes a uma geração que dissolve fronteiras invisíveis — entre o racional e o intuitivo, entre o eu e o todo.",
];

export const NETUNO = [
  "Sua geração sonha com um mundo onde a coragem individual muda tudo. Teissier via em Netuno em Áries um idealismo heróico — a crença de que uma pessoa, no momento certo, pode inaugurar uma nova era.",
  "Sua geração idealiza a simplicidade e a beleza natural. Teissier associava Netuno em Touro a um sonho de harmonia com a terra, com o corpo e com os ritmos do mundo visível.",
  "Sua geração sonha através das palavras e das ideias. Teissier via em Netuno em Gêmeos um ideal de comunicação perfeita — de um mundo onde a informação circula livremente e conecta o que está separado.",
  "Sua geração idealiza a família, a pátria e as raízes. Teissier associava Netuno em Câncer a um sonho de pertencimento e de segurança afetiva coletiva — de um lar que abraça a todos.",
  "Sua geração sonha através da arte, do romance e do espetáculo. Teissier via em Netuno em Leão um ideal de beleza e expressão — de um mundo onde o talento e o coração têm lugar de honra.",
  "Sua geração idealiza o serviço e o cuidado. Teissier associava Netuno em Virgem a um sonho de saúde, de trabalho com propósito e de um mundo onde cada detalhe é tratado com respeito.",
  "Sua geração sonha com relacionamentos harmoniosos e com um mundo mais justo. Teissier via em Netuno em Libra um ideal de paz — nas relações, nas nações e nas estruturas que organizam a convivência humana.",
  "Sua geração busca o sagrado no profundo. Teissier associava Netuno em Escorpião a um sonho de transformação total — de espiritualidade que toca a morte, o mistério e o renascimento.",
  "Sua geração sonha com uma fé que ultrapassa fronteiras. Teissier via em Netuno em Sagitário um ideal de liberdade espiritual e de conhecimento sem limites — de um mundo que cabia em mais do que um mapa.",
  "Sua geração idealiza instituições mais humanas. Teissier associava Netuno em Capricórnio a um sonho de estruturas que sirvam às pessoas — de responsabilidade coletiva e de um poder que cuida.",
  "Sua geração sonha com um mundo conectado e solidário. Teissier via em Netuno em Aquário um ideal de fraternidade tecnológica — de redes que aproximam em vez de isolar, e de um coletivo que evolui junto.",
  "Netuno em Peixes é o planeta em seu próprio signo. Teissier considerava essa a geração da dissolução das últimas ilusões — e do acesso mais direto ao que é espiritual, compassivo e universal.",
];

export const PLUTAO = [
  "Sua geração transforma o mundo pela força do indivíduo. Teissier via em Plutão em Áries uma geração que nasce para romper — que carrega em si o impulso de destruir o que está velho para que algo novo possa surgir.",
  "Sua geração transforma a relação com os recursos e os valores. Teissier associava Plutão em Touro a uma geração que revira as estruturas materiais — que questiona o que tem valor e o que pode ser redefinido.",
  "Sua geração transforma a comunicação e o pensamento. Teissier via em Plutão em Gêmeos uma geração que muda a linguagem, que desmonta narrativas e que reconstrói o que se entende por verdade.",
  "Sua geração transforma as raízes e os vínculos mais profundos. Teissier associava Plutão em Câncer a uma geração marcada por deslocamentos e perdas — que, ao reconstruir o lar, redefine o que significa pertencer.",
  "Sua geração transforma a expressão do poder e da criatividade. Teissier via em Plutão em Leão uma geração que viveu extremos — de ditaduras a revoluções culturais — e que sabia que a arte e o ego podem tanto criar quanto destruir.",
  "Sua geração transforma o trabalho, o corpo e o cotidiano. Teissier associava Plutão em Virgem a uma geração que questiona os métodos, que introduz novas formas de saúde e que revira a rotina até seus alicerces.",
  "Sua geração transforma os relacionamentos e os acordos. Teissier via em Plutão em Libra uma geração que redefiniu o amor, o casamento, o direito e o que significa uma parceria igualitária.",
  "Plutão em Escorpião é o planeta em seu próprio signo. Teissier considerava essa a geração mais plutoniana — aquela que veio para tocar o que estava mais enterrado: poder, sexualidade, morte e o que se esconde sob a superfície do mundo.",
  "Sua geração transforma as crenças e a visão de mundo. Teissier via em Plutão em Sagitário uma geração que derrubou fronteiras — físicas, ideológicas e espirituais — e que descobriu que o absoluto não cabe numa única narrativa.",
  "Sua geração transforma as estruturas de poder e as instituições. Teissier associava Plutão em Capricórnio a uma geração que questiona quem manda e por quê — que exige que o poder se justifique perante os que governa.",
  "Sua geração transforma a sociedade através da tecnologia e do coletivo. Teissier via em Plutão em Aquário uma geração que reinventa as redes, as identidades e as formas de pertencer — e que carrega o peso de construir um mundo que ainda não existe.",
  "Sua geração vive transformações espirituais e coletivas que dissolvem o que estava separado. Teissier associava Plutão em Peixes ao fim de um grande ciclo — e ao nascimento do que ainda não tem nome.",
];

export const MEIO_DO_CEU = [
  "Você se realiza quando lidera e inicia. Teissier identificava no MC em Áries a vocação do pioneiro — carreiras que exigem coragem, autonomia e a disposição de abrir o caminho onde ele ainda não existe.",
  "Você se realiza construindo algo que dura. Teissier associava o MC em Touro a uma vocação ligada ao concreto — finanças, arquitetura, gastronomia, natureza, beleza ou qualquer campo onde a paciência gera valor real.",
  "Você se realiza comunicando e conectando. Teissier via no MC em Gêmeos a vocação do mediador intelectual — escrita, ensino, jornalismo, comércio ou qualquer campo onde as palavras e as ideias são a matéria-prima.",
  "Você se realiza cuidando e acolhendo. Teissier associava o MC em Câncer a uma vocação ligada às pessoas — saúde, educação, gastronomia, trabalho social ou qualquer campo onde nutrir faz parte do papel.",
  "Você se realiza brilhando e liderando. Teissier identificava no MC em Leão a vocação para os palcos da vida — artes, política, empreendedorismo, gestão ou qualquer campo onde a presença e a criatividade são essenciais.",
  "Você se realiza sendo preciso e útil. Teissier via no MC em Virgem a vocação do especialista — medicina, análise, pesquisa, serviço ou qualquer campo onde o rigor e o cuidado com o detalhe fazem a diferença.",
  "Você se realiza em parceria e com elegância. Teissier associava o MC em Libra a uma vocação ligada ao equilíbrio — direito, diplomacia, design, relações públicas ou qualquer campo onde a harmonia é uma competência.",
  "Você se realiza transformando e investigando. Teissier identificava no MC em Escorpião a vocação para o que está nas sombras — psicologia, medicina, pesquisa, gestão de crises ou qualquer campo onde a profundidade é necessária.",
  "Você se realiza expandindo horizontes. Teissier via no MC em Sagitário a vocação do buscador — ensino superior, viagens, filosofia, direito internacional ou qualquer campo que amplie o que se sabe e o que se é.",
  "Você se realiza pelo mérito e pela construção. Teissier associava o MC em Capricórnio à vocação para o longo prazo — gestão, empreendedorismo, política, engenharia ou qualquer campo onde a consistência gera autoridade.",
  "Você se realiza inovando e contribuindo para o coletivo. Teissier identificava no MC em Aquário a vocação do visionário — tecnologia, ciência, ativismo, redes sociais ou qualquer campo que pense além do presente.",
  "Você se realiza inspirando e curando. Teissier via no MC em Peixes a vocação para o invisível — arte, música, espiritualidade, psicologia ou qualquer campo onde a sensibilidade se torna instrumento de transformação.",
];

// Área da vida de cada casa (1 a 12).
export const CASAS = [
  "identidade, aparência e o jeito de começar as coisas",
  "dinheiro, recursos e valor próprio",
  "comunicação, estudos e irmãos",
  "família, lar e raízes",
  "amor, criatividade, lazer e filhos",
  "trabalho do dia a dia, rotina e saúde",
  "relacionamentos, casamento e parcerias",
  "transformações, intimidade e recursos compartilhados",
  "viagens, estudos superiores e fé",
  "carreira, reputação e objetivos",
  "amizades, grupos e projetos de futuro",
  "mundo interior, espiritualidade e inconsciente",
];

export const ELEMENTOS = {
  fogo: { nome: "Fogo", resumo: "entusiasmo e coragem", texto: "Seu mapa tem predominância de Fogo. Teissier via nos signos de Fogo a expressão mais direta da vitalidade: entusiasmo, criatividade e a coragem de começar. Você se move por paixão e raramente precisa de motivação externa — o fogo já arde dentro." },
  terra: { nome: "Terra", resumo: "praticidade e constância", texto: "Seu mapa tem predominância de Terra. Para Teissier, os signos de Terra representam a capacidade de transformar intenção em resultado: você constrói, persiste e produz. Seu senso de realidade é um dos seus maiores presentes." },
  ar: { nome: "Ar", resumo: "ideias e comunicação", texto: "Seu mapa tem predominância de Ar. Teissier associava os signos de Ar à inteligência em movimento — à troca, à linguagem e à capacidade de conectar pessoas e ideias. Você pensa para existir, e existir para trocar." },
  agua: { nome: "Água", resumo: "sensibilidade e intuição", texto: "Seu mapa tem predominância de Água. Para Teissier, os signos de Água representam a dimensão mais profunda da experiência humana: sentimento, intuição e a capacidade de perceber o que está abaixo da superfície. Você sente antes de entender — e isso é uma forma de conhecimento." },
};

export const MODALIDADES = {
  cardinal: { nome: "Cardinal", resumo: "facilidade para começar", texto: "Seu mapa tem predominância de signos cardinais. Teissier via nos signos cardinais a energia da iniciativa — você começa, propõe e move. Tem dificuldade em sustentar o que começa, mas ninguém abre caminhos como você." },
  fixo: { nome: "Fixa", resumo: "foco para sustentar", texto: "Seu mapa tem predominância de signos fixos. Teissier associava os signos fixos à perseverança e à determinação — você sustenta, conclui e raramente abandona o que abraçou. Sua força está na consistência." },
  mutavel: { nome: "Mutável", resumo: "flexibilidade para se adaptar", texto: "Seu mapa tem predominância de signos mutáveis. Para Teissier, os signos mutáveis representam a sabedoria da adaptação — você transita entre mundos com facilidade e tem o dom de entender múltiplos pontos de vista. Sua força está na flexibilidade." },
};

export const RETROGRADO = "Retrógrado no seu mapa: Teissier ensinava que planetas retrógrados vivem sua energia de forma mais interna e reflexiva — menos voltada para o mundo exterior, mais para o aprofundamento pessoal.";
