import { Product } from '../types/product';

type ProductText = {
  title: string;
  description: string;
};

const categoryFallbacks: Record<string, ProductText> = {
  'mens-shirts': {
    title: 'Camisa masculina',
    description: 'Produto masculino disponível no catálogo da loja.',
  },
  'mens-shoes': {
    title: 'Calçado masculino',
    description: 'Calçado masculino disponível no catálogo da loja.',
  },
  'mens-watches': {
    title: 'Relógio masculino',
    description: 'Relógio masculino disponível no catálogo da loja.',
  },
  'womens-bags': {
    title: 'Bolsa feminina',
    description: 'Bolsa feminina disponível no catálogo da loja.',
  },
  'womens-dresses': {
    title: 'Vestido feminino',
    description: 'Vestido feminino disponível no catálogo da loja.',
  },
  'womens-jewellery': {
    title: 'Joia feminina',
    description: 'Joia feminina disponível no catálogo da loja.',
  },
  'womens-shoes': {
    title: 'Calçado feminino',
    description: 'Calçado feminino disponível no catálogo da loja.',
  },
  'womens-watches': {
    title: 'Relógio feminino',
    description: 'Relógio feminino disponível no catálogo da loja.',
  },
};

const productTexts: Record<number, ProductText> = {
  83: {
    title: 'Camisa Xadrez Azul e Preta',
    description: 'Camisa masculina estilosa e confortável com estampa xadrez clássica. Feita com tecido de alta qualidade, é indicada para ocasiões casuais e semiformais.',
  },
  84: {
    title: 'Camiseta Masculina Gigabyte Aorus',
    description: 'Camiseta casual masculina da Gigabyte Aorus para fãs de jogos. Com o logotipo Aorus e design moderno, combina com um visual descontraído.',
  },
  85: {
    title: 'Camisa Masculina Xadrez',
    description: 'Camisa masculina versátil e atemporal com padronagem xadrez clássica. O caimento confortável e o estilo casual tornam a peça útil em várias ocasiões.',
  },
  86: {
    title: 'Camisa Masculina de Manga Curta',
    description: 'Camisa masculina leve e estilosa para dias quentes. Com manga curta e caimento confortável, oferece um visual descontraído e arrumado.',
  },
  87: {
    title: 'Camisa Masculina Quadriculada',
    description: 'Camisa masculina clássica e versátil com estampa quadriculada. Indicada para diferentes ocasiões, adiciona um toque elegante ao guarda-roupa.',
  },
  88: {
    title: 'Nike Air Jordan 1 Vermelho e Preto',
    description: 'Tênis Nike Air Jordan 1 em vermelho e preto, modelo icônico do basquete conhecido pelo design marcante e desempenho elevado.',
  },
  89: {
    title: 'Chuteiras Nike para Beisebol',
    description: 'Chuteiras Nike desenvolvidas para oferecer tração e desempenho no campo de beisebol. Proporcionam estabilidade e suporte durante jogos e treinos.',
  },
  90: {
    title: 'Tênis Puma Future Rider',
    description: 'Tênis Puma Future Rider com combinação de estilo retrô e conforto moderno. Ideal para uso casual no dia a dia.',
  },
  91: {
    title: 'Tênis Esportivo Branco Suave e Vermelho',
    description: 'Tênis esportivo em branco suave e vermelho que combina estilo e funcionalidade. A mistura de cores cria um visual ousado e cheio de energia.',
  },
  92: {
    title: 'Tênis Esportivo Branco Suave com Vermelho',
    description: 'Outra variação do tênis esportivo branco suave com vermelho, com design diferenciado. Oferece estilo e conforto para ocasiões casuais.',
  },
  93: {
    title: 'Relógio com Pulseira de Couro Marrom',
    description: 'Relógio elegante com design clássico, pulseira de couro legítimo e mostrador refinado. Acrescenta sofisticação ao visual.',
  },
  94: {
    title: 'Longines Master Collection',
    description: 'Relógio Longines Master Collection elegante e refinado, conhecido pela precisão e pelo acabamento cuidadoso. Seu design atemporal transmite luxo e sofisticação.',
  },
  95: {
    title: 'Rolex Cellini Date Mostrador Preto',
    description: 'Relógio Rolex Cellini Date com mostrador preto, clássico e prestigiado. A função de data e o acabamento sofisticado reforçam a tradição da marca.',
  },
  96: {
    title: 'Rolex Cellini Moonphase',
    description: 'Relógio Rolex Cellini Moonphase com complicação de fase da lua e design requintado. Representa precisão, elegância e tradição relojoeira.',
  },
  97: {
    title: 'Rolex Datejust',
    description: 'Relógio Rolex Datejust icônico e versátil, com janela de data. Conhecido pelo design atemporal e pela confiabilidade.',
  },
  98: {
    title: 'Relógio Rolex Submariner',
    description: 'Relógio Rolex Submariner, modelo lendário de mergulho com grande história. Reconhecido pela durabilidade e resistência à água.',
  },
  172: {
    title: 'Bolsa Feminina Azul',
    description: 'Bolsa feminina azul, estilosa e espaçosa para uso diário. Com cor vibrante e vários compartimentos, une moda e funcionalidade.',
  },
  173: {
    title: 'Bolsa Feminina de Couro Heshe',
    description: 'Bolsa feminina de couro Heshe, sofisticada e de alta qualidade. Com design atemporal e acabamento durável, é um acessório versátil.',
  },
  174: {
    title: 'Bolsa Feminina Prada',
    description: 'Bolsa feminina Prada com design icônico, elegante e luxuoso. Produzida com cuidado nos detalhes e com o logotipo Prada em destaque.',
  },
  175: {
    title: 'Mochila Branca de Couro Sintético',
    description: 'Mochila branca de couro sintético, moderna e prática para a mulher contemporânea. Tem design limpo e bom espaço interno para uso casual.',
  },
  176: {
    title: 'Bolsa Feminina Preta',
    description: 'Bolsa feminina preta, clássica e versátil, fácil de combinar com diferentes looks. O design funcional a torna uma peça essencial.',
  },
  177: {
    title: 'Vestido Longo Feminino Preto',
    description: 'Vestido longo feminino preto, elegante e atemporal para eventos formais e ocasiões especiais. O visual transmite sofisticação e estilo.',
  },
  178: {
    title: 'Corset de Couro com Saia',
    description: 'Conjunto ousado com corset de couro e saia combinando. Ideal para quem busca um visual moderno e marcante.',
  },
  179: {
    title: 'Corset com Saia Preta',
    description: 'Conjunto versátil com corset estiloso e saia preta clássica. Oferece um visual coordenado e atual para diferentes ocasiões.',
  },
  180: {
    title: 'Vestido com Estampa de Poás',
    description: 'Vestido confortável com estampa de poás, ideal para passeios casuais. A padronagem adiciona um toque leve e divertido ao guarda-roupa.',
  },
  181: {
    title: 'Conjunto Marni Vermelho e Preto',
    description: 'Conjunto Marni em tons de vermelho e preto, sofisticado e moderno. O design transmite um visual confiante e cheio de personalidade.',
  },
  182: {
    title: 'Brinco de Cristal Verde',
    description: 'Brinco com cristal verde vibrante e design clássico. Acrescenta elegância ao visual e combina com ocasiões formais ou especiais.',
  },
  183: {
    title: 'Brinco Oval Verde',
    description: 'Brinco oval verde, versátil e estiloso, com formato diferenciado. A cor e o design contemporâneo tornam a peça marcante.',
  },
  184: {
    title: 'Brinco Tropical',
    description: 'Brinco divertido inspirado em elementos tropicais. Com cores vibrantes e design leve, adiciona um toque de verão ao visual.',
  },
  185: {
    title: 'Chinelo Preto e Marrom',
    description: 'Chinelo preto e marrom confortável e estiloso para uso casual. A combinação de cores acrescenta sofisticação aos momentos de descanso.',
  },
  186: {
    title: 'Sapato de Salto Calvin Klein',
    description: 'Sapato de salto Calvin Klein elegante e sofisticado, pensado para ocasiões formais. O design clássico combina com looks refinados.',
  },
  187: {
    title: 'Sapato Feminino Dourado',
    description: 'Sapato feminino dourado com visual glamouroso para ocasiões especiais. A cor metálica adiciona luxo e destaque ao look.',
  },
  188: {
    title: 'Sapato Pampi',
    description: 'Sapato Pampi com equilíbrio entre conforto e estilo para o uso diário. O design versátil combina com diversas ocasiões casuais.',
  },
  189: {
    title: 'Sapato Vermelho',
    description: 'Sapato vermelho com cor vibrante e presença marcante. Ideal para festas ou passeios casuais, adiciona estilo ao guarda-roupa.',
  },
  190: {
    title: 'IWC Ingenieur Automático em Aço',
    description: 'Relógio IWC Ingenieur automático em aço, durável e sofisticado. Com caixa de aço inoxidável e movimento automático, une precisão e estilo.',
  },
  191: {
    title: 'Rolex Cellini Moonphase',
    description: 'Relógio Rolex Cellini Moonphase com complicação de fase da lua. Exibe o acabamento e a elegância reconhecidos da marca.',
  },
  192: {
    title: 'Rolex Datejust Feminino',
    description: 'Relógio Rolex Datejust feminino, icônico e atemporal. Com função de data, oferece elegância e funcionalidade.',
  },
  193: {
    title: 'Relógio Feminino Dourado',
    description: 'Relógio feminino dourado, elegante e luxuoso. A caixa com acabamento dourado e o design refinado dão glamour a qualquer look.',
  },
  194: {
    title: 'Relógio de Pulso Feminino',
    description: 'Relógio de pulso feminino versátil para o dia a dia. Com pulseira confortável e design simples, combina com vários estilos.',
  },
};

export function getProductPresentation(product: Product): ProductText {
  return productTexts[product.id] ?? categoryFallbacks[product.category] ?? {
    title: 'Produto do catálogo',
    description: 'Produto disponível no catálogo da loja.',
  };
}
