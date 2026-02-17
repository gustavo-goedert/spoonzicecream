
export type Language = 'EN' | 'ES' | 'PT';

export const translations = {
  EN: {
    nav: {
      menu: 'Menu',
      how: 'How It Works',
      story: 'Story',
      reviews: 'Reviews',
      gallery: 'Gallery',
      allergy: 'Allergy Friendly',
      location: 'Location',
      faq: 'FAQ',
      call: 'Call Now',
      directions: 'Get Directions'
    },
    hero: {
      badge: 'Temporarily Closed',
      headline: 'Hand-Rolled Ice Cream. Made Fresh. Gulf Shores Favorite.',
      subheadline: 'Made-to-order rolled ice cream crafted with real ingredients, endless toppings, and a family-owned touch that turns every visit into a sweet memory.',
      cta1: 'Build Your Dream Cup',
      cta2: 'Visit Us Today',
      chips: ['Fresh Daily Base', 'Endless Customization', 'Family-Owned', 'Allergy-Friendly Care']
    },
    awards: {
      title: 'Recognition of Excellence',
      subtitle: 'Awarded Top 5 Best Ice Cream in Baldwin County for three consecutive years.'
    },
    menu: {
      title: 'Signature Rolls Everyone Loves',
      subtitle: 'Indulge in our fan favorites, crafted with precision and passion.',
      items: [
        { name: 'Oreo for Days', desc: 'Double Oreo crunch with chocolate drizzle.' },
        { name: 'Strawberry Cheesecake', desc: 'Real cheesecake bites and fresh strawberries.' },
        { name: 'Key Lime Pie', desc: 'Tart key lime base with graham cracker crust.' },
        { name: 'Lemon Crumble', desc: 'Zesty lemon curd with shortbread crumbles.' },
        { name: 'Nutty Pecan', desc: 'Roasted pecans and rich caramel drizzle.' },
        { name: 'Birthday Cake', desc: 'Cake batter base with rainbow sprinkles.' }
      ]
    },
    how: {
      title: 'Fresh Rolled Ice Cream — Made Right in Front of You',
      steps: [
        { title: 'Pour & Mix', desc: 'We pour our fresh liquid base onto a -20°F plate.' },
        { title: 'Chop & Roll', desc: 'Fresh ingredients are chopped in and rolled to perfection.' },
        { title: 'Stack & Serve', desc: 'Beautifully stacked and finished with your favorite toppings.' }
      ]
    },
    allergy: {
      title: 'Allergy-Friendly Care You Can Trust',
      subtitle: 'We prioritize your safety with dedicated care and clean handling.',
      items: ['Ingredient Awareness', 'Careful Handling', 'Friendly Staff Support', 'Clean Environment'],
      disclaimer: 'Please let our staff know about any allergies. We take care seriously, but cross-contact may still be possible.'
    },
    builder: {
      title: 'Create Your Own Roll',
      subtitle: 'Choose your base, mix-ins, drizzle, and toppings — we roll it fresh, right in front of you.',
      steps: ['Base', 'Mix-ins', 'Drizzle', 'Toppings'],
      score: 'Flavor Score',
      share: 'Share Combo',
      shareMsg: 'My Spoonz creation: ',
      visit: 'Visit Us Today'
    },
    about: {
      title: 'A Sweet Family Tradition',
      quote: 'This is not just ice cream. It’s an experience.'
    },
    reviews: {
      title: 'Why People Love Spoonz',
      subtitle: 'Real stories from our sweet customers.'
    },
    footer: {
      rights: 'All Rights Reserved.',
      designed: 'Designed & Developed by'
    }
  },
  ES: {
    nav: {
      menu: 'Menú',
      how: 'Cómo Funciona',
      story: 'Historia',
      reviews: 'Reseñas',
      gallery: 'Galería',
      allergy: 'Alergia Amigable',
      location: 'Ubicación',
      faq: 'FAQ',
      call: 'Llamar',
      directions: 'Direcciones'
    },
    hero: {
      badge: 'Temporalmente Cerrado',
      headline: 'Helado Enrollado a Mano. Hecho Fresco.',
      subheadline: 'Helado artesanal hecho a pedido con ingredientes reales y un toque familiar que hace cada visita especial.',
      cta1: 'Crea Tu Copa',
      cta2: 'Visítanos Hoy',
      chips: ['Base Fresca', 'Personalización Infinita', 'Propiedad Familiar', 'Cuidado de Alergias']
    },
    awards: {
      title: 'Reconocimiento de Excelencia',
      subtitle: 'Premiado como Top 5 de los mejores helados en el condado de Baldwin por tres años consecutivos.'
    },
    menu: {
      title: 'Rollos Exclusivos que a Todos les Encantan',
      subtitle: 'Deléitate con nuestros favoritos, creados con precisión y pasión.',
      items: [
        { name: 'Oreo para Días', desc: 'Crujiente doble Oreo con sirope de chocolate.' },
        { name: 'Cheesecake de Fresa', desc: 'Trozos de cheesecake real y fresas frescas.' },
        { name: 'Key Lime Pie', desc: 'Base de lima ácida con costra de galleta graham.' },
        { name: 'Crumble de Limón', desc: 'Crema de limón con trozos de galleta.' },
        { name: 'Nuez de Pecán', desc: 'Nueces tostadas y caramelo rico.' },
        { name: 'Pastel de Cumpleaños', desc: 'Base de masa de pastel con chispas de colores.' }
      ]
    },
    how: {
      title: 'Helado Enrollado Fresco — Hecho Frente a Ti',
      steps: [
        { title: 'Verter y Mezclar', desc: 'Vertemos nuestra base líquida fresca en una placa a -20°F.' },
        { title: 'Picar y Enrollar', desc: 'Picamos ingredientes frescos y los enrollamos a la perfección.' },
        { title: 'Apilar y Servir', desc: 'Apilados bellamente y terminados con tus toppings favoritos.' }
      ]
    },
    allergy: {
      title: 'Cuidado para Alergias en el que Puedes Confiar',
      subtitle: 'Priorizamos tu seguridad con cuidado dedicado y manejo limpio.',
      items: ['Conciencia de Ingredientes', 'Manejo Cuidadoso', 'Apoyo del Personal', 'Ambiente Limpio'],
      disclaimer: 'Infórmanos sobre cualquier alergia. Nos tomamos el cuidado en serio, pero el contacto cruzado aún es posible.'
    },
    builder: {
      title: 'Crea tu propio rollo',
      subtitle: 'Elige tu base, complementos, salsa y coberturas: lo enrollamos fresco frente a ti.',
      steps: ['Base', 'Mezclas', 'Salsa', 'Toppings'],
      score: 'Puntaje de Sabor',
      share: 'Compartir Combinación',
      shareMsg: 'Mi creación de Spoonz: ',
      visit: 'Visítanos Hoy'
    },
    about: {
      title: 'Una Dulce Tradición Familiar',
      quote: 'Esto no es solo helado. Es una experiencia.'
    },
    reviews: {
      title: 'Por Qué la Gente Ama Spoonz',
      subtitle: 'Historias reales de nuestros dulces clientes.'
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      designed: 'Diseñado y Desarrollado por'
    }
  },
  PT: {
    nav: {
      menu: 'Cardápio',
      how: 'Como Funciona',
      story: 'História',
      reviews: 'Avaliações',
      gallery: 'Galeria',
      allergy: 'Alergia Friendly',
      location: 'Localização',
      faq: 'FAQ',
      call: 'Ligar Agora',
      directions: 'Direções'
    },
    hero: {
      badge: 'Temporariamente Fechado',
      headline: 'Sorvete de Rolo Artesanal. Feito na Hora.',
      subheadline: 'Sorvete feito na hora com ingredientes reais, coberturas infinitas e o toque familiar que torna cada visita inesquecível.',
      cta1: 'Crie Seu Copo',
      cta2: 'Visite-nos Hoje',
      chips: ['Base Fresca Diária', 'Customização Infinita', 'Familiar', 'Cuidado com Alergias']
    },
    awards: {
      title: 'Reconhecimento de Excelência',
      subtitle: 'Premiado entre os Top 5 Melhores Sorvetes do Condado de Baldwin por três anos consecutivos.'
    },
    menu: {
      title: 'Rolos Assinados que Todos Amam',
      subtitle: 'Delicie-se com os nossos favoritos, criados com precisão e paixão.',
      items: [
        { name: 'Oreo Infinito', desc: 'Crocante de Oreo duplo com calda de chocolate.' },
        { name: 'Cheesecake de Morango', desc: 'Pedaços de cheesecake real e morangos frescos.' },
        { name: 'Torta de Limão', desc: 'Base cítrica com crosta de biscoito graham.' },
        { name: 'Crumble de Limão', desc: 'Curd de limão picante com farelo de biscoito.' },
        { name: 'Pecã Crocante', desc: 'Nozes pecãs torradas e calda de caramelo rica.' },
        { name: 'Bolo de Aniversário', desc: 'Base de massa de bolo com confeitos coloridos.' }
      ]
    },
    how: {
      title: 'Sorvete de Rolo Fresco — Feito na Sua Frente',
      steps: [
        { title: 'Verter & Misturar', desc: 'Derramamos nossa base líquida fresca em uma placa a -30°C.' },
        { title: 'Picar & Enrolar', desc: 'Ingredientes frescos são picados e enrolados com perfeição.' },
        { title: 'Montar & Servir', desc: 'Montados lindamente e finalizados com seus toppings favoritos.' }
      ]
    },
    allergy: {
      title: 'Cuidado com Alergias em que Você Pode Confiar',
      subtitle: 'Priorizamos sua segurança com cuidado dedicado e manuseio limpo.',
      items: ['Consciência de Ingredientes', 'Manuseio Cuidadoso', 'Suporte da Equipe', 'Ambiente Limpo'],
      disclaimer: 'Por favor, informe nossa equipe sobre qualquer alergia. Levamos o cuidado a sério, mas o contato cruzado ainda é possível.'
    },
    builder: {
      title: 'Crie Seu Próprio Rolo',
      subtitle: 'Escolha sua base, mix-ins, calda e toppings — enrolamos na hora, bem na sua frente.',
      steps: ['Base', 'Misturas', 'Calda', 'Coberturas'],
      score: 'Pontuação de Sabor',
      share: 'Compartilhar Combo',
      shareMsg: 'Minha criação Spoonz: ',
      visit: 'Visite-nos Hoje'
    },
    about: {
      title: 'Uma Doce Tradição Familiar',
      quote: 'Não é apenas sorvete. É uma experiência.'
    },
    reviews: {
      title: 'Por Que as Pessoas Amam a Spoonz',
      subtitle: 'Histórias reais dos nossos clientes queridos.'
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      designed: 'Projetado e Desenvolvido por'
    }
  }
};
