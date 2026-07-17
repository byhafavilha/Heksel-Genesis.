import { createContext, useContext, useState, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Lang = "English" | "Português" | "Français" | "Español" | "日本語";

// ---------------------------------------------------------------------------
// Traduções do Collector Pack
// ---------------------------------------------------------------------------

export interface CollectorPackItem {
  icon: string;
  title: string;
  desc: string;
}

export interface CollectorPackT {
  header: string;
  price: string;
  includes: string;
  items: CollectorPackItem[];
  badge: string;
}

const collectorPack: Record<Lang, CollectorPackT> = {
  English: {
    header: "✦ Collector Pack — What's Included",
    price: "R$ 300.00",
    includes:
      "Includes: Personalized Letter 🃏 + Exclusive Heksel Sticker + Special Imperium Fragrance 🧪",
    items: [
      {
        icon: "🟪",
        title: "Premium Custom Sweatshirt",
        desc: "Dual-print (Bone Front / Furry Back) engineered heavyweight cotton.",
      },
      {
        icon: "🔑",
        title: "Heksel Genesis Keychain",
        desc: "Perfect accessory for your backpack, bag, or car mirror.",
      },
      {
        icon: "💎",
        title: "Official Genesis Sticker Pack",
        desc: "High-fidelity vinyl stickers to customize your laptop or gear.",
      },
      {
        icon: "✉️",
        title: "Handcrafted Serialized Letter",
        desc: "Custom thank-you card with your unique serial number (e.g., 'You are customer #10'), locking your collector position.",
      },
    ],
    badge: "🔒 LIMITED EDITION · UNIQUE SERIAL · PREMIUM DELIVERY",
  },
  Português: {
    header: "✦ Collector Pack — O que está incluso",
    price: "R$ 300,00",
    includes:
      "Inclui: Carta Personalizada 🃏 + Adesivo Exclusivo Heksel + Fragrância Especial Imperium 🧪",
    items: [
      {
        icon: "🟪",
        title: "Moletom Personalizado Premium",
        desc: "Estampa dupla (Frente Bone / Costas Furry) em algodão encorpado de alta engenharia.",
      },
      {
        icon: "🔑",
        title: "Chaveiro Heksel Genesis",
        desc: "Acessório perfeito para sua mochila, bolsa ou espelho do carro.",
      },
      {
        icon: "💎",
        title: "Pack de Adesivos Oficiais Genesis",
        desc: "Adesivos de vinil de alta fidelidade para customizar seu notebook ou acessórios.",
      },
      {
        icon: "✉️",
        title: "Carta Serializada Feita à Mão",
        desc: "Cartão de agradecimento personalizado com seu número de série exclusivo (ex.: 'Você é o cliente #10'), garantindo sua posição de colecionador.",
      },
    ],
    badge: "🔒 EDIÇÃO LIMITADA · SERIAL ÚNICO · ENTREGA PREMIUM",
  },
  Français: {
    header: "✦ Collector Pack — Ce qui est inclus",
    price: "300,00 R$",
    includes:
      "Comprend : Lettre Personnalisée 🃏 + Autocollant Exclusif Heksel + Parfum Spécial Imperium 🧪",
    items: [
      {
        icon: "🟪",
        title: "Sweat-shirt Personnalisé Premium",
        desc: "Double impression (Bone Front / Furry Back) en coton épais de haute qualité.",
      },
      {
        icon: "🔑",
        title: "Porte-clés Heksel Genesis",
        desc: "L'accessoire parfait pour votre sac à dos, sac ou rétroviseur de voiture.",
      },
      {
        icon: "💎",
        title: "Pack d'Autocollants Officiels Genesis",
        desc: "Autocollants en vinyle haute fidélité pour personnaliser votre ordinateur portable ou vos équipements.",
      },
      {
        icon: "✉️",
        title: "Lettre Sérialisée Fabriquée à la Main",
        desc: "Carte de remerciement personnalisée avec vos numéros de série uniques (ex. : 'Vous êtes le client #10'), sécurisant votre position de collectionneur.",
      },
    ],
    badge: "🔒 ÉDITION LIMITÉE · SÉRIE UNIQUE · LIVRAISON PREMIUM",
  },
  // Spanish & Japanese fall back to English content
  Español: {
    header: "✦ Collector Pack — What's Included",
    price: "R$ 300.00",
    includes:
      "Includes: Personalized Letter 🃏 + Exclusive Heksel Sticker + Special Imperium Fragrance 🧪",
    items: [
      {
        icon: "🟪",
        title: "Premium Custom Sweatshirt",
        desc: "Dual-print (Bone Front / Furry Back) engineered heavyweight cotton.",
      },
      {
        icon: "🔑",
        title: "Heksel Genesis Keychain",
        desc: "Perfect accessory for your backpack, bag, or car mirror.",
      },
      {
        icon: "💎",
        title: "Official Genesis Sticker Pack",
        desc: "High-fidelity vinyl stickers to customize your laptop or gear.",
      },
      {
        icon: "✉️",
        title: "Handcrafted Serialized Letter",
        desc: "Custom thank-you card with your unique serial number (e.g., 'You are customer #10'), locking your collector position.",
      },
    ],
    badge: "🔒 LIMITED EDITION · UNIQUE SERIAL · PREMIUM DELIVERY",
  },
  "日本語": {
    header: "✦ Collector Pack — What's Included",
    price: "R$ 300.00",
    includes:
      "Includes: Personalized Letter 🃏 + Exclusive Heksel Sticker + Special Imperium Fragrance 🧪",
    items: [
      {
        icon: "🟪",
        title: "Premium Custom Sweatshirt",
        desc: "Dual-print (Bone Front / Furry Back) engineered heavyweight cotton.",
      },
      {
        icon: "🔑",
        title: "Heksel Genesis Keychain",
        desc: "Perfect accessory for your backpack, bag, or car mirror.",
      },
      {
        icon: "💎",
        title: "Official Genesis Sticker Pack",
        desc: "High-fidelity vinyl stickers to customize your laptop or gear.",
      },
      {
        icon: "✉️",
        title: "Handcrafted Serialized Letter",
        desc: "Custom thank-you card with your unique serial number (e.g., 'You are customer #10'), locking your collector position.",
      },
    ],
    badge: "🔒 LIMITED EDITION · UNIQUE SERIAL · PREMIUM DELIVERY",
  },
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  collectorPack: CollectorPackT;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("English");

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, collectorPack: collectorPack[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
