import { createContext, useContext, useState, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Lang = "English" | "Português" | "Français";

// ---------------------------------------------------------------------------
// Collector Pack
// ---------------------------------------------------------------------------

export interface CollectorPackItem { icon: string; title: string; desc: string; }
export interface CollectorPackT {
  header: string; price: string; includes: string;
  items: CollectorPackItem[]; badge: string;
}

// ---------------------------------------------------------------------------
// UI Text — SafeSpace, BrandSection, HoodieSimulator
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
};

const uiText: Record<Lang, UIText> = {
  English: {
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
      btnAdvance: "Create in Advance ⚡",
      btnBrand: "✦ Create My Brand ✦",
      freemium: {
        badge: "ENTRY LEVEL", name: "Freemium", price: "Free",
        desc: "Basic digital presence for upcoming builders.",
        features: ["Standard Notion/Linktree setup", "Basic color palette selection", "Community Discord access", "Standard support (48h)"],
        cta: "Try It Now",
      },
      premium: {
        badge: "ELITE LEVEL", name: "Premium", price: "$4,996.32", period: "/ one-time",
        desc: "Full bespoke cyberpunk digital identity & web platform.",
        features: ["Full React/Vite web application", "Bespoke visual identity & logo design", "Advanced animations & interactions", "Advanced animations & interactions", "Priority VIP support line", "Custom hardware welcome package"],
        cta: "Hire Premium",
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
      btnAdvance: "Criar em Avanço ⚡",
      btnBrand: "✦ Criar Minha Marca ✦",
      freemium: {
        badge: "NÍVEL INICIAL", name: "Freemium", price: "Grátis",
        desc: "Presença digital básica para construtores emergentes.",
        features: ["Configuração Notion/Linktree padrão", "Seleção básica de paleta de cores", "Acesso à Discord da comunidade", "Suporte padrão (48h)"],
        cta: "Experimente Agora",
      },
      premium: {
        badge: "NÍVEL ELITE", name: "Premium", price: "$4,996.32", period: "/ pagamento único",
        desc: "Identidade digital cyberpunk sob medida & plataforma web completa.",
        features: ["Aplicação web React/Vite completa", "Identidade visual & logo sob medida", "Animações & interações avançadas", "Animações & interações avançadas", "Linha de suporte VIP prioritário", "Kit de boas-vindas hardware personalizado"],
        cta: "Contratar Premium",
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
      btnAdvance: "Créer en Avance ⚡",
      btnBrand: "✦ Créer Ma Marque ✦",
      freemium: {
        badge: "NIVEAU ENTRÉE", name: "Freemium", price: "Gratuit",
        desc: "Présence numérique de base pour les créateurs émergents.",
        features: ["Configuration Notion/Linktree standard", "Sélection de palette de base", "Accès Discord communautaire", "Support standard (48h)"],
        cta: "Essayer Maintenant",
      },
      premium: {
        badge: "NIVEAU ÉLITE", name: "Premium", price: "$4,996.32", period: "/ paiement unique",
        desc: "Identité numérique cyberpunk sur mesure & plateforme web complète.",
        features: ["Application web React/Vite complète", "Identité visuelle & logo sur mesure", "Animations & interactions avancées", "Animations & interactions avancées", "Ligne de support VIP prioritaire", "Pack d'accueil hardware personnalisé"],
        cta: "Embaucher Premium",
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
