import { Bell } from 'lucide-react';
import { useState } from 'react';

const products = [
  { id: 1,  name: 'NEO-KAI 01 FOR HIKING',                img: '1000027632-removebg-preview.png' },
  { id: 2,  name: 'NEO-KAI 01 FOR RACING',               img: '1000027635-removebg-preview.png' },
  { id: 3,  name: 'NEO-KAI 01 FOR ACADEMIC',             img: '1000027638-removebg-preview.png' },
  { id: 4,  name: 'NEO-KAI 01 FOR FOOTBALL',             img: '1000027639-removebg-preview.png' },
  { id: 5,  name: 'NEO-WAI 01 SLIPPER FOR LEISURE',      img: '1000027648-removebg-preview.png' },
  { id: 6,  name: 'NEO-WAI 02 SPORTS FLIP-FLOPS',        img: '1000027649-removebg-preview.png' },
  { id: 7,  name: 'NEO-LAI 01 SLIPPER WITH A SHORT BRIM',img: '1000027651-removebg-preview.png' },
  { id: 8,  name: 'NEO-LAI 02 SLIPPER WITH LONG BRIM',   img: '1000027652-removebg-preview.png' },
  { id: 9,  name: 'NEO-MAI 01 HIGH HEELS',               img: '1000030702-removebg-preview.png' },
  { id: 10, name: 'NEO-MAI 02 LOW HEELS',                img: '1000030703-removebg-preview.png' },
  { id: 11, name: 'NEO-VAI 01 LEATHER BOOT',             img: '123 Sem Título_20260625133036.png' },
];

interface CollectionProps {
  onNotifyMe: () => void;
}

function ProductCard({ product, onNotifyMe }: { product: typeof products[0]; onNotifyMe: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <div className="prod-card group">
      <div className="prod-img-wrap">
        {!imgError ? (
          <img
            src={`${base}/${product.img}`}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s' }}
          />
        ) : (
          <div className="prod-img-placeholder">
            <span className="shortly-badge">SHORTLY</span>
          </div>
        )}
        {!imgLoaded && !imgError && (
          <span className="shortly-badge">SHORTLY</span>
        )}
      </div>
      <div className="prod-info">
        <div className="prod-name">{product.name}</div>
        <div className="prod-price shortly">SHORTLY</div>
        <button className="notify-btn-card" onClick={onNotifyMe}>Notify Me</button>
      </div>
    </div>
  );
}

export function Collection({ onNotifyMe }: CollectionProps) {
  return (
    <section className="collection" id="collection">
      <div className="section-inner">
        <span className="section-tag">⚡ NEO Collection — Drop 01</span>
        <h2 className="section-title">
          Every Line.<br />
          <span className="glow-text">One Empire.</span>
        </h2>
        <p className="section-sub">
          Laser-engineered performance meets street culture. Six silhouettes. One declaration.
        </p>

        <div className="card-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onNotifyMe={onNotifyMe} />
          ))}
        </div>
      </div>
    </section>
  );
}
