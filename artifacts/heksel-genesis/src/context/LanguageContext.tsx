import { createContext, useContext, useState, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Lang = "English" | "Português" | "Français" | "中文";

// ---------------------------------------------------------------------------
// Collector Pack
// ---------------------------------------------------------------------------

export interface CollectorPackItem { icon: string; title: string; desc: string; }
export interface CollectorPackT {
  header: string; price: string; includes: string;
  items: CollectorPackItem[]; badge: string;
}

// ---------------------------------------------------------------------------
// UI Text — SafeSpace, BrandSection, HoodieSimulator, Hero, Navbar
// ---------------------------------------------------------------------------

export interface UIText {
  safeSpace: {
    systemBar: string; status: string; directive: string;
    para1Lead: string; para1Body: string; para2Body: string; pride: string;
    security: string; inclusion: string;
    btnIdle: string; btnActive: string; statusOnline: string; statusSyncing: string;
  };
  brand: {
    badge: string; title1: string; title2: string; btnAdvance: string; btnBrand: string;
    freemium: { badge: string; name: string; price: string; desc: string; features: string[]; cta: string; };
    premium: { badge: string; name: string; price: string; period: string; desc: string; features: string[]; cta: string; };
  };
  hoodie: {
    stepModel: string; stepColor: string; stepArea: string; stepUpload: string; stepYAxis: string;
    clearColor: string; removeStamp: string;
    stampOk: string; editing: string; empty: string;
    backAreaNote: string;
    dragOrClick: string; dragHint: string; stampLoaded: string;
    stampPlaceholder: string; loading: string;
    xLocked: string; top: string; base: string;
    stampsAdded: string; identityPreview: string;
    areaFront: string; areaBack: string; areaLeftSleeve: string; areaRightSleeve: string;
    colorApplied: string; configure: string; areaCount: string;
  };
  checkoutTitle: string;
  freemioBanner: string;
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    btnOrder: string;
    btnBrand: string;
    btnExplore: string;
    btnManifesto: string;
    statBuilders: string;
    statLines: string;
    statDrop: string;
    tabCustomize: string;
    tabExample: string;
    productTitle: string;
    imageBadge: string;
  };
  nav: {
    home: string;
    collection: string;
    create: string;
    manifesto: string;
    helpUs: string;
    notifyMe: string;
    vipAccess: string;
    langLabel: string;
  };
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const collectorPack: Record<Lang, CollectorPackT> = {
  English: {
    header: "✦ Collector Pack — What's Included",
    price: "R$ 300.00",
    includes: "Includes: Personalized Letter 🃏 + Exclusive Heksel Sticker + Special Imperium Fragrance 🧪",
    items: [
      { icon: "🟪", title: "Premium Custom Sweatshirt", desc: "Dual-print (Bone Front / Furry Back) engineered heavyweight cotton." },
      { icon: "🔑", title: "Heksel Genesis Keychain", desc: "Perfect accessory for your backpack, bag, or car mirror." },
      { icon: "💎", title: "Official Genesis Sticker Pack", desc: "High-fidelity vinyl stickers to customize your laptop or gear." },
      { icon: "✉️", title: "Handcrafted Serialized Letter", desc: "Custom thank-you card with your unique serial number (e.g., 'You are customer #10'), locking your collector position." },
    ],
    badge: "🔒 LIMITED EDITION · UNIQUE SERIAL · PREMIUM DELIVERY",
  },
  Português: {
    header: "✦ Collector Pack — O que está incluso",
    price: "R$ 300,00",
    includes: "Inclui: Carta Personalizada 🃏 + Adesivo Exclusivo Heksel + Fragrância Especial Imperium 🧪",
    items: [
      { icon: "🟪", title: "Moletom Personalizado Premium", desc: "Estampa dupla (Frente Bone / Costas Furry) em algodão encorpado de alta engenharia." },
      { icon: "🔑", title: "Chaveiro Heksel Genesis", desc: "Acessório perfeito para sua mochila, bolsa ou espelho do carro." },
      { icon: "💎", title: "Pack de Adesivos Oficiais Genesis", desc: "Adesivos de vinil de alta fidelidade para customizar seu notebook ou acessórios." },
      { icon: "✉️", title: "Carta Serializada Feita à Mão", desc: "Cartão de agradecimento personalizado com seu número de série exclusivo (ex.: 'Você é o cliente #10'), garantindo sua posição de colecionador." },
    ],
    badge: "🔒 EDIÇÃO LIMITADA · SERIAL ÚNICO · ENTREGA PREMIUM",
  },
  Français: {
    header: "✦ Collector Pack — Ce qui est inclus",
    price: "300,00 R$",
    includes: "Comprend : Lettre Personnalisée 🃏 + Autocollant Exclusif Heksel + Parfum Spécial Imperium 🧪",
    items: [
      { icon: "🟪", title: "Sweat-shirt Personnalisé Premium", desc: "Double impression (Bone Front / Furry Back) en coton épais de haute qualité." },
      { icon: "🔑", title: "Porte-clés Heksel Genesis", desc: "L'accessoire parfait pour votre sac à dos, sac ou rétroviseur de voiture." },
      { icon: "💎", title: "Pack d'Autocollants Officiels Genesis", desc: "Autocollants en vinyle haute fidélité pour personnaliser votre ordinateur portable ou vos équipements." },
      { icon: "✉️", title: "Lettre Sérialisée Fabriquée à la Main", desc: "Carte de remerciement personnalisée avec votre numéro de série unique (ex. : 'Vous êtes le client #10'), sécurisant votre position de collectionneur." },
    ],
    badge: "🔒 ÉDITION LIMITÉE · SÉRIE UNIQUE · LIVRAISON PREMIUM",
  },
  "中文": {
    header: "✦ 收藏包 — 包含内容",
    price: "R$ 300.00",
    includes: "包含：个性化信件 🃏 + Heksel 独家贴纸 + 特别 Imperium 香水 🧪",
    items: [
      { icon: "🟪", title: "高级定制卫衣", desc: "双面印花（正面 Bone / 背面 Furry）高端重磅棉质工艺。" },
      { icon: "🔑", title: "Heksel Genesis 钥匙扣", desc: "专为背包、手提包或车内后视镜打造的完美配饰。" },
      { icon: "💎", title: "官方 Genesis 贴纸套装", desc: "高保真乙烯基贴纸，用于定制您的笔记本电脑或装备。" },
      { icon: "✉️", title: "手工制作序列号信件", desc: "带有您唯一序列号的定制感谢卡（例如：'您是第 #10 位顾客'），锁定您的收藏家位置。" },
    ],
    badge: "🔒 限量版 · 唯一序列号 · 高级配送",
  },
};

const uiText: Record<Lang, UIText> = {
  English: {
    checkoutTitle: "🔐 Guaranteed Secure Checkout — Heksel Genesis",
    freemioBanner: "✦ FREEMIO INITIATED ✦ Your free digital universe will include a minimal 'Cognitive Infrastructure by Heksel Genesis' banner at the top. Upgrade to PREEMIO at any time to remove this and unlock absolute brand sovereignty.",
    hero: {
      badge: "The NEO Collection 2026",
      title1: "From beginning",
      title2: "to infinity",
      subtitle: "Three lines. One empire. Performance, home wear and digital luxury — every step is a statement of power.",
      btnOrder: "✦ ORDER MY CUSTOMIZED SWEATSHIRT ✦",
      btnBrand: "💎 Create my brand",
      btnExplore: "Explore All →",
      btnManifesto: "Explore Our Genesis →",
      statBuilders: "Builders",
      statLines: "Lines",
      statDrop: "Drop",
      tabCustomize: "Customize Canvas",
      tabExample: "Live Example",
      productTitle: "MEO-NAI SWEATSHIRT?",
      imageBadge: "YOUR SELECTED IMAGES WILL LOOK LIKE THIS",
    },
    nav: {
      home: "Home", collection: "Collection", create: "Create", manifesto: "Manifesto",
      helpUs: "💜 Help Us", notifyMe: "Notify Me", vipAccess: "VIP Access", langLabel: "🌐 Language",
    },
    safeSpace: {
      systemBar: "🛰️ HEKSEL_GENESIS_SYSTEM_v2.0",
      status: "✨ ACTIVE",
      directive: "[ 🔓 SYSTEM DIRECTIVE — ACCESS GRANTED 🔓 ]",
      para1Lead: "Here, the future belongs to everyone. 🌌✨",
      para1Body: "> Heksel Genesis was conceived as an absolute safe space, welcoming and completely free of judgment. Whether you identify as lesbian, gay, trans, non-binary, furry, or any magnificent expression of self — you belong here. 🫂",
      para2Body: "We believe everyone is fundamentally a normal, beautiful human being, simply defined by their unique, extraordinary tastes. This absolute acceptance of all identities is why anyone who enters our universe falls deeply in love with Heksel.",
      pride: "WEAR YOUR IDENTITY WITH PRIDE. 🌈🦄💜",
      security: "🔒 MAXIMUM SECURITY",
      inclusion: "❤️ 100% INCLUSION",
      btnIdle: "📡 TUNE THE DIRECTIVE",
      btnActive: "TUNING IN... 🌌",
      statusOnline: "✨ ONLINE",
      statusSyncing: "💫 SYNCING",
    },
    brand: {
      badge: "Heksel Services",
      title1: "✦ COGNITIVE INFRASTRUCTURE",
      title2: "ARCHITECT YOUR EMPIRE ✦",
      btnAdvance: "Create in Advance 🚀",
      btnBrand: "✦ Create My Brand ✦",
      freemium: {
        badge: "ENTRY LEVEL", name: "Freemio", price: "Free",
        desc: "Basic digital presence for upcoming builders.",
        features: ["Standard Notion/Linktree setup", "Basic color palette selection", "Community Discord access", "Standard support (48h)"],
        cta: "Try It Now",
      },
      premium: {
        badge: "ELITE LEVEL", name: "Preemio", price: "$4,996.32", period: "/ one-time",
        desc: "Fully customized digital identity and cyberpunk web platform. Pricing adapts seamlessly to your vision — scaling based on the absolute depth, complexity, and tier of elite digital professionalism you command for your brand.",
        features: ["Full React/Vite web application", "Bespoke visual identity & logo design", "Advanced animations & interactions", "Priority VIP support line", "Custom hardware welcome package"],
        cta: "Hire Preemio",
      },
    },
    hoodie: {
      stepModel: "01 — Choose Base Model",
      stepColor: "02 — Identity Color",
      stepArea: "03 — Choose Stamp Area",
      stepUpload: "04 — Upload",
      stepYAxis: "05 — Vertical Position (Y Axis)",
      clearColor: "✕ Clear color",
      removeStamp: "✕ Remove",
      stampOk: "✓ STAMP OK",
      editing: "EDITING",
      empty: "EMPTY",
      backAreaNote: "ℹ️ Back area — indicated in preview by the lower marker",
      dragOrClick: "DRAG OR CLICK",
      dragHint: "to upload stamp in",
      stampLoaded: "✓ LOADED — Click to replace",
      stampPlaceholder: "YOUR\nSTAMP",
      loading: "LOADING...",
      xLocked: "🔒 X AXIS LOCKED — always centered",
      top: "⬆ TOP",
      base: "⬇ BASE",
      stampsAdded: "Stamps added",
      identityPreview: "Identity Preview",
      areaFront: "Front",
      areaBack: "Back",
      areaLeftSleeve: "Left Sleeve",
      areaRightSleeve: "Right Sleeve",
      colorApplied: "✦ COLOR APPLIED",
      configure: "← CONFIGURE YOUR PIECE",
      areaCount: "AREA",
    },
  },
  Português: {
    checkoutTitle: "🔐 Checkout 100% Seguro — Heksel Genesis",
    freemioBanner: "✦ FREEMIO INICIADO ✦ Seu universo digital gratuito incluirá um banner mínimo de 'Cognitive Infrastructure by Heksel Genesis' no topo. Faça upgrade para PREEMIO a qualquer momento para removê-lo e desbloquear soberania absoluta de marca.",
    hero: {
      badge: "A Coleção NEO 2026",
      title1: "Do começo",
      title2: "ao infinito",
      subtitle: "Três linhas. Um império. Performance, home wear e luxo digital — cada passo é uma declaração de poder.",
      btnOrder: "✦ PEÇA MEU MOLETOM PERSONALIZADO ✦",
      btnBrand: "💎 Criar minha marca",
      btnExplore: "Explorar Tudo →",
      btnManifesto: "Explorar Nossa Gênese →",
      statBuilders: "Criadores",
      statLines: "Linhas",
      statDrop: "Drop",
      tabCustomize: "Personalizar Tela",
      tabExample: "Exemplo ao Vivo",
      productTitle: "MOLETOM MEO-NAI?",
      imageBadge: "SUAS IMAGENS SELECIONADAS FICARÃO ASSIM",
    },
    nav: {
      home: "Início", collection: "Coleção", create: "Criar", manifesto: "Manifesto",
      helpUs: "💜 Apoie-nos", notifyMe: "Notifique-me", vipAccess: "Acesso VIP", langLabel: "🌐 Idioma",
    },
    safeSpace: {
      systemBar: "🛰️ SISTEMA_HEKSEL_GENESIS_v2.0",
      status: "✨ ATIVO",
      directive: "[ 🔓 DIRETIVA DE SISTEMA — ACESSO LIBERADO 🔓 ]",
      para1Lead: "Aqui, o futuro pertence a todos. 🌌✨",
      para1Body: "> Heksel Genesis foi concebido como um safe space absoluto, acolhedor e completamente livre de julgamentos. Seja você lésbica, gay, trans, não-binário, furry, ou qualquer magnífica expressão de ser — você pertence aqui. 🫂",
      para2Body: "Acreditamos que cada pessoa é fundamentalmente um ser humano normal e lindo, definido simplesmente por seus gostos únicos e extraordinários. Essa aceitação absoluta de todas as identidades é o motivo pelo qual quem entra no nosso universo se apaixona profundamente pela Heksel.",
      pride: "USE SUA IDENTIDADE COM ORGULHO. 🌈🦄💜",
      security: "🔒 SEGURANÇA MÁXIMA",
      inclusion: "❤️ INCLUSÃO 100%",
      btnIdle: "📡 SINTONIZAR DIRETRIZ",
      btnActive: "SINTONIZANDO... 🌌",
      statusOnline: "✨ ONLINE",
      statusSyncing: "💫 SINCRONIZANDO",
    },
    brand: {
      badge: "Heksel Services",
      title1: "✦ INFRAESTRUTURA COGNITIVA",
      title2: "ARQUITETE SEU IMPÉRIO ✦",
      btnAdvance: "Criar em Avanço 🚀",
      btnBrand: "✦ Criar Minha Marca ✦",
      freemium: {
        badge: "NÍVEL INICIAL", name: "Freemio", price: "Grátis",
        desc: "Presença digital básica para construtores emergentes.",
        features: ["Configuração Notion/Linktree padrão", "Seleção básica de paleta de cores", "Acesso à Discord da comunidade", "Suporte padrão (48h)"],
        cta: "Experimente Agora",
      },
      premium: {
        badge: "NÍVEL ELITE", name: "Preemio", price: "$4,996.32", period: "/ pagamento único",
        desc: "Identidade digital cyberpunk sob medida & plataforma web completa.",
        features: ["Aplicação web React/Vite completa", "Identidade visual & logo sob medida", "Animações & interações avançadas", "Linha de suporte VIP prioritário", "Kit de boas-vindas hardware personalizado"],
        cta: "Contratar Preemio",
      },
    },
    hoodie: {
      stepModel: "01 — Escolha o Modelo Base",
      stepColor: "02 — Cor da Identidade Visual",
      stepArea: "03 — Escolha a Área de Estampa",
      stepUpload: "04 — Upload",
      stepYAxis: "05 — Posição Vertical (Eixo Y)",
      clearColor: "✕ Limpar cor",
      removeStamp: "✕ Remover",
      stampOk: "✓ ESTAMPA OK",
      editing: "EDITANDO",
      empty: "VAZIO",
      backAreaNote: "ℹ️ Área traseira — indicada no preview pelo marcador inferior",
      dragOrClick: "ARRASTE OU CLIQUE",
      dragHint: "para carregar estampa em",
      stampLoaded: "✓ CARREGADA — Clique para trocar",
      stampPlaceholder: "SUA\nESTAMPA",
      loading: "CARREGANDO...",
      xLocked: "🔒 EIXO X BLOQUEADO — sempre centralizado",
      top: "⬆ TOPO",
      base: "⬇ BASE",
      stampsAdded: "Estampas adicionadas",
      identityPreview: "Prévia da Identidade",
      areaFront: "Frente",
      areaBack: "Atrás",
      areaLeftSleeve: "Manga Esquerda",
      areaRightSleeve: "Manga Direita",
      colorApplied: "✦ COR APLICADA",
      configure: "← CONFIGURE SUA PEÇA",
      areaCount: "ÁREA",
    },
  },
  Français: {
    checkoutTitle: "🔐 Paiement 100% Sécurisé — Heksel Genesis",
    freemioBanner: "✦ FREEMIO INITIÉ ✦ Votre univers numérique gratuit inclura une bannière minimale 'Cognitive Infrastructure by Heksel Genesis' en haut. Passez au PREEMIO à tout moment pour la supprimer et débloquer une souveraineté de marque absolue.",
    hero: {
      badge: "La Collection NEO 2026",
      title1: "Du début",
      title2: "à l'infini",
      subtitle: "Trois lignes. Un empire. Performance, home wear et luxe numérique — chaque pas est une déclaration de puissance.",
      btnOrder: "✦ COMMANDER MON SWEAT PERSONNALISÉ ✦",
      btnBrand: "💎 Créer ma marque",
      btnExplore: "Explorer Tout →",
      btnManifesto: "Explorer Notre Genèse →",
      statBuilders: "Créateurs",
      statLines: "Lignes",
      statDrop: "Drop",
      tabCustomize: "Canvas Personnalisé",
      tabExample: "Exemple en Direct",
      productTitle: "SWEAT MEO-NAI ?",
      imageBadge: "VOS IMAGES SÉLECTIONNÉES RESSEMBLERONT À CECI",
    },
    nav: {
      home: "Accueil", collection: "Collection", create: "Créer", manifesto: "Manifeste",
      helpUs: "💜 Nous Aider", notifyMe: "Me Notifier", vipAccess: "Accès VIP", langLabel: "🌐 Langue",
    },
    safeSpace: {
      systemBar: "🛰️ SYSTÈME_HEKSEL_GENESIS_v2.0",
      status: "✨ ACTIF",
      directive: "[ 🔓 DIRECTIVE SYSTÈME — ACCÈS ACCORDÉ 🔓 ]",
      para1Lead: "Ici, le futur appartient à tout le monde. 🌌✨",
      para1Body: "> Heksel Genesis a été conçu comme un espace sûr absolu, accueillant et totalement sans jugement. Que vous vous identifiiez comme lesbienne, gay, trans, non-binaire, furry, ou toute autre magnifique expression de soi — vous avez votre place ici. 🫂",
      para2Body: "Nous croyons que chaque personne est fondamentalement un être humain normal et magnifique, simplement défini par ses goûts uniques et extraordinaires. Cette acceptation absolue de toutes les identités explique pourquoi quiconque entre dans notre univers tombe profondément amoureux d'Heksel.",
      pride: "PORTEZ VOTRE IDENTITÉ AVEC FIERTÉ. 🌈🦄💜",
      security: "🔒 SÉCURITÉ MAXIMALE",
      inclusion: "❤️ INCLUSION 100%",
      btnIdle: "📡 SYNTONISER LA DIRECTIVE",
      btnActive: "SYNTONISATION... 🌌",
      statusOnline: "✨ EN LIGNE",
      statusSyncing: "💫 SYNCHRONISATION",
    },
    brand: {
      badge: "Services Heksel",
      title1: "✦ INFRASTRUCTURE COGNITIVE",
      title2: "ARCHITECTUREZ VOTRE EMPIRE ✦",
      btnAdvance: "Créer en Avance 🚀",
      btnBrand: "✦ Créer Ma Marque ✦",
      freemium: {
        badge: "NIVEAU ENTRÉE", name: "Freemio", price: "Gratuit",
        desc: "Présence numérique de base pour les créateurs émergents.",
        features: ["Configuration Notion/Linktree standard", "Sélection de palette de base", "Accès Discord communautaire", "Support standard (48h)"],
        cta: "Essayer Maintenant",
      },
      premium: {
        badge: "NIVEAU ÉLITE", name: "Preemio", price: "$4,996.32", period: "/ paiement unique",
        desc: "Identité numérique cyberpunk sur mesure & plateforme web complète.",
        features: ["Application web React/Vite complète", "Identité visuelle & logo sur mesure", "Animations & interactions avancées", "Ligne de support VIP prioritaire", "Pack d'accueil hardware personnalisé"],
        cta: "Embaucher Preemio",
      },
    },
    hoodie: {
      stepModel: "01 — Choisir le Modèle de Base",
      stepColor: "02 — Couleur d'Identité",
      stepArea: "03 — Zone d'Impression",
      stepUpload: "04 — Télécharger",
      stepYAxis: "05 — Position Verticale (Axe Y)",
      clearColor: "✕ Effacer couleur",
      removeStamp: "✕ Supprimer",
      stampOk: "✓ ESTAMPE OK",
      editing: "ÉDITION",
      empty: "VIDE",
      backAreaNote: "ℹ️ Zone arrière — indiquée dans l'aperçu par le marqueur inférieur",
      dragOrClick: "GLISSER OU CLIQUER",
      dragHint: "pour charger l'estampe sur",
      stampLoaded: "✓ CHARGÉE — Cliquez pour remplacer",
      stampPlaceholder: "VOTRE\nESTAMPE",
      loading: "CHARGEMENT...",
      xLocked: "🔒 AXE X VERROUILLÉ — toujours centré",
      top: "⬆ HAUT",
      base: "⬇ BAS",
      stampsAdded: "Estampes ajoutées",
      identityPreview: "Aperçu de l'Identité",
      areaFront: "Devant",
      areaBack: "Dos",
      areaLeftSleeve: "Manche Gauche",
      areaRightSleeve: "Manche Droite",
      colorApplied: "✦ COULEUR APPLIQUÉE",
      configure: "← CONFIGUREZ VOTRE PIÈCE",
      areaCount: "ZONE",
    },
  },
  "中文": {
    checkoutTitle: "🔐 官方安全加密结账 — Heksel Genesis",
    freemioBanner: "✦ FREEMIO 已启动 ✦ 您的免费数字宇宙将在顶部包含一个最小的 'Cognitive Infrastructure by Heksel Genesis' 横幅。随时升级到 PREEMIO 以移除该横幅并解锁绝对品牌主权。",
    hero: {
      badge: "NEO 2026 系列",
      title1: "从起点",
      title2: "到无限",
      subtitle: "三条线。一个帝国。性能、家居服与数字奢华——每一步都是力量的宣言。",
      btnOrder: "✦ 订购我的定制卫衣 ✦",
      btnBrand: "💎 创建我的品牌",
      btnExplore: "探索全部 →",
      btnManifesto: "探索我们的创世 →",
      statBuilders: "创造者",
      statLines: "系列",
      statDrop: "发布",
      tabCustomize: "定制画布",
      tabExample: "实时示例",
      productTitle: "MEO-NAI 卫衣？",
      imageBadge: "您的选定图片将呈现如下效果",
    },
    nav: {
      home: "首页", collection: "系列", create: "创建", manifesto: "宣言",
      helpUs: "💜 支持我们", notifyMe: "通知我", vipAccess: "VIP 通道", langLabel: "🌐 语言",
    },
    safeSpace: {
      systemBar: "🛰️ HEKSEL_GENESIS_系统_v2.0",
      status: "✨ 运行中",
      directive: "[ 🔓 系统指令 — 访问已授权 🔓 ]",
      para1Lead: "在这里，未来属于所有人。 🌌✨",
      para1Body: "> Heksel Genesis 被构建为一个绝对的安全空间，欢迎且完全无评判。无论您认同为女同、男同、跨性别、非二元、兽迷，或任何壮丽的自我表达方式 — 您都属于这里。 🫂",
      para2Body: "我们相信每个人从根本上都是正常而美丽的人类，仅仅由其独特非凡的品味所定义。这种对所有身份的绝对接纳，是为何进入我们宇宙的人都深深爱上 Heksel 的原因。",
      pride: "骄傲地展现你的身份。 🌈🦄💜",
      security: "🔒 最高安全",
      inclusion: "❤️ 100% 包容",
      btnIdle: "📡 调频指令",
      btnActive: "调频中... 🌌",
      statusOnline: "✨ 在线",
      statusSyncing: "💫 同步中",
    },
    brand: {
      badge: "Heksel 服务",
      title1: "✦ 认知基础设施",
      title2: "构建你的帝国 ✦",
      btnAdvance: "提前创建 🚀",
      btnBrand: "✦ 创建我的品牌 ✦",
      freemium: {
        badge: "入门级别", name: "Freemio", price: "免费",
        desc: "为新兴创造者提供的基础数字存在。",
        features: ["标准 Notion/Linktree 设置", "基础配色方案选择", "社区 Discord 访问", "标准支持（48小时）"],
        cta: "立即尝试",
      },
      premium: {
        badge: "精英级别", name: "Preemio", price: "$4,996.32", period: "/ 一次性付款",
        desc: "全套定制赛博朋克数字身份与网络平台。",
        features: ["完整 React/Vite 网络应用", "定制视觉识别与标志设计", "高级动画与交互", "优先 VIP 支持热线", "定制硬件欢迎套装"],
        cta: "聘请 Preemio",
      },
    },
    hoodie: {
      stepModel: "01 — 选择基础款式",
      stepColor: "02 — 身份颜色",
      stepArea: "03 — 选择印花区域",
      stepUpload: "04 — 上传",
      stepYAxis: "05 — 垂直位置（Y轴）",
      clearColor: "✕ 清除颜色",
      removeStamp: "✕ 移除",
      stampOk: "✓ 印花确认",
      editing: "编辑中",
      empty: "空",
      backAreaNote: "ℹ️ 背面区域 — 在预览中由下方标记指示",
      dragOrClick: "拖拽或点击",
      dragHint: "以上传印花至",
      stampLoaded: "✓ 已加载 — 点击替换",
      stampPlaceholder: "你的\n印花",
      loading: "加载中...",
      xLocked: "🔒 X轴锁定 — 始终居中",
      top: "⬆ 顶部",
      base: "⬇ 底部",
      stampsAdded: "已添加印花",
      identityPreview: "身份预览",
      areaFront: "正面",
      areaBack: "背面",
      areaLeftSleeve: "左袖",
      areaRightSleeve: "右袖",
      colorApplied: "✦ 颜色已应用",
      configure: "← 配置你的作品",
      areaCount: "区域",
    },
  },
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  collectorPack: CollectorPackT;
  t: UIText;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("English");
  return (
    <LanguageContext.Provider value={{ lang, setLang, collectorPack: collectorPack[lang], t: uiText[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
