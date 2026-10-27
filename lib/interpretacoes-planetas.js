// Textos originais para o mapa completo. Edite à vontade.
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
  "Você pensa rápido e fala sem rodeios. Decide na hora e prefere a conversa direta, mesmo que às vezes atropele os detalhes.",
  "Seu raciocínio é calmo e prático. Você aprende melhor no seu tempo e, quando forma uma opinião, ela é bem firme.",
  "Mente curiosa e ágil: você conecta ideias, conversa sobre tudo e aprende com facilidade. Foco é o seu grande exercício.",
  "Você pensa com o coração e lembra de tudo que te tocou. Comunica melhor quando se sente seguro e acolhido.",
  "Você fala com confiança e tem talento para contar histórias. Suas ideias ganham força quando você as expressa com criatividade.",
  "Mente analítica e precisa: você nota detalhes, organiza informações e encontra a solução prática para quase tudo.",
  "Você pensa considerando os dois lados e se comunica com diplomacia. Tem facilidade para mediar e convencer com gentileza.",
  "Seu pensamento é profundo e investigativo. Você percebe o que não foi dito e não se contenta com respostas rasas.",
  "Você pensa grande e gosta de debater ideias, filosofia e o sentido das coisas. Sinceridade é a sua marca ao falar.",
  "Raciocínio estratégico e organizado. Você fala pouco, mas com peso, e pensa sempre nos resultados a longo prazo.",
  "Mente original e inventiva. Você vê soluções que ninguém viu e não tem medo de pensar diferente da maioria.",
  "Você pensa por imagens e intuições. Sua comunicação é sensível e poética, e você entende as pessoas nas entrelinhas.",
];

export const VENUS = [
  "No amor, você é direto e apaixonado. Gosta de conquista, de iniciativa e se encanta por quem tem coragem.",
  "Você ama com lealdade e com os sentidos: carinho, presença e conforto. Valoriza relações estáveis e duradouras.",
  "Você se apaixona pela mente. Precisa de conversa, leveza e alguém que te surpreenda e te faça rir.",
  "Você ama cuidando e quer se sentir em casa ao lado de alguém. Laços afetivos profundos são o que te completa.",
  "Você ama de forma generosa e calorosa, e gosta de demonstrar e receber admiração. Romance é essencial.",
  "Você demonstra amor nos detalhes e nas atitudes do dia a dia. Precisa de alguém confiável, com quem possa construir.",
  "Romântico e charmoso, você valoriza parceria, harmonia e beleza. Relacionamentos são parte central da sua vida.",
  "Você ama com intensidade e entrega total. Quer conexão profunda e verdadeira; relação morna não te interessa.",
  "Você ama com liberdade e entusiasmo. Precisa de alguém que seja também companhia para aventuras e descobertas.",
  "Você leva o amor a sério e constrói devagar. Demonstra afeto com compromisso, presença e responsabilidade.",
  "Você valoriza amizade dentro do amor e precisa de espaço para ser quem é. Se atrai por pessoas únicas.",
  "Você ama de forma romântica, sensível e devotada. Tem uma enorme capacidade de compreender e perdoar.",
];

export const MARTE = [
  "Você age rápido, com coragem e espírito competitivo. Desafios te motivam e você não gosta de esperar.",
  "Sua força é a persistência. Você demora a começar, mas quando decide, ninguém te tira do caminho.",
  "Você age em várias frentes ao mesmo tempo e luta com palavras e argumentos. Variedade te mantém motivado.",
  "Você age movido pelas emoções e defende com unhas e dentes quem ama. Sua força cresce quando protege alguém.",
  "Você age com orgulho, paixão e vontade de deixar sua marca. Gosta de liderar e de ser reconhecido pelo que faz.",
  "Você age com método e eficiência. Planeja antes, cuida dos detalhes e entrega um trabalho impecável.",
  "Você prefere resolver as coisas com diálogo e estratégia. Luta pelo que é justo e trabalha bem em parceria.",
  "Você age com intensidade e determinação silenciosa. Quando quer algo, vai até o fim, sem desistir.",
  "Você age por ideais e com muito entusiasmo. Precisa acreditar no que faz e de liberdade para se mover.",
  "Você age com ambição, disciplina e foco. Sabe esperar o momento certo e constrói conquistas sólidas.",
  "Você age de forma independente e inovadora. Luta por causas coletivas e não aceita regras sem sentido.",
  "Você age guiado pela intuição e pela inspiração. Sua força aparece quando há um propósito maior envolvido.",
];

export const JUPITER = [
  "Você cresce quando se arrisca e toma a iniciativa. A sorte aparece quando você confia em si e começa algo novo.",
  "Você prospera com paciência e bom senso. Recursos materiais e estabilidade tendem a crescer ao longo da vida.",
  "Você cresce aprendendo e trocando ideias. Estudos, contatos e comunicação abrem muitas portas para você.",
  "Você prospera através da família, do lar e do cuidado com as pessoas. Sua generosidade volta multiplicada.",
  "Você cresce quando se mostra e expressa seus talentos. Criatividade e confiança atraem boas oportunidades.",
  "Você prospera pelo trabalho bem-feito e pela vontade de ajudar. Oportunidades surgem do seu esforço diário.",
  "Você cresce através das parcerias e relações. Boas alianças e acordos são fontes de sorte na sua vida.",
  "Você prospera nas transformações e nas crises. Tem talento para regenerar situações e recursos compartilhados.",
  "Você cresce viajando, estudando e ampliando horizontes. Sua fé e seu otimismo são a sua maior sorte.",
  "Você prospera com disciplina e responsabilidade. O sucesso vem com o tempo, e ele vem para ficar.",
  "Você cresce em grupos, amizades e causas coletivas. Ideias inovadoras tendem a te levar longe.",
  "Você prospera pela compaixão e pela espiritualidade. Ajudar os outros te traz um sentido profundo de abundância.",
];

export const SATURNO = [
  "Sua lição é aprender a ter paciência e a agir com maturidade. Com o tempo, você se torna um líder respeitado.",
  "Sua lição envolve segurança e valor próprio. Você aprende a construir estabilidade sem ficar preso ao medo de perder.",
  "Sua lição está na comunicação: falar com clareza e confiar nas próprias ideias. Seu pensamento amadurece com profundidade.",
  "Sua lição é emocional: aprender a se sentir seguro e a pedir apoio. Você constrói um lar sólido com o tempo.",
  "Sua lição é se expressar sem medo de julgamento. Quando você se permite brilhar, ganha uma confiança duradoura.",
  "Sua lição é equilibrar exigência e cuidado consigo mesmo. Você se torna um especialista naquilo que se dedica.",
  "Sua lição está nos relacionamentos: compromisso, limites e equilíbrio. Relações maduras são a sua recompensa.",
  "Sua lição envolve confiança e entrega. Você aprende a lidar com perdas e sai delas muito mais forte.",
  "Sua lição é construir as próprias crenças com responsabilidade. A sabedoria vem com a experiência.",
  "Sua lição é a ambição saudável. Você tem disciplina natural e constrói conquistas que resistem ao tempo.",
  "Sua lição é ser você mesmo dentro dos grupos. Você aprende a unir independência e senso de comunidade.",
  "Sua lição é dar forma aos sonhos e colocar limites na empatia. Sua sensibilidade vira força quando tem estrutura.",
];

// Urano, Netuno e Plutão ficam anos em cada signo: os textos falam da geração.
export const URANO = [
  "Sua geração busca liberdade através da ação e da independência individual.",
  "Sua geração revoluciona a relação com dinheiro, valores e recursos naturais.",
  "Sua geração transforma a comunicação, a informação e a forma de aprender.",
  "Sua geração renova o conceito de família e de lar.",
  "Sua geração busca liberdade de expressão e criatividade sem regras.",
  "Sua geração revoluciona o trabalho, a saúde e a rotina com novas tecnologias.",
  "Sua geração transforma os relacionamentos e os acordos entre as pessoas.",
  "Sua geração mexe em tabus e transforma a relação com poder e intimidade.",
  "Sua geração revoluciona crenças, estudos e a forma de ver o mundo.",
  "Sua geração transforma estruturas, instituições e a forma de trabalhar.",
  "Sua geração impulsiona a tecnologia, a coletividade e as redes.",
  "Sua geração busca liberdade através da espiritualidade e da imaginação.",
];

export const NETUNO = [
  "Sua geração sonha com coragem e com a ação inspirada.",
  "Sua geração idealiza a natureza, a beleza e a simplicidade.",
  "Sua geração sonha através das ideias, das palavras e da informação.",
  "Sua geração idealiza a família, as raízes e a pátria.",
  "Sua geração sonha através da arte, do romance e da criatividade.",
  "Sua geração idealiza o serviço, a saúde e o cuidado com o outro.",
  "Sua geração sonha com relações harmoniosas e com um mundo mais justo.",
  "Sua geração busca o profundo: espiritualidade, mistério e transformação.",
  "Sua geração sonha com liberdade, viagens e uma fé que ultrapassa fronteiras.",
  "Sua geração dissolve velhas estruturas e sonha com instituições mais humanas.",
  "Sua geração sonha com um mundo conectado, coletivo e tecnológico.",
  "Sua geração vive a sensibilidade, a compaixão e a espiritualidade com intensidade.",
];

export const PLUTAO = [
  "Sua geração transforma tudo através da coragem e da iniciativa individual.",
  "Sua geração transforma a relação com recursos, valores e posses.",
  "Sua geração transforma a comunicação e a forma de pensar.",
  "Sua geração transforma profundamente a família e as raízes.",
  "Sua geração transforma a expressão pessoal, a criatividade e o amor.",
  "Sua geração transforma o trabalho, a saúde e o cotidiano.",
  "Sua geração transforma os relacionamentos e a ideia de parceria.",
  "Sua geração mergulha em temas profundos e transforma tabus sobre poder, sexualidade e morte.",
  "Sua geração transforma crenças, religiões e a visão de mundo.",
  "Sua geração transforma estruturas de poder, governos e instituições.",
  "Sua geração transforma a sociedade através da tecnologia e do coletivo.",
  "Sua geração vive transformações espirituais e coletivas profundas.",
];

export const MEIO_DO_CEU = [
  "Você se realiza sendo pioneiro e liderando. Carreiras com desafio, autonomia e ação combinam com você.",
  "Você se realiza construindo algo sólido e de valor. Áreas ligadas a finanças, beleza ou natureza te favorecem.",
  "Você se realiza comunicando. Escrita, ensino, vendas e mídia são caminhos naturais para você.",
  "Você se realiza cuidando e acolhendo. Áreas ligadas a pessoas, família, saúde ou alimentação combinam com você.",
  "Você se realiza brilhando. Carreiras com visibilidade, criatividade e liderança são o seu lugar.",
  "Você se realiza sendo útil e preciso. Saúde, análise, organização e serviços são caminhos fortes.",
  "Você se realiza em parceria e com equilíbrio. Direito, design, diplomacia e relações públicas te favorecem.",
  "Você se realiza transformando. Psicologia, pesquisa, investigação e gestão de crises combinam com você.",
  "Você se realiza expandindo horizontes. Ensino, viagens, comércio exterior e propósito são o seu caminho.",
  "Você se realiza conquistando respeito e posição. Gestão, empreendedorismo e carreiras de longo prazo te favorecem.",
  "Você se realiza inovando. Tecnologia, ciência e causas coletivas são caminhos naturais para você.",
  "Você se realiza inspirando. Arte, música, espiritualidade e trabalhos de ajuda ao próximo combinam com você.",
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
  fogo: { nome: "Fogo", resumo: "entusiasmo e coragem", texto: "Seu mapa tem predominância de Fogo: entusiasmo, coragem e energia para começar. Você se move por paixão e inspira quem está por perto." },
  terra: { nome: "Terra", resumo: "praticidade e constância", texto: "Seu mapa tem predominância de Terra: praticidade, constância e pé no chão. Você transforma ideias em resultados concretos." },
  ar: { nome: "Ar", resumo: "ideias e comunicação", texto: "Seu mapa tem predominância de Ar: ideias, comunicação e conexões. Você vive pela troca e pela curiosidade." },
  agua: { nome: "Água", resumo: "sensibilidade e intuição", texto: "Seu mapa tem predominância de Água: sensibilidade, intuição e profundidade emocional. Você sente antes de entender." },
};

export const MODALIDADES = {
  cardinal: { nome: "Cardinal", resumo: "facilidade para começar", texto: "Você é de iniciar: tem facilidade para começar projetos e tomar a frente." },
  fixo: { nome: "Fixa", resumo: "foco para sustentar", texto: "Você é de sustentar: tem foco, persistência e leva as coisas até o fim." },
  mutavel: { nome: "Mutável", resumo: "flexibilidade para se adaptar", texto: "Você é de adaptar: tem flexibilidade e se ajusta bem às mudanças." },
};

export const RETROGRADO = "Retrógrado no seu mapa: essa energia é vivida de forma mais interna e reflexiva.";
