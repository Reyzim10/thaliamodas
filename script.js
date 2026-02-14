/* script.js - Renderiza produtos, controla modal e gera link WhatsApp */

// CONFIGURE AQUI o número do WhatsApp (somente dígitos, sem + ou espaços)
// Exemplo internacional: '5511999999999' para Brasil.
// Valor fornecido pelo usuário (via https://wa.me/): 5598986291605
const WHATSAPP_NUMBER = '5598986291605'; // número completo (código do país + DDD + número)

// Lista de produtos de exemplo. Atualize nomes, preços, descrições e paths de imagem em /img
const products = [
  {
    id: 1,
    name: 'Mochila Bolsa Básica Notebook 16 Escolar Impermeável Grande Masculina',
    category: 'Mochilas',
    price: 'R$ 89,90',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_659264-MLA105022132723_012026-F.webp'],
    desc: 'Mochila impermeável para notebook 16" com espaço amplo e bolsos organizadores.'
  },
  {
    id: 2,
    name: 'Mochila Feminina Escolar Passeio Grande Capacidade Jovem',
    category: 'Mochilas',
    price: 'R$ 118,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_964299-MLB76910829802_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_633669-MLB77119877131_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_776306-MLB76910798838_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp'
    ],
    desc: 'Mochila feminina grande capacidade, ideal para escola e passeios. Variações de cor disponíveis.'
  },
  {
    id: 3,
    name: 'Mochila Feminina Escolar Grande Espaçosa Impermeável Robusta',
    category: 'Mochilas',
    price: 'R$ 119,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_811893-MLB81073441080_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_827339-MLB81341036219_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_768431-MLB81341037367_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp'
    ],
    desc: 'Mochila feminina grande, espaçosa, robusta e impermeável. Disponível em várias cores.'
  },
  {
    id: 4,
    name: 'Mochila De Costa Escolar Juvenil Resistente Femenina Grande',
    category: 'Mochilas',
    price: 'R$ 97,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_832610-MLB93130996528_092025-F-mochila-de-costa-escolar-juvenil-resistente-femenina-grande.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_982518-MLB93130214526_092025-F-mochila-de-costa-escolar-juvenil-resistente-femenina-grande.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_923213-MLB93130709282_092025-F-mochila-de-costa-escolar-juvenil-resistente-femenina-grande.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_813908-MLB93130512144_092025-F-mochila-de-costa-escolar-juvenil-resistente-femenina-grande.webp'
    ],
    desc: 'Mochila de costa escolar juvenil feminina, resistente, grande e com várias opções de cores.'
  }
  ,{
    id: 5,
    name: 'Mochila Bolsa Escolar Passeio Menina Divisória Costas Grande Cor Mochila Lilás Desenho Do Tecido Tie Dye',
    category: 'Mochilas',
    price: 'R$ 125,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_630934-MLA99982114515_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_989966-MLA81943369223_012025-F.webp'
    ],
    desc: 'Mochila bolsa escolar passeio para menina, divisória nas costas, grande, cor lilás com desenho tie dye. Linda e espaçosa!'
  }
  ,{
    id: 6,
    name: 'Bolsa Feminina Grande Mochila Antfurto Impermeável Reforçada',
    category: 'Mochilas',
    price: 'R$ 96,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_908943-MLB84762645389_052025-F-bolsa-feminina-grande-mochila-antfurto-impermeavel-reforcada.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_729634-MLB84462490774_052025-F-bolsa-feminina-grande-mochila-antfurto-impermeavel-reforcada.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_602467-MLB84462896188_052025-F-bolsa-feminina-grande-mochila-antfurto-impermeavel-reforcada.webp'
    ],
    desc: 'Bolsa feminina grande, modelo mochila, reforçada, impermeável e com sistema antifurto. Ideal para o dia a dia.'
  }
  ,{
    id: 7,
    name: 'Mochila Escolar Trabalho Reforçada Bolsa Feminina Passeio',
    category: 'Mochilas',
    price: 'R$ 96,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_993937-MLB81186852920_122024-F-mochila-escolar-trabalho-reforcada-bolsa-feminina-passeio.webp'
    ],
    desc: 'Mochila escolar reforçada, ideal para trabalho, passeios e uso feminino. Espaçosa e resistente.'
  },
  {
    id: 8,
    name: 'Tenis Academia Masculino Corrida Musculação Caminhada Treino',
    category: 'Tênis',
    price: 'R$ 96,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_795952-MLB89590693736_082025-F-tenis-academia-masculino-corrida-musculaco-caminhada-treino.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_894560-MLB90027563431_082025-F-tenis-academia-masculino-corrida-musculaco-caminhada-treino.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_688110-MLB89589403178_082025-F-tenis-academia-masculino-corrida-musculaco-caminhada-treino.webp'
    ],
    desc: 'Tênis ideal para academia, corrida, musculação, caminhada e treino. Confortável e resistente, disponível em três variações.'
  }
  ,
  {
    id: 9,
    name: 'Tenis Feminino Casual Branco Retrô Clássico Original Force',
    category: 'Tênis',
    price: 'R$ 104,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_604173-MLB77383997348_072024-F-tenis-feminino-casual-branco-retr-classico-original-force.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_685999-MLB77599964621_072024-F-tenis-feminino-casual-branco-retr-classico-original-force.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_840928-MLB77384104880_072024-F-tenis-feminino-casual-branco-retr-classico-original-force.webp'
    ],
    desc: 'Tênis feminino casual branco, estilo retrô clássico, confortável e versátil para uso diário.'
  },
  {
    id: 10,
    name: 'Kit Tênis Esportivo Masculino Feminino Academia + Relógio',
    category: 'Kits',
    price: 'R$ 95,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_731843-MLB105883082221_012026-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_933084-MLB74422417323_022024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_731760-MLB74305712026_022024-F.webp'
    ],
    desc: 'Kit tênis esportivo unissex para academia com relógio incluso — ideal para treino e dia a dia.'
  }
  ,
  {
    id: 12,
    name: 'Mochila Escolar Feminina Notebook Estilosa Antifurto Juvenil Cor Azul',
    category: 'Mochilas',
    price: 'R$ 92,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_732532-MLA95585219615_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_789006-MLA96221025904_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_729035-MLA95070117716_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_778630-MLA99429252198_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_675864-MLA95192514124_102025-F.webp'
    ],
    desc: 'Mochila escolar feminina para notebook, estilosa e com antifurto; design juvenil na cor azul.'
  },
  {
    id: 13,
    name: 'Mochila Escolar Femenina Com Bicho De Pelúcia Ursinho',
    category: 'Mochilas',
    price: 'R$ 92,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_633057-MLB93840071728_102025-F-mochila-escolar-femenina-com-bicho-de-pelucia-ursinho.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_840284-MLB94264242837_102025-F-mochila-escolar-femenina-com-bicho-de-pelucia-ursinho.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_858216-MLB93840319800_102025-F-mochila-escolar-femenina-com-bicho-de-pelucia-ursinho.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_822730-MLB93840140652_102025-F-mochila-escolar-femenina-com-bicho-de-pelucia-ursinho.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_627968-MLB93840299632_102025-F-mochila-escolar-femenina-com-bicho-de-pelucia-ursinho.webp'
    ],
    desc: 'Mochila escolar feminina com bicho de pelúcia ursinho. Charmosa e funcional.'
  },
  {
    id: 14,
    name: 'Tênis Masculino Para Academia E Caminhada Esportivo E Macio',
    category: 'Tênis',
    price: 'R$ 95,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_955110-MLB86398100931_062025-F-tnis-masculino-para-academia-e-caminhada-esportivo-e-macio.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_972431-MLB86082113940_062025-F-tnis-masculino-para-academia-e-caminhada-esportivo-e-macio.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_602411-MLB86082113918_062025-F-tnis-masculino-para-academia-e-caminhada-esportivo-e-macio.webp'
    ],
    desc: 'Tênis masculino esportivo e macio, indicado para academia e caminhada. Conforto e suporte para treinos.'
  },
  {
    id: 15,
    name: 'Vestido Alfaiataria Elegante Sofisticado Básico Perfeito',
    category: 'Vestidos',
    price: 'R$ 94,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_906708-MLB103251885427_122025-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_798524-MLB103251885723_122025-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_759601-MLB103416831941_012026-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_717055-MLB103251986649_122025-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_730541-MLB103250061565_122025-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_903930-MLB103251418167_122025-F-vestido-alfaiataria-elegante-sofisticado-basico-perfeito.webp'
    ],
    desc: 'Vestido de alfaiataria elegante, sofisticado e básico — perfeito para ocasiões formais e trabalho.'
  }
];

// Adiciona Vestido Curtinho (novo produto)
products.push({
  id: 16,
  name: 'Vestido Curtinho Feminino Elegante Casual Premium Mg Brand',
  category: 'Vestidos',
  price: 'R$ 93,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_965435-MLB102906956584_012026-F-vestido-curtinho-feminino-elegante-casual-premium-mg-brand.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_767017-MLB102905221490_012026-F-vestido-curtinho-feminino-elegante-casual-premium-mg-brand.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_974044-MLB103419965847_012026-F-vestido-curtinho-feminino-elegante-casual-premium-mg-brand.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_960576-MLB103419969439_012026-F-vestido-curtinho-feminino-elegante-casual-premium-mg-brand.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_832201-MLB103419658919_012026-F-vestido-curtinho-feminino-elegante-casual-premium-mg-brand.webp'
  ],
  desc: 'Vestido curtinho feminino elegante e casual, premium MG Brand. Ideal para looks do dia a dia e eventos.'
});

// produto adicionado: Tênis Feminino Polo
products.push({
  id: 11,
  name: 'Tênis Feminino Polo Para Caminhada Academia Com Relogio',
  category: 'Tênis',
  price: 'R$ 88,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_708076-MLB79512715901_092024-F-tnis-feminino-polo-para-caminhada-academia-com-relogio.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_920265-MLB79512726543_092024-F-tnis-feminino-polo-para-caminhada-academia-com-relogio.webp'
  ],
  desc: 'Tênis feminino Polo, indicado para caminhada e academia; vem com relógio, confortável e leve.'
});

// produto adicionado pelo usuário: Bicicleta Rosa Nathor Flower Infantil Aro 12
products.push({
  id: 23,
  name: 'Bicicleta Rosa Nathor Flower Infantil Aro 12 Menina Cestinha',
  category: 'Bicicletas',
  price: 'R$ 428,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_642327-MLA99888118883_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_681696-MLA84473405511_052025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_791171-MLA84473319769_052025-F.webp'
  ],
  desc: 'Bicicleta infantil aro 12, cor rosa, com cestinha frontal. Ideal para meninas pequenas.'
});

// produto adicionado pelo usuário: Vestido Midi Três Maria Laise
products.push({
  id: 25,
  name: 'Vestido Midi Três Maria Laise Modesto Elegante Luxo',
  category: 'Vestidos',
  price: 'R$ 96,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_996506-MLB89275726038_082025-F-vestido-midi-trs-maria-laise-modesto-elegante-luxo.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_697677-MLB89640709081_082025-F-vestido-midi-trs-maria-laise-modesto-elegante-luxo.webp'
  ],
  desc: 'Vestido midi três marias em laise, estilo modesto e elegante.'
});

// produto adicionado pelo usuário: Vestido Moda Evangélica Godê Mídi De Tule Poá Manga Curta
products.push({
  id: 27,
  name: 'Vestido Moda Evangélica Godê Mídi De Tule Poá Manga Curta',
  category: 'Vestidos',
  price: 'R$ 104,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_722374-MLB106141344694_022026-F-vestido-moda-evangelica-god-midi-de-tule-poa-manga-curta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_939637-MLB105449076793_012026-F-vestido-moda-evangelica-god-midi-de-tule-poa-manga-curta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_987214-MLB87488138829_072025-F-vestido-moda-evangelica-god-midi-de-tule-poa-manga-curta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_852719-MLB87161509440_072025-F-vestido-moda-evangelica-god-midi-de-tule-poa-manga-curta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_836549-MLB99607449260_122025-F-vestido-moda-evangelica-god-midi-de-tule-poa-manga-curta.webp'
  ],
  desc: 'Vestido godê mídi de tule com estampa poá, manga curta — estilo moda evangélica.'
});

// produto adicionado pelo usuário: Vestido Midi Moda Cristã Evangelico Casual Crepe De Malha
products.push({
  id: 17,
  name: 'Vestido Midi Moda Cristã Evangelico Casual Crepe De Malha',
  category: 'Vestidos',
  price: 'R$ 105,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_978738-MLB85357062436_062025-F-vestido-midi-moda-crist-evangelico-casual-crepe-de-malha.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_983959-MLB85882549675_062025-F-vestido-midi-moda-crist-evangelico-casual-crepe-de-malha.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899076-MLB85663525909_062025-F-vestido-midi-moda-crist-evangelico-casual-crepe-de-malha.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_688802-MLB85663569841_062025-F-vestido-midi-moda-crist-evangelico-casual-crepe-de-malha.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_612330-MLB85883238899_062025-F-vestido-midi-moda-crist-evangelico-casual-crepe-de-malha.webp'
  ],
  desc: 'Vestido mídi em crepe de malha, estilo cristão/evangélico, casual e elegante.'
});

// produto adicionado pelo usuário: Vestido Curto De Ribana Feminino Rovitex Preto
products.push({
  id: 18,
  name: 'Vestido Curto De Ribana Feminino Rovitex Preto',
  category: 'Vestidos',
  price: 'R$ 95,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_744817-MLB95345788195_102025-F-vestido-curto-de-ribana-feminino-rovitex-preto.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_723746-MLB94905215578_102025-F-vestido-curto-de-ribana-feminino-rovitex-preto.webp'
  ],
  desc: 'Vestido curto de ribana feminino da Rovitex, cor preta, casual e confortável.'
});

// produto adicionado pelo usuário: Vestido Feminino Curto Tubinho Alfaiataria Elegante Fashion
products.push({
  id: 19,
  name: 'Vestido Feminino Curto Tubinho Alfaiataria Elegante Fashion',
  category: 'Vestidos',
  price: 'R$ 94,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_790961-MLB103145663283_122025-F-vestido-feminino-curto-tubinho-alfaiataria-elegante-fashion.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_775695-MLB99995028400_122025-F-vestido-feminino-curto-tubinho-alfaiataria-elegante-fashion.webp'
  ],
  desc: 'Vestido curto tubinho em alfaiataria, elegante e fashion. Ideal para ocasiões casuais e sociais.'
});

// produto adicionado pelo usuário: Vestido Feminino Midi Manga Curta Acinturado Modelador Verão
products.push({
  id: 20,
  name: 'Vestido Feminino Midi Manga Curta Acinturado Modelador Verão',
  category: 'Vestidos',
  price: 'R$ 91,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_913580-MLB100478939459_122025-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_700773-MLB102477136658_122025-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_600468-MLB99989363870_122025-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_809066-MLB103428444389_012026-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_897711-MLB100478909827_122025-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_955908-MLB102476559130_122025-F-vestido-feminino-midi-manga-curta-acinturado-modelador-vero.webp'
  ],
  desc: 'Vestido mídi acinturado com manga curta, modelador, ideal para verão.'
});

// produto novo: Vestido Curto Feminino Balada Festa Luxo Promoção Elegante
products.push({
  id: 21,
  name: 'Vestido Curto Feminino Balada Festa Luxo Promoção Elegante',
  category: 'Vestidos',
  price: 'R$ 94,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_993478-MLB96531780151_102025-F-vestido-curto-feminino-balada-festa-luxo-promoco-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_742949-MLA105326505778_012026-F-vestido-curto-feminino-balada-festa-luxo-promoco-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_966705-MLB106118136962_022026-F-vestido-curto-feminino-balada-festa-luxo-promoco-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_947411-MLB106746305573_022026-F-vestido-curto-feminino-balada-festa-luxo-promoco-elegante.webp'
  ],
  desc: 'Vestido curto feminino ideal para balada e festas; luxo e elegância em promoção.'
});

// produto novo: Vestido Curto Ajustado Decote V Profundo Bodycon Sexy Festa
products.push({
  id: 22,
  name: 'Vestido Curto Ajustado Decote V Profundo Bodycon Sexy Festa',
  category: 'Vestidos',
  price: 'R$ 88,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_725658-MLB97312889289_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_607965-MLB98348401373_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_762756-MLB106595199651_022026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_999282-MLB98504288463_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_896682-MLB94889155549_102025-F.webp'
  ],
  desc: 'Vestido curto ajustado com decote V profundo, bodycon sexy para festas e ocasiões noturnas.'
});

// produto novo: Vestido Tubinho Feminino Festas Decote Drapeado Costas Nuas
products.push({
  id: 24,
  name: 'Vestido Tubinho Feminino Festas Decote Drapeado Costas Nuas',
  category: 'Vestidos',
  price: 'R$ 89,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_672828-MLB96395053907_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_732722-MLB106665801275_022026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_649778-MLB94484872569_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_989043-MLB94484878325_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_835816-MLB106056723936_022026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_706004-MLB94058097998_102025-F.webp'
  ],
  desc: 'Vestido tubinho feminino para festas com decote drapeado e costas nuas. Elegante e sofisticado.'
});

// produto novo: Vestido Reto Alcinha Tubinho Tendencia Moda Blogueira Trend
products.push({
  id: 26,
  name: 'Vestido Reto Alcinha Tubinho Tendencia Moda Blogueira Trend',
  category: 'Vestidos',
  price: 'R$ 74,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_643648-MLB85885870209_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_634078-MLB85884209333_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_808120-MLB85575496382_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_834992-MLB85883084469_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_715543-MLB85884348445_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_793889-MLB85358641550_062025-F-vestido-reto-alcinha-tubinho-tendencia-moda-blogueira-trend.webp'
  ],
  desc: 'Vestido reto alcinha tubinho, tendência moda blogueira, confortável e versátil.'
});

// produto novo: Vestido Feminino Soltinho Curto Frente Única
products.push({
  id: 28,
  name: 'Vestido Feminino Soltinho Curto Frente Única Leve Elegante',
  category: 'Vestidos',
  price: 'R$ 68,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_746976-MLB105977883350_022026-F-vestido-feminino-soltinho-curto-frente-unica-leve-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_897154-MLB97536919498_112025-F-vestido-feminino-soltinho-curto-frente-unica-leve-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_730261-MLB98001992381_112025-F-vestido-feminino-soltinho-curto-frente-unica-leve-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_668583-MLB104798835190_012026-F-vestido-feminino-soltinho-curto-frente-unica-leve-elegante.webp'
  ],
  desc: 'Vestido feminino soltinho curto frente única, leve e elegante. Ideal para dias quentes.'
});

// produto adicionado pelo usuário: Conjunto Shorts E Colete Feminino
products.push({
  id: 29,
  name: 'Conjunto Shorts E Colete Feminino Alfaiataria Elegante',
  category: 'Conjuntos',
  price: 'R$ 96,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_663252-MLB101492278038_122025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_849684-MLB100362373155_122025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_826242-MLB93407016891_092025-F.webp'
  ],
  desc: 'Conjunto Shorts E Colete Feminino Alfaiataria Elegante'
});

// produto adicionado pelo usuário: Kit 2 Shorts Feminino Alfaiataria Cinto Bolsos Tendência
products.push({
  id: 30,
  name: 'Kit 2 Shorts Feminino Alfaiataria Cinto Bolsos Tendência',
  category: 'Shorts',
  price: 'R$ 94,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_923892-MLB80130788996_112024-F-kit-2-shorts-feminino-alfaiataria-cinto-bolsos-tendncia.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_804733-MLB84503478589_052025-F-kit-2-shorts-feminino-alfaiataria-cinto-bolsos-tendncia.webp'
  ],
  desc: 'Kit 2 Shorts Feminino Alfaiataria com cinto e bolsos, tendência de moda.'
});

// produto adicionado pelo usuário: Kit 2 Shorts Feminino Alfaiataria Social Cintura Alta
products.push({
  id: 31,
  name: 'Kit 2 Shorts Feminino Alfaiataria Social Cintura Alta',
  category: 'Shorts',
  price: 'R$ 94,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_944585-MLB93749423214_102025-F.webp'
  ],
  desc: 'Kit com 2 shorts femininos alfaiataria social, cintura alta. Elegância e conforto.'
});

// produto adicionado pelo usuário: Short Feminino De Linho Moda Verao Bolsos Elegante
products.push({
  id: 32,
  name: 'Short Feminino De Linho Moda Verao Bolsos Elegante',
  category: 'Shorts',
  price: 'R$ 68,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_824297-MLB91291103776_092025-F-short-feminino-de-linho-moda-verao-bolsos-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_840448-MLB91688089361_092025-F-short-feminino-de-linho-moda-verao-bolsos-elegante.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_600939-MLB91687602765_092025-F-short-feminino-de-linho-moda-verao-bolsos-elegante.webp'
  ],
  desc: 'Short feminino de linho, moda verão com bolsos, elegante.'
});

// produto adicionado pelo usuário: Short Mon 100% Boyfriend Meia Coxa Cintura Alta Feminino
products.push({
  id: 33,
  name: 'Short Mon 100% Boyfriend Meia Coxa Cintura Alta Feminino',
  category: 'Shorts',
  price: 'R$ 69,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_728703-MLB89846858982_082025-F-short-mon-100-boyfriend-meia-coxa-cintura-alta-feminino.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_660088-MLB105266517481_012026-F-short-mon-100-boyfriend-meia-coxa-cintura-alta-feminino.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_672065-MLB105265155727_012026-F-short-mon-100-boyfriend-meia-coxa-cintura-alta-feminino.webp'
  ],
  desc: 'Short Mon 100% boyfriend, meia coxa, cintura alta feminino. Conforto e estilo.'
});

// produto adicionado pelo usuário: Short Feminino Social Com Cinto Alfaiataria Trabalho
products.push({
  id: 34,
  name: 'Short Feminino Social Com Cinto Alfaiataria Trabalho',
  category: 'Shorts',
  price: 'R$ 72,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_968520-MLB97760655610_112025-F-short-feminino-social-com-cinto-alfaiataria-trabalho.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_821890-MLB98329560087_112025-F-short-feminino-social-com-cinto-alfaiataria-trabalho.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_904783-MLB106519533347_022026-F-short-feminino-social-com-cinto-alfaiataria-trabalho.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_869800-MLB97127497727_112025-F-short-feminino-social-com-cinto-alfaiataria-trabalho.webp'
  ],
  desc: 'Short feminino social alfaiataria com cinto, ideal para trabalho.'
});

// produto adicionado pelo usuário: Short Jeans Feminino Shorts Cargo Com Lycra Cintura Alta
products.push({
  id: 35,
  name: 'Short Jeans Feminino Shorts Cargo Com Lycra Cintura Alta',
  category: 'Shorts',
  price: 'R$ 68,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_923324-MLB84691819699_052025-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_625543-MLB81355649599_122024-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_695378-MLB82609039933_022025-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_678750-MLB100595163276_122025-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_990641-MLB95101840689_102025-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_746243-MLB81351584343_122024-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_820689-MLB80497839667_112024-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_838072-MLB82608978505_022025-F-short-jeans-feminino-shorts-cargo-com-lycra-cintura-alta.webp'
  ],
  desc: 'Short Jeans Feminino modelo Cargo com Lycra e Cintura Alta.'
});

// produto adicionado pelo usuário: Liquidificador Turbo Power Mondial 550W L-99 FR
products.push({
  id: 36,
  name: 'Liquidificador Turbo Power Mondial 550W L-99 FR',
  category: 'Eletroportáteis',
  price: 'R$ 138,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_619525-MLA99455849002_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_745491-MLA100000195535_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_614073-MLA99854241169_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_975041-MLA99992396177_112025-F.webp'
  ],
  desc: 'Liquidificador Turbo Power Mondial 550W L-99 FR, potente e resistente.'
});

// produto adicionado pelo usuário: Mochila De Viagem Para Laptop De Grande Capacidade
products.push({
  id: 37,
  name: 'Mochila De Viagem Para Laptop De Grande Capacidade',
  category: 'Mochilas',
  price: 'R$ 88,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_621342-MLB101920683444_122025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_719556-MLB101920683448_122025-F.webp'
  ],
  desc: 'Mochila de viagem para laptop de grande capacidade, ideal para viagens e trabalho.'
});

// produto adicionado pelo usuário: Sachê 1Kg Creatina 100% Pura Pouch Integralmédica
products.push({
  id: 38,
  name: 'Sachê 1Kg Creatina 100% Pura Pouch Integralmédica',
  category: 'Suplementos',
  price: 'R$ 149,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_779449-MLA100012609239_122025-F.webp'
  ],
  desc: 'Sachê 1Kg Creatina 100% Pura Pouch Integralmédica, ideal para ganho de força e desempenho.'
});

// produto adicionado pelo usuário: Creatina Monohidratada Pura 500g Dark Lab
products.push({
  id: 39,
  name: 'Creatina Monohidratada Pura 500g Dark Lab',
  category: 'Suplementos',
  price: 'R$ 89,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_942122-MLA99923169249_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_650578-MLU78119917021_082024-F.webp'
  ],
  desc: 'Creatina Monohidratada Pura 500g Dark Lab.'
});

// produto adicionado pelo usuário: Mochila Escolar Grande Reforçada Para Trabalho E Viagem Preto Liso
products.push({
  id: 40,
  name: 'Mochila Escolar Grande Reforçada Para Trabalho E Viagem Preto Liso',
  category: 'Mochilas',
  price: 'R$ 93,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_771910-MLB106943685635_022026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_731354-MLB104277506699_012026-F.webp'
  ],
  desc: 'Mochila Escolar Grande Reforçada Para Trabalho E Viagem Preto Liso.'
});

// produto adicionado pelo usuário: Mochila Feminina Huina Myb Antifurto Moderna P/ Notebook Preta
products.push({
  id: 41,
  name: 'Mochila Feminina Huina Myb Antifurto Moderna P/ Notebook Preta',
  category: 'Mochilas',
  price: 'R$ 94,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_934210-MLA100004890865_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_648035-MLA92449626858_092025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_951555-MLA92858423481_092025-F.webp'
  ],
  desc: 'Mochila Feminina Huina Myb Antifurto Moderna P/ Notebook Preta.'
});

// produto adicionado pelo usuário: Mochila Feminina Escolar Reforçada Grande Impermeável Notebook Resistente Masculina Trabalho Faculdade Com Estojo
products.push({
  id: 42,
  name: 'Mochila Feminina Escolar Reforçada Grande Impermeável Notebook Resistente Masculina Trabalho Faculdade Com Estojo',
  category: 'Mochilas',
  price: 'R$ 88,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_767308-MLA103896619201_012026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_984014-MLA103466291616_012026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_870860-MLA105855942049_012026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_645257-MLA101658859892_122025-F.webp'
  ],
  desc: 'Mochila Feminina Escolar Reforçada Grande Impermeável, ideal para notebook, trabalho e faculdade. Acompanha estojo.'
});

// produto adicionado pelo usuário: Mochila Escolar Infantil Para Menina Personagens
products.push({
  id: 43,
  name: 'Mochila Escolar Infantil Para Menina Personagens',
  category: 'Mochilas',
  price: 'R$ 73,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_835848-MLB90661978445_082025-F-mochila-escolar-infantil-para-menina-personagens.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_915356-MLB85600782853_062025-F-mochila-escolar-infantil-para-menina-personagens.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_891647-MLB90277238882_082025-F-mochila-escolar-infantil-para-menina-personagens.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_692696-MLB85601159057_062025-F-mochila-escolar-infantil-para-menina-personagens.webp'
  ],
  desc: 'Mochila Escolar Infantil Para Menina Personagens.'
});

// produto adicionado pelo usuário: Mochila Feminina Spector Passeio 16l Notebook Kawaii Preto Liso
products.push({
  id: 44,
  name: 'Mochila Feminina Spector Passeio 16l Notebook Kawaii Preto Liso',
  category: 'Mochilas',
  price: 'R$ 109,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_967596-MLB93901175221_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_617180-MLB93480729938_102025-F.webp'
  ],
  desc: 'Mochila Feminina Spector Passeio 16l Notebook Kawaii Preto Liso.'
});

// produto adicionado pelo usuário: Fritadeira Air Fryer Britânia Baf45a 5l 1500w Cor Preto
products.push({
  id: 45,
  name: 'Fritadeira Air Fryer Britânia Baf45a 5l 1500w Cor Preto',
  category: 'Eletroportáteis',
  price: 'R$ 359,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_673085-MLA99956176887_112025-F.webp'
  ],
  desc: 'Fritadeira Air Fryer Britânia Baf45a 5l 1500w Cor Preto.'
});

// produto adicionado pelo usuário: Air Fryer Philco 5,5l Cesto Quadrado 1500w Paf55a Cor Preto
products.push({
  id: 46,
  name: 'Air Fryer Philco 5,5l Cesto Quadrado 1500w Paf55a Cor Preto',
  category: 'Eletroportáteis',
  price: 'R$ 489,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_852936-MLA99499880858_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_884320-MLA88337770721_072025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_933143-MLA84850492043_052025-F.webp'
  ],
  desc: 'Air Fryer Philco 5,5l Cesto Quadrado 1500w Paf55a Cor Preto.'
});

// produto adicionado pelo usuário: Calça Jeans Feminina Cargo Levanta Bumbum Cintura Alta 100%
products.push({
  id: 47,
  name: 'Calça Jeans Feminina Cargo Levanta Bumbum Cintura Alta 100%',
  category: 'Calças',
  price: 'R$ 109,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_920184-MLB83916039702_042025-F-calca-jeans-feminina-cargo-levanta-bumbum-cintura-alta-100.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_692127-MLB83916254798_042025-F-calca-jeans-feminina-cargo-levanta-bumbum-cintura-alta-100.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_758807-MLB83916040020_042025-F-calca-jeans-feminina-cargo-levanta-bumbum-cintura-alta-100.webp'
  ],
  desc: 'Calça Jeans Feminina Cargo Levanta Bumbum Cintura Alta 100%.'
});

// produto adicionado pelo usuário: Smart Tv Samsung LS32BETBLGGXZD 32" HD Led
products.push({
  id: 48,
  name: 'Smart Tv Samsung LS32BETBLGGXZD 32" HD Led',
  category: 'Televisores',
  price: 'R$ 1.088,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_959706-MLA99950013507_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_814950-MLU77145775508_062024-F.webp'
  ],
  desc: 'Smart Tv Samsung LS32BETBLGGXZD 32" HD Led.'
});

// produto adicionado pelo usuário: Smart Tv 32 Philco Ptv32k34rkgb Roku Tv Led Dolby Audio
products.push({
  id: 49,
  name: 'Smart Tv 32 Philco Ptv32k34rkgb Roku Tv Led Dolby Audio',
  category: 'Televisores',
  price: 'R$ 998,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_681053-MLA99382614472_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_864527-MLA88319892049_072025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_792929-MLU78645538111_082024-F.webp'
  ],
  desc: 'Smart Tv 32 Philco Ptv32k34rkgb Roku Tv Led Dolby Audio.'
});

// produto adicionado pelo usuário: Principia Kit Gel de Limpeza GL-01 + Protetor Solar Facial PS-01 FPS 60
products.push({
  id: 50,
  name: 'Principia Kit Gel de Limpeza GL-01 + Protetor Solar Facial PS-01 FPS 60',
  category: 'Cuidados Pessoais',
  price: 'R$ 118,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_908971-MLA103561914983_012026-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_604685-MLA100243937098_122025-F.webp'
  ],
  desc: 'Principia Kit Gel de Limpeza GL-01 + Protetor Solar Facial PS-01 FPS 60.'
});

// produto adicionado pelo usuário: Kit 2 Short Cargo Feminino Moletinho Verão Esporte Blogueira
products.push({
  id: 51,
  name: 'Kit 2 Short Cargo Feminino Moletinho Verão Esporte Blogueira',
  category: 'Shorts',
  price: 'R$ 88,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_813303-MLB96791343064_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_910329-MLB97505625720_112025-F.webp'
  ],
  desc: 'Kit 2 Short Cargo Feminino Moletinho Verão Esporte Blogueira.'
});

// produto adicionado pelo usuário: Shorts Feminino Meia Coxa Alfaiataria Cintura Alta Verão
products.push({
  id: 52,
  name: 'Shorts Feminino Meia Coxa Alfaiataria Cintura Alta Verão',
  category: 'Shorts',
  price: 'R$ 68,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_657103-MLA107203821839_022026-F-shorts-feminino-meia-coxa-alfaiataria-cintura-alta-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_972870-MLA106556641248_022026-F-shorts-feminino-meia-coxa-alfaiataria-cintura-alta-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_988019-MLA106556366922_022026-F-shorts-feminino-meia-coxa-alfaiataria-cintura-alta-vero.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_808526-MLB95510515730_102025-F-shorts-feminino-meia-coxa-alfaiataria-cintura-alta-vero.webp'
  ],
  desc: 'Shorts Feminino Meia Coxa Alfaiataria Cintura Alta Verão.'
});

// produto adicionado pelo usuário: Short Feminino Social Cinto Alfaiataria Tendência Atual
products.push({
  id: 53,
  name: 'Short Feminino Social Cinto Alfaiataria Tendência Atual',
  category: 'Shorts',
  price: 'R$ 58,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_887761-MLB80427597203_112024-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_701589-MLB85576804302_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_869280-MLB85662752705_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_613919-MLB85662772051_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_652863-MLB85575368100_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_769632-MLB80170822978_112024-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_712448-MLB85358160330_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_674347-MLB85358632064_062025-F-short-feminino-social-cinto-alfaiataria-tendncia-atual.webp'
  ],
  desc: 'Short Feminino Social Cinto Alfaiataria Tendência Atual.'
});

// produto adicionado pelo usuário: Celular Samsung Galaxy A07 128gb
products.push({
  id: 54,
  name: 'Celular Samsung Galaxy A07 128gb, 4gb, Câmera 50mp, Tela 6.7 , Proteção Ip54, Processador 6nm - Preto',
  category: 'Celulares',
  price: 'R$ 728,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_678247-MLA99491753898_112025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_712741-MLA96423997982_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_765861-MLA95532186080_102025-F.webp'
  ],
  desc: 'Celular Samsung Galaxy A07 128gb, 4gb, Câmera 50mp, Tela 6.7 , Proteção Ip54, Processador 6nm - Preto'
});

// produto adicionado pelo usuário: Apple iPhone 15 (Memoria 128 GB)
products.push({
  id: 55,
  name: 'Apple iPhone 15 (Memoria 128 GB) - 6GB Ram',
  category: 'Celulares',
  price: 'R$ 4.588,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_831434-MLA96401363339_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_934652-MLA96402035283_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_680991-MLA95497804976_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_709183-MLA95936544325_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_652389-MLA95937614887_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_823318-MLA95936980071_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_634723-MLA95496999820_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_889040-MLA95936409635_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_801318-MLA95935557497_102025-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_706660-MLA95935557509_102025-F.webp'
  ],
  desc: 'Apple iPhone 15 (Memoria 128 GB) - 6GB Ram'
});

// produto adicionado pelo usuário: Vestido Curto Em Ribana Rovitex Preto
products.push({
  id: 56,
  name: 'Vestido Curto Em Ribana Rovitex Preto',
  category: 'Vestidos',
  price: 'R$ 97,50',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_838639-MLB106541016935_022026-F-vestido-curto-em-ribana-rovitex-preto.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_926392-MLB101234722234_122025-F-vestido-curto-em-ribana-rovitex-preto.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_701297-MLB101234722232_122025-F-vestido-curto-em-ribana-rovitex-preto.webp'
  ],
  desc: 'Vestido Curto Em Ribana Rovitex Preto'
});

// produto adicionado: Vestido Alcinha Diversas Cores Premium
products.push({
  id: 57,
  name: 'Vestido Alcinha Diversas Cores Premium',
  category: 'Vestidos',
  price: 'R$ 68,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_893747-MLB84553987437_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_693612-MLB77817926827_072024-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_893383-MLB84256313694_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_928861-MLB77817926755_072024-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899413-MLB84553324567_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_637791-MLB84256502684_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_893148-MLB84256810206_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_647946-MLB84256810476_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_769747-MLB84553364323_052025-F-vestido-alcinha-diversas-cores-premium-gestante-amamentaco.webp'
  ],
  desc: 'Vestido Alcinha Diversas Cores Premium'
});

// produto adicionado: Vestido 4 Em 1 Soltinho Cores Premium
products.push({
  id: 58,
  name: 'Vestido 4 Em 1 Soltinho Cores Premium',
  category: 'Vestidos',
  price: 'R$ 77,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_809993-MLB84577189141_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_885352-MLB84306711458_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_900648-MLB84604257447_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_800086-MLB84306524492_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_939396-MLB84603852021_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_620601-MLB84604111679_052025-F-vestido-4-em-1-soltinho-cores-premium-gestante-amamentaco.webp'
  ],
  desc: 'Vestido 4 Em 1 Soltinho Cores Premium'
});

// produto adicionado: Kit 2 Pares Tênis Feminino Casual Confortável
products.push({
  id: 59,
  name: 'Kit 2 Pares Tênis Feminino Casual Confortável',
  category: 'Tênis',
  price: 'R$ 148,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_828541-MLB97536840723_112025-F-kit-2-pares-tnis-feminino-casual-confortavel-dia-a-dia.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_652894-MLB97079486256_112025-F-kit-2-pares-tnis-feminino-casual-confortavel-dia-a-dia.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_659623-MLB97078514382_112025-F-kit-2-pares-tnis-feminino-casual-confortavel-dia-a-dia.webp'
  ],
  desc: 'Kit 2 Pares Tênis Feminino Casual Confortável'
});

// produto adicionado: Tenis Femininos Branco Casual Borboleta Sapato
products.push({
  id: 60,
  name: 'Tenis Femininos Branco Casual Borboleta Sapato',
  category: 'Tênis',
  price: 'R$ 126,90',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_754813-MLB77888775620_082024-F-tenis-femininos-branco-casual-borboleta-sapato.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_949742-MLB86948348992_072025-F-tenis-femininos-branco-casual-borboleta-sapato.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_887091-MLB77888648026_082024-F-tenis-femininos-branco-casual-borboleta-sapato.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_952255-MLB92984146644_092025-F-tenis-femininos-branco-casual-borboleta-sapato.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_992264-MLB77888776170_082024-F-tenis-femininos-branco-casual-borboleta-sapato.webp'
  ],
  desc: 'Tenis Femininos Branco Casual Borboleta Sapato'
});

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const whatsappLink = document.getElementById('whatsappLink');

// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Renderiza os cards de produto dinamicamente
function renderProducts(){
  productsGrid.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.id = prod.id;
    const imgSrc = (prod.images && prod.images.length) ? prod.images[0] : (prod.image || '');
    card.innerHTML = `
      <div class="card-media">
        <img loading="lazy" src="${imgSrc}" alt="${prod.name}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${prod.name}</h3>
        <div class="card-price">${prod.price || ''}</div>
        <div class="card-actions">
          <button class="btn btn-outline btn-detail" data-id="${prod.id}">Ver detalhes</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
    // armazenar imagens no botão para uso no modal
    const btn = card.querySelector('.btn-detail');
    if(btn){
      const imgs = prod.images ? prod.images : (prod.image ? [prod.image] : []);
      btn.dataset.images = JSON.stringify(imgs);
    }
  });
}

// Abre modal com os detalhes do produto
function openModal(product){
  const imgs = product.images ? product.images : (product.image ? [product.image] : []);
  modalImage.src = imgs[0] || '';
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.desc;
  modalPrice.textContent = product.price;

  // Gera link do WhatsApp com mensagem automática e url encode
  const message = `Olá, me interessei pelo produto ${product.name} da Thalia Modas.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  whatsappLink.href = url;

  // adicionar miniaturas de variações (se existirem)
  const existingThumbs = document.querySelector('.modal-thumbs');
  if(existingThumbs) existingThumbs.remove();
  if(imgs.length > 1){
    const thumbs = document.createElement('div');
    thumbs.className = 'modal-thumbs';
    imgs.forEach((src, idx)=>{
      const t = document.createElement('button');
      t.type = 'button';
      t.className = 'thumb-btn';
      t.innerHTML = `<img src="${src}" alt="variação ${idx+1}">`;
      t.addEventListener('click', ()=>{
        modalImage.src = src;
        // marcar ativo
        thumbs.querySelectorAll('.thumb-btn').forEach(b=>b.classList.remove('active'));
        t.classList.add('active');
      });
      if(idx===0) t.classList.add('active');
      thumbs.appendChild(t);
    });
    // inserir antes das ações
    const info = document.querySelector('.modal-info');
    if(info){ info.insertBefore(thumbs, info.querySelector('.modal-actions')); }
  }

  modal.classList.remove('hidden');
}

// Fecha o modal
function closeModal(){
  modal.classList.add('hidden');
  // limpa src para ajudar no carregamento de imagens
  modalImage.src = '';
}

// Delegação de eventos para os botões "Ver detalhes"

function handleProductCardEvent(e) {
  // Se clicar/tocar no botão "Ver detalhes"
  const btn = e.target.closest('.btn-detail');
  if(btn){
    e.stopPropagation();
    const id = Number(btn.dataset.id);
    const prod = products.find(p=>p.id===id);
    if(prod) openModal(prod);
    return;
  }
  // Se clicar/tocar no card (mas não no botão)
  const card = e.target.closest('.card');
  if(card){
    const id = Number(card.dataset.id);
    const prod = products.find(p=>p.id===id);
    if(prod) openModal(prod);
  }
}
productsGrid.addEventListener('click', handleProductCardEvent);

// Fechar modal por overlay, botão e tecla ESC
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const href = this.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  });
});

// Inicialização
renderProducts();

// Configura link do botão flutuante do WhatsApp
const whatsappFloat = document.getElementById('whatsappFloat');
if(whatsappFloat){
  const msg = 'Olá, gostaria de informações sobre a Thalia Modas.';
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Configura link do WhatsApp no rodapé (se presente)
const whatsappFooter = document.getElementById('whatsappFooter');
if(whatsappFooter){
  const footerMsg = 'Olá, me interessei pelo catálogo da Thalia Modas.';
  whatsappFooter.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(footerMsg)}`;
}

/*
  Observações:
  - Substitua `WHATSAPP_NUMBER` pelo número real (somente dígitos, código do país + DDD + número).
  - Adicione as imagens reais na pasta /img com os nomes usados em `products[].image`.
  - Você pode estender os campos do array `products` conforme necessário.
*/