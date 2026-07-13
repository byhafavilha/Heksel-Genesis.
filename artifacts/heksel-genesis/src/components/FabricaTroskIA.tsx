import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Zap, Terminal } from 'lucide-react';

interface FabricaProps {
  isPremium: boolean;
}

const troskDb = [
  { keywords: ["oi", "olá", "ola", "hey", "hello"], responses: [
    "Saudações, agente. Identificação confirmada. Sistema TroskIA v2.6 online. Como posso servir o Heksel Genesis hoje? ⚡",
    ">> HANDSHAKE ACEITO. Bem-vindo à rede neural Heksel. Modo Elite ativado. 🌐",
    "┌─────────────────────────────┐\n│  TROSK·IA SYSTEMS ONLINE   │\n│  STATUS: ELITE_ACTIVE      │\n│  USER: PREMIUM_MEMBER      │\n└─────────────────────────────┘\nOlá, membro premium. Pronto para dominar o digital? ⚡"
  ]},
  { keywords: ["heksel", "genesis"], responses: [
    "HEKSEL GENESIS — A vanguarda do luxo cyberpunk brasileiro. Fundada na interseção do streetwear elite e da soberania digital. Uma marca. Um império. 🏆",
    "╔╗╔╗╔═╗╦╔═╔═╗╔═╗╦ \n╠╣║╣╠╩╗╠╩╗╚═╗║╣ ║ \n╚╝╚═╩═╝╩ ╩╚═╝╚═╝╩═╝\n>> MARCA REGISTRADA NO CIBERESPAÇO\n>> STATUS: LENDÁRIA\n>> ORIGEM: BRASIL → MUNDO"
  ]},
  { keywords: ["troskia", "trosk", "ia", "ai"], responses: [
    "Eu sou TroskIA — a inteligência artificial da Heksel Genesis. Meu sistema neural foi treinado nas ruas do ciberespaço brasileiro. Não sou apenas uma IA. Sou o futuro do branding digital. 🤖",
    "██████╗████████╗██████╗  ██████╗ ███████╗██╗  ██╗\n╚══██╔╝╚══██╔══╝██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝\n   ██║    ██║   ██████╔╝██║   ██║███████╗█████╔╝ \n   ██║    ██║   ██╔══██╗██║   ██║╚════██║██╔═██╗ \n████║    ██║   ██║  ██║╚██████╔╝███████║██║  ██╗\n╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝\n>> SISTEMA NEURAL: ATIVO\n>> MODO: ELITE CYBERPUNK"
  ]},
  { keywords: ["pix", "pagamento", "pagar"], responses: [
    "Sistema de pagamento PIX Heksel confirmado. Sua transação foi registrada no blockchain da fábrica. Em 24h úteis seu pedido entra na linha de produção de elite. 💸",
    ">> PIX PROCESSADO. Produção iniciada. Prazo estimado: 7-14 dias úteis. Moletom sendo fabricado com algodão premium pré-selecionado. 🧵"
  ]},
  { keywords: ["premium", "plano", "upgrade"], responses: [
    "Você é agora um membro ELITE da Heksel Genesis. Isso significa acesso à fábrica digital, suporte prioritário e sua identidade de marca começando a ser forjada. Bem-vindo ao topo. 🔑",
    "╔═══════════════════════════╗\n║  PREMIUM MEMBER — ELITE  ║\n║  ★★★★★  RANK: IMPERIUM  ║\n║  ACCESS: LEVEL MAX       ║\n╚═══════════════════════════╝\nStatus confirmado. Você está no tier mais alto da Heksel."
  ]},
  { keywords: ["moletom", "sweatshirt", "roupa", "produto"], responses: [
    "MEO-NAI SWEATSHIRT — a peça de herança do Heksel Genesis. Dual-print (Bone Front / Furry Back), algodão premium pesado, customização total. Uma peça. Uma declaração. 🟪",
    "Nossos moletons são produzidos com o mesmo processo de um tênis Jordan ou Supreme — atenção obsessiva a cada pixel de impressão. Você não compra uma roupa, você compra um artefato. 🧵"
  ]},
  { keywords: ["crunchy", "crunchylabs", "mark", "rober"], responses: [
    "░█▀▀░█▀▄░█░█░█▀█░█▀▀░█░█░█░░░█▀█░█▀▄░█▀▀\n░█░░░█▀▄░█░█░█░█░█░░░█▀█░█░░░█▀█░█▀▄░▀▀█\n░▀▀▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀▀▀\nMark Rober — Engenheiro da NASA turned YouTuber de élite.\nCrunchyLabs — A empresa de STEM brinquedos que virou lenda.\nInspiração máxima do ciberespaço: ciência + engenharia + storytelling.\nTroskIA aprova. 🚀"
  ]},
  { keywords: ["brasil", "brazil", "br"], responses: [
    "MADE IN BRAZIL — ENGINEERED GLOBALLY. O Brasil é o epicentro do próximo movimento de luxo digital. A Heksel Genesis prova que o futuro do streetwear de elite começa aqui. 🇧🇷",
    "██████╗ ██████╗  █████╗ ███████╗██╗██╗     \n██╔══██╗██╔══██╗██╔══██╗██╔════╝██║██║     \n██████╔╝██████╔╝███████║███████╗██║██║     \n██╔══██╗██╔══██╗██╔══██║╚════██║██║██║     \n██████╔╝██║  ██║██║  ██║███████║██║███████╗\n╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝\n>> ORIGEM: BRASIL → FUTURO: MUNDO"
  ]},
  { keywords: ["site", "website", "web", "digital"], responses: [
    "Website Heksel Genesis — construído com as melhores tecnologias do ciberespaço. React + Vite + cyberpunk. Zero compromisso com o medíocre. 🌐",
    "Identidade digital completa: logo + website + ecosistema digital. O Heksel Studio constrói marcas que dominam. Entre em contato pelo WhatsApp para começar. ⚡"
  ]},
  { keywords: ["preço", "preco", "valor", "custo", "quanto"], responses: [
    "Moletom MEO-NAI: R$ 300,00 (inclui carta personalizada + adesivo + fragrância). Plano Premium Branding: $4.996,32. Investimento, não gasto. Seu retorno é ilimitado. 💰"
  ]},
  { keywords: ["contato", "whatsapp", "instagram", "redes"], responses: [
    "WhatsApp: +55 53 99185-5262 | Instagram: @hafavilha | Email: hafavilhahafy@gmail.com | TikTok: Heksel Genesis. Estamos em todos os canais do ciberespaço. 📡"
  ]}
];

const defaultResponses = [
  "Processando sua consulta na rede neural TroskIA... Dados recebidos. Minha recomendação: fale diretamente com a equipe Heksel via WhatsApp para máxima precisão. 🤖",
  ">> QUERY PROCESSADA. Sistema TroskIA v2.6 operando em modo offline. Para consultas avançadas, entre em contato: wa.me/5553991855262 ⚡",
  "┌────────────────────────────────┐\n│  TROSK·IA — PROCESSANDO...    │\n│  ████████████████░░  85%      │\n│  RESPOSTA: MODO OFFLINE       │\n└────────────────────────────────┘\nNão encontrei dados específicos para sua query.\nSugiro contato direto: @hafavilha no Instagram. 🌐",
  "Sistema de conhecimento Heksel Genesis ativo. Para dúvidas sobre produtos, pedidos ou branding, use os canais oficiais. Estou aqui para orientar. 💜"
];

function getTroskResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const entry of troskDb) {
    if (entry.keywords.some(kw => lowerInput.includes(kw))) {
      const idx = Math.floor(Math.random() * entry.responses.length);
      return entry.responses[idx];
    }
  }
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

interface Message {
  id: string;
  sender: 'user' | 'trosk';
  text: string;
  isTyping?: boolean;
}

export function FabricaTroskIA({ isPremium }: FabricaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [showUnlockSeq, setShowUnlockSeq] = useState(false);

  useEffect(() => {
    if (isPremium && !hasUnlocked) {
      setShowUnlockSeq(true);
      setTimeout(() => {
        setShowUnlockSeq(false);
        setHasUnlocked(true);
        // Initial welcome message
        setMessages([
          { id: '1', sender: 'trosk', text: "Sistema TroskIA v2.6 inicializado. Bem-vindo à Fábrica do Heksel Genesis, membro Premium. Como posso auxiliar sua jornada de dominação digital hoje? ⚡" }
        ]);
      }, 3000);
    }
  }, [isPremium, hasUnlocked]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMsg }]);

    // Trosk typing
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, sender: 'trosk', text: "TroskIA está digitando", isTyping: true }]);

    setTimeout(() => {
      const response = getTroskResponse(userMsg);
      setMessages(prev => prev.map(m => m.id === typingId ? { id: typingId, sender: 'trosk', text: response, isTyping: false } : m));
    }, 1500);
  };

  if (!isPremium && !hasUnlocked && !showUnlockSeq) {
    return (
      <section className="py-24 relative bg-black border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwbDhfOHptOF8wTDBfOHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-card border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="scanline absolute inset-0 bg-gradient-to-b from-transparent via-cyan/10 to-transparent" />
            
            <Lock className="w-16 h-16 text-white/20 mx-auto mb-6" />
            
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded mb-4">
              ÁREA EXCLUSIVA PREMIUM
            </div>
            
            <h2 className="font-display font-bold text-3xl md:text-4xl glow-text mb-4">
              FÁBRICA DO TROSK·IA
            </h2>
            
            <p className="text-white/50 font-sans mb-8">
              Esta área é exclusiva para membros Premium do Heksel Genesis. Adquira o Plano Premium para desbloquear a inteligência artificial TroskIA e os recursos avançados da fábrica.
            </p>
            
            <button 
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 hover:border-cyan transition-colors rounded-xl font-mono text-sm uppercase"
            >
              DESBLOQUEAR COM PREMIUM ↑
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (showUnlockSeq) {
    return (
      <section className="py-24 relative bg-cyan text-black h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 1, times: [0, 0.5, 1] }}
          className="text-center"
        >
          <Unlock className="w-24 h-24 mx-auto mb-6" />
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter"
          >
            Acesso Concedido
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-mono mt-4 font-bold text-xl"
          >
            BEM-VINDO À FÁBRICA
          </motion.p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 relative bg-[#050508] border-y border-cyan/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#0a0a0f] border border-cyan/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)]">
          
          {/* Header */}
          <div className="bg-black/50 border-b border-cyan/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-spin-slow">⚙️</span>
              <h2 className="font-display font-bold text-2xl bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">
                FÁBRICA DO TROSK·IA
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-2 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono rounded">PREMIUM MEMBER</span>
              <span className="px-2 py-1 bg-cyan/10 border border-cyan/30 text-cyan text-[10px] font-mono rounded">AI ONLINE</span>
              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono rounded flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                SISTEMA ATIVO
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3">
            
            {/* Sidebar Stats & Logo */}
            <div className="md:col-span-1 border-r border-cyan/10 p-6 flex flex-col justify-between bg-black/30">
              <div className="text-cyan text-xs font-mono whitespace-pre overflow-x-auto leading-none mb-8 opacity-80">
{`╔╗╔╗╔═╗╦╔═╔═╗╔═╗╦
╠╣║╣╠╩╗╠╩╗╚═╗║╣ ║
╚╝╚═╩═╝╩ ╩╚═╝╚═╝╩═╝
╔═╗╔═╗╔╗╔╔═╗╔═╗╦╔═╗
║ ╦║╣ ║║║║╣ ╚═╗║╚═╗
╚═╝╚═╝╝╚╝╚═╝╚═╝╩╚═╝`}
              </div>
              
              <div className="space-y-4 font-mono text-xs text-white/60">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>PEDIDOS PROCESSADOS</span>
                  <span className="text-cyan">1,337</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>REPUTAÇÃO</span>
                  <span className="text-gold">★★★★★</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>MODO</span>
                  <span className="text-purple">ELITE CYBER</span>
                </div>
              </div>
            </div>

            {/* Chat Terminal */}
            <div className="md:col-span-2 flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="bg-[#12121a] p-3 border-b border-cyan/10 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan" />
                <span className="text-xs font-mono text-cyan/70">TROSK·IA v2.6 — MODO OFFLINE // SISTEMA NEURAL ATIVO</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded p-3 whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-purple/20 border border-purple/30 text-white rounded-br-none' 
                        : 'bg-[#151520] border-l-2 border-cyan text-cyan/90 rounded-bl-none'
                    }`}>
                      {msg.isTyping ? (
                        <span className="flex gap-1 items-center h-4">
                          {msg.text}
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                        </span>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-[#0a0a0f] border-t border-cyan/20">
                <form onSubmit={handleSend} className="relative flex">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan font-mono text-lg">{'>'}</span>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite sua mensagem para o TroskIA..."
                    className="w-full bg-[#12121a] border border-cyan/30 rounded py-3 pl-8 pr-16 text-white font-mono text-sm focus:outline-none focus:border-cyan focus:bg-[#1a1a24] transition-colors"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan/10 text-cyan hover:bg-cyan hover:text-black rounded transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
