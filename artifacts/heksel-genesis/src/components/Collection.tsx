import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

/* ============================================
   TYPES
   ============================================ */

interface Product {
  id: number;
  name: string;
  img: string;
  price: string;
  reserved: number;
  badge: string;
}

interface CollectionProps {
  onNotifyMe: () => void;
}

interface ProductCardProps {
  product: Product;
  onNotifyMe: () => void;
}

/* ============================================
   CONSTANTS
   ============================================ */

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'NEO-KAI 01 FOR HIKING',
    img: '1000027632-removebg-preview.png',
    price: '$220',
    reserved: 92,
    badge: '🔥 ONLY 15 LEFT'
  },
  {
    id: 2,
    name: 'NEO-KAI 01 FOR RACING',
    img: '1000027635-removebg-preview.png',
    price: '$240',
    reserved: 87,
    badge: '⚡ SELLING FAST'
  },
  {
    id: 3,
    name: 'NEO-KAI 01 FOR ACADEMIC',
    img: '1000027638-removebg-preview.png',
    price: '$195',
    reserved: 79,
    badge: '🔥 POPULAR'
  },
  {
    id: 4,
    name: 'NEO-KAI 01 FOR FOOTBALL',
    img: '1000027639-removebg-preview.png',
    price: '$210',
    reserved: 94,
    badge: '🚨 ALMOST GONE'
  },
  {
    id: 5,
    name: 'NEO-WAI 01 SLIPPER FOR LEISURE',
    img: '123 Sem Título_20260625133036.png',
    price: '$150',
    reserved: 81,
    badge: '⚡ COZY DROP'
  },
  {
    id: 6,
    name: 'NEO-WAI 02 SPORTS FLIP-FLOPS',
    img: '1000031699-removebg-preview.png',
    price: '$165',
    reserved: 88,
    badge: '🔥 DESIGN EXCLUSIVE'
  },
  {
    id: 7,
    name: 'NEO-LAI 01 SLIPPER WITH A SHORT BRIM',
    img: '1000027651-removebg-preview.png',
    price: '$140',
    reserved: 76,
    badge: '⚡ LIMITED'
  },
  {
    id: 8,
    name: 'NEO-LAI 02 SLIPPER WITH A WIDE BRIM',
    img: '1000027652-removebg-preview.png',
    price: '$155',
    reserved: 85,
    badge: '🚨 85% CLAIMED'
  },
  {
    id: 9,
    name: 'NEO-YAI 01 MULTIPURPOSE BOOTS',
    img: '1000027653-removebg-preview.png',
    price: '$310',
    reserved: 91,
    badge: '🔥 GRAIL PIECE'
  },
  {
    id: 10,
    name: 'NEO-MAI 01 MULTIPURPOSE BOOTS',
    img: '1000030702-removebg-preview.png',
    price: '$340',
    reserved: 96,
    badge: '🚨 DROP FINISHING'
  }
];

const IMAGE_PATHS = [
  '\${base}/attached_assets/\${img}',
  '\${base}/\${img}',
  'attached_assets/\${img}',
  '\${img}'
];

/* ============================================
   STYLES (CSS String)
   ============================================ */

const COLLECTION_STYLES = `
  @keyframes floatAnimation {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(0.5deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes gradientPulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  /* Collection Section */
  .collection {
    width: 100%;
    padding: 2rem 1rem;
  }

  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-tag {
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #06b6d4;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  .gradient-text {
    display: inline-block;
    background: linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientPulse 3s ease-in-out infinite;
  }

  .section-sub {
    font-size: 1rem;
    line-height: 1.6;
    color: #a0a0a0;
    margin-bottom: 3rem;
    max-width: 600px;
  }

  /* Card Grid Layout */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
  }

  /* Product Card */
  .prod-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .prod-card:hover {
    border-color: rgba(6, 182, 212, 0.3);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.1);
  }

  /* Product Image */
  .prod-img-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
    border-radius: 8px;
    overflow: hidden;
  }

  .prod-img-placeholder {
    width: 100%;
    height: 100%;
    background: #111;
  }

  .floating-shoe {
    animation: floatAnimation 4s ease-in-out infinite;
    filter: drop-shadow(0 15px 15px rgba(6, 182, 212, 0.12));
  }

  .image-shimmer {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 25%,
      rgba(255, 255, 255, 0.06) 50%,
      rgba(255, 255, 255, 0.02) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Product Info */
  .prod-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .prod-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .prod-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .prod-price {
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
  }

  .launching-badge {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #06b6d4;
  }

  /* Scarcity Indicator */
  .scarcity-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.1);
    z-index: 10;
  }

  .scarcity-container {
    margin-top: 0.5rem;
  }

  .scarcity-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: #888;
    margin-bottom: 0.5rem;
  }

  .scarcity-percentage {
    color: #ef4444;
    font-weight: 700;
  }

  .scarcity-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 99px;
    overflow: hidden;
  }

  .scarcity-fill {
    height: 100%;
    background: linear-gradient(90deg, #06b6d4, #a855f7);
    border-radius: 99px;
    transition: width 0.3s ease-out;
  }

  /* Notify Button */
  .notify-btn-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    margin-top: 0.25rem;
    background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
  }

  .notify-btn-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);
  }

  .notify-btn-card:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2);
  }

  .notify-btn-card:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

/* ============================================
   COMPONENTS
   ============================================ */

function ProductCard({ product, onNotifyMe }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const candidatePaths = IMAGE_PATHS.map(path =>
    path
      .replace('\${base}', base)
      .replace('\${img}', encodeURIComponent(product.img))
  );

  const currentSrc = candidatePaths[currentPathIndex];

  const handleImageError = () => {
    if (currentPathIndex < candidatePaths.length - 1) {
      setCurrentPathIndex(prev => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  useEffect(() => {
    setCurrentPathIndex(0);
    setHasFailedAll(false);
    setImgLoaded(false);
  }, [product.img]);

  const reservePercentage = Math.min(product.reserved, 100);

  return (
    <div className="prod-card">
      <span className="scarcity-badge">{product.badge}</span>

      <div className="prod-img-box">
        {!hasFailedAll ? (
          <img
            src={currentSrc}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            className={imgLoaded ? 'floating-shoe' : 'image-shimmer'}
            style={{
              opacity: imgLoaded ? 1 : 0.2,
              transition: 'opacity 0.4s ease-in-out',
              objectFit: 'contain',
              width: '100%',
              height: '100%'
            }}
          />
        ) : (
          <div className="prod-img-placeholder" />
        )}
      </div>

      <div className="prod-info">
        <div className="prod-name">{product.name}</div>

        <div className="prod-price-row">
          <span className="prod-price">{product.price}</span>
          <span className="launching-badge">LAUNCHING SHORTLY</span>
        </div>

        <div className="scarcity-container">
          <div className="scarcity-label">
            <span>Reserve Queue</span>
            <span className="scarcity-percentage">{reservePercentage}% Secured</span>
          </div>
          <div className="scarcity-bar">
            <div
              className="scarcity-fill"
              style={{ width: `${reservePercentage}%` }}
            />
          </div>
        </div>

        <button
          className="notify-btn-card"
          onClick={onNotifyMe}
          aria-label={`Get notifications for \${product.name}`}
        >
          <Bell size={14} />
          Secure Access
        </button>
      </div>
    </div>
  );
}

export function Collection({ onNotifyMe }: CollectionProps) {
  return (
    <>
      <style>{COLLECTION_STYLES}</style>
      <section className="collection" id="collection">
        <div className="section-inner">
          <span className="section-tag">⚡ NEO Collection — Drop 01</span>

          <h2 className="section-title">
            See what
            <br />
            <span className="gradient-text">the future holds.</span>
          </h2>

          <p className="section-sub">
            The NEO sneakers represent the next step in digital luxury and athletic
            dominance. Drops are ultra-limited. Sign up below to secure your slot
            before they vanish.
          </p>

          <div className="card-grid">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onNotifyMe={onNotifyMe} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
