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
  id: 14,
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
  id: 15,
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
  id: 16,
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