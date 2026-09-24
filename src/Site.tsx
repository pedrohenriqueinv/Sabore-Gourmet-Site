import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bike, Check, ChevronDown, Clock3, MapPin, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, Store, UtensilsCrossed, X, Sandwich } from 'lucide-react';
import { CATEGORIES, COMBOS_DATA, PRODUCTS_DATA, STORE_INFO } from './data/catalog';
import type { Product, ComboItem } from './types/catalog';
import { useCart } from './context/CartContext';
import './Site.css';

type MenuItem = Product | ComboItem;
const itemName = (item: MenuItem) => 'name' in item ? item.name : item.title;
const categoryOf = (item: MenuItem) => 'categorySlug' in item ? item.categorySlug : 'combos';
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
const money = (price: number) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const priceLabel = (item: MenuItem) => `${/partir/i.test(item.price) ? 'A partir de ' : ''}${money(item.rawPrice)}`;
const items: MenuItem[] = [...PRODUCTS_DATA, ...COMBOS_DATA];
const highlights = [PRODUCTS_DATA.find(p => p.name === 'Top Burger'), PRODUCTS_DATA.find(p => p.name === 'Especial da casa - carne'), COMBOS_DATA.find(p => p.title === 'Barca Mini Sanduíche')].filter((item): item is MenuItem => Boolean(item));

function FoodImage({ item }: { item: MenuItem }) {
  const [failed, setFailed] = useState(false);
  const usable = item.image && !item.image.includes('unsplash.com') && !failed;
  return usable ? <img src={item.image} alt={itemName(item)} loading="lazy" decoding="async" onError={() => setFailed(true)} /> : <div className="photo-fallback"><UtensilsCrossed size={32} aria-hidden="true" /><span>Foto em breve</span></div>;
}

function FoodCard({ item, onSelect, featured = false }: { item: MenuItem; onSelect: (item: MenuItem) => void; featured?: boolean }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const category = CATEGORIES.find(c => c.slug === categoryOf(item))?.name;
  const quickAdd = () => {
    addToCart(item, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };
  return <article className={`food-card ${featured ? 'featured-card' : ''}`}>
    <button className="food-photo" onClick={() => onSelect(item)} aria-label={`Ver detalhes de ${itemName(item)}`}><FoodImage item={item} /><span className="photo-category">{category}</span></button>
    <div className="food-body"><h3><button onClick={() => onSelect(item)}>{itemName(item)}</button></h3><p>{item.description}</p><div className="food-bottom"><span className="food-price">{priceLabel(item)}</span><button className={`add-button ${added ? 'added' : ''}`} onClick={quickAdd} aria-label={`${added ? 'Adicionado' : 'Adicionar'} ${itemName(item)}`}>{added ? <Check size={17} /> : <Plus size={17} />}<span>{added ? 'Adicionado' : 'Adicionar'}</span></button></div></div>
  </article>;
}

function ProductDetails({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="product-dialog" aria-labelledby="product-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}>
    <button autoFocus className="dialog-close icon-button" onClick={onClose} aria-label="Fechar detalhes"><X /></button>
    <div className="dialog-photo"><FoodImage item={item} /></div>
    <div className="dialog-body"><span className="eyebrow">SABORE GOURMET</span><h2 id="product-title">{itemName(item)}</h2><p>{item.description}</p><strong className="dialog-price">{priceLabel(item)}</strong><label className="observation-label" htmlFor="item-observation">Alguma observação? <span>(opcional)</span></label><input id="item-observation" className="observation-input" value={observation} onChange={event => setObservation(event.target.value)} placeholder="Ex.: sem cebola, molho à parte..." /><div className="dialog-actions"><div className="quantity-control" aria-label="Quantidade"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade"><Minus size={16} /></button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar quantidade"><Plus size={16} /></button></div><button className="button button-primary" onClick={() => { addToCart(item, quantity, observation.trim()); onClose(); }}><ShoppingBag size={18} /> Adicionar · {money(item.rawPrice * quantity)}</button></div></div>
  </dialog>;
}

export default function Site() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [category, setCategory] = useState('hamburguer');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const menuToggle = useRef<HTMLButtonElement>(null);
  const results = useMemo(() => items.filter(item => (category === 'todos' || categoryOf(item) === category) && normalize(`${itemName(item)} ${item.description}`).includes(normalize(query))), [category, query]);
  const changeCategory = (slug: string) => { setCategory(slug); setQuery(''); setLimit(12); };
  const openCategory = (slug: string) => { changeCategory(slug); document.getElementById('cardapio')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (!mobileMenu) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMobileMenu(false); menuToggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [mobileMenu]);

  return <>
    <a className="skip-link" href="#cardapio">Pular para o cardápio</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="shell header-inner">
      <a className="brand" href="#inicio" aria-label="Sabore Gourmet, início"><img src="/sabore-logo.webp" width="48" height="48" alt="" /><span><strong>SABORE <em>GOURMET</em></strong><small>Hamburgueria & Pastelaria</small></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#cardapio">Cardápio</a><a href="#combos">Destaques</a><a href="#sobre">A Sabore</a><a href="#contato">Onde estamos</a></nav>
      <div className="header-actions"><button className="button button-primary header-order" onClick={() => setIsCartOpen(true)}><ShoppingBag size={17} aria-hidden="true" /><span>Meu pedido</span>{totalItems > 0 && <b className="cart-count">{totalItems}</b>}</button><button ref={menuToggle} className="icon-button menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-expanded={mobileMenu} aria-controls="mobile-nav" aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'}>{mobileMenu ? <X /> : <Menu />}</button></div>
    </div>{mobileMenu && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação no celular">{[['#cardapio', 'Cardápio'], ['#combos', 'Destaques'], ['#sobre', 'A Sabore'], ['#contato', 'Onde estamos']].map(([href, title]) => <a key={href} href={href} onClick={() => setMobileMenu(false)}>{title}<ArrowUpRight size={16} /></a>)}</nav>}</header>

    <main>
      {/* Desktop Hero Section: 100% faithful to the exact image sent by user, zero box/quadrado */}
      <section className="hero-desktop" id="inicio" aria-label="Sabore Gourmet - Hamburgueria e Pastelaria">
        <div className="hero-canvas-wrap">
          <img src="/addicon.png" width="1736" height="906" alt="Sabore Gourmet - Bateu a fome? Vem de Sabore." className="hero-canvas-img" fetchPriority="high" />
          
          {/* Header interactive overlay */}
          <a href="#inicio" className="hotspot-link hotspot-hdr-logo" aria-label="Sabore Gourmet Início" />
          <a href="#cardapio" className="hotspot-link hotspot-hdr-nav hotspot-hdr-cardapio" aria-label="Cardápio" />
          <a href="#combos" className="hotspot-link hotspot-hdr-nav hotspot-hdr-destaques" aria-label="Destaques" />
          <a href="#sobre" className="hotspot-link hotspot-hdr-nav hotspot-hdr-sobre" aria-label="A Sabore" />
          <a href="#contato" className="hotspot-link hotspot-hdr-nav hotspot-hdr-contato" aria-label="Onde estamos" />
          <button className="hotspot-btn hotspot-hdr-cart" onClick={() => setIsCartOpen(true)} aria-label="Ver meu pedido">
            <img src="/hero-btn-cart.png" alt="" className="hotspot-visual-img" />
            {totalItems > 0 && <span className="hotspot-cart-count">{totalItems}</span>}
          </button>

          {/* Hero CTAs */}
          <a href="#cardapio" className="hotspot-link hotspot-btn-montar" aria-label="Montar meu pedido">
            <img src="/hero-btn-montar.png" alt="" className="hotspot-visual-img" />
          </a>
          <button className="hotspot-btn hotspot-btn-pedido" onClick={() => setIsCartOpen(true)} aria-label="Ver meu pedido">
            <img src="/hero-btn-pedido.png" alt="" className="hotspot-visual-img" />
          </button>

          {/* Category Cards */}
          <button className="hotspot-btn hotspot-card hotspot-card-burger" onClick={() => openCategory('hamburguer')} aria-label="Ver Hambúrgueres">
            <img src="/hero-card-burger.png" alt="Hambúrgueres" className="hotspot-visual-img" />
          </button>
          <button className="hotspot-btn hotspot-card hotspot-card-pastel" onClick={() => openCategory('pasteis')} aria-label="Ver Pastéis">
            <img src="/hero-card-pastel.png" alt="Pastéis" className="hotspot-visual-img" />
          </button>
          <button className="hotspot-btn hotspot-card hotspot-card-combo" onClick={() => openCategory('combos')} aria-label="Ver Combos e Barcas">
            <img src="/hero-card-combo.png" alt="Combos e Barcas" className="hotspot-visual-img" />
          </button>
        </div>
      </section>

      {/* Mobile Hero Section: Mobile-optimized, touch-friendly, ultra-sharp */}
      <section className="hero-mobile" id="inicio-mobile" aria-labelledby="hero-title-mobile">
        <div className="hero-mobile-visual">
          <img src="/hero-food-clean.png" width="1024" height="478" alt="Sabore Gourmet Hambúrguer e Pastel" fetchPriority="high" />
        </div>
        <div className="shell hero-mobile-content">
          <p className="eyebrow"><span /> HAMBURGUERIA & PASTELARIA · ANÁPOLIS</p>
          <h1 id="hero-title-mobile">Bateu a fome?<br />Vem de <span>Sabore.</span></h1>
          <p className="hero-description">Hambúrguer no capricho, pastel crocante e aquela barca para dividir. Seu próximo pedido começa aqui.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cardapio">Montar meu pedido <ArrowDown size={19} /></a>
            <button className="button button-secondary" onClick={() => setIsCartOpen(true)}>Ver meu pedido <ShoppingBag size={17} /></button>
          </div>
          <div className="hero-services">
            <span><Bike size={18} /> Delivery em Anápolis</span>
            <span><Store size={18} /> Retirada no balcão</span>
          </div>

          <div className="mobile-categories-cards">
            <button className="mobile-cat-card" onClick={() => openCategory('hamburguer')}>
              <div className="cat-card-info">
                <Sandwich size={22} className="cat-icon" />
                <strong>Hambúrgueres</strong>
                <small>Do clássico ao duplo</small>
                <span className="cat-arrow">Explorar →</span>
              </div>
              <img src="/crop-card-burger.png" alt="Hambúrgueres" />
            </button>
            <button className="mobile-cat-card" onClick={() => openCategory('pasteis')}>
              <div className="cat-card-info">
                <UtensilsCrossed size={22} className="cat-icon" />
                <strong>Pastéis</strong>
                <small>Salgados e doces</small>
                <span className="cat-arrow">Explorar →</span>
              </div>
              <img src="/crop-card-pastel.png" alt="Pastéis" />
            </button>
            <button className="mobile-cat-card" onClick={() => openCategory('combos')}>
              <div className="cat-card-info">
                <ShoppingBag size={22} className="cat-icon" />
                <strong>Combos & barcas</strong>
                <small>Para você ou para dividir</small>
                <span className="cat-arrow">Explorar →</span>
              </div>
              <img src="/crop-card-combo.png" alt="Combos e Barcas" />
            </button>
          </div>
        </div>
      </section>

      <section id="combos" className="section highlights"><div className="shell"><div className="section-heading"><div><p className="eyebrow">COMECE POR AQUI</p><h2>Deu vontade? <span>Escolha o seu.</span></h2></div><a href="#cardapio" className="text-link">Ver cardápio <ArrowRight size={18} /></a></div><div className="featured-grid">{highlights.map(item => <FoodCard key={item.id} item={item} featured onSelect={setSelected} />)}</div></div></section>

      <section id="cardapio" className="section menu-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">SEU PRÓXIMO FAVORITO ESTÁ AQUI</p><h2>Um cardápio. <span>Muitas vontades.</span></h2></div><span className="menu-count">{items.length} opções para explorar</span></div>
        <div className="menu-toolbar"><div className="category-tabs" role="group" aria-label="Filtrar por categoria">{[{ slug: 'todos', name: 'Tudo' }, ...CATEGORIES].map(c => <button key={c.slug} aria-pressed={category === c.slug} onClick={() => changeCategory(c.slug)}>{c.name}<span>{c.slug === 'todos' ? items.length : items.filter(item => categoryOf(item) === c.slug).length}</span></button>)}</div><div className="search-box"><Search size={19} aria-hidden="true" /><input type="search" aria-label="Buscar no cardápio" placeholder="O que você está com vontade?" value={query} onChange={event => { setQuery(event.target.value); setLimit(12); }} />{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Limpar busca"><X size={17} /></button>}</div></div>
        <div className="results-summary"><p role="status">{results.length} {results.length === 1 ? 'opção encontrada' : 'opções encontradas'} · {category === 'todos' ? 'Todas as categorias' : CATEGORIES.find(c => c.slug === category)?.name}</p><span>Valores de referência. Confirme no pedido.</span></div>
        {results.length ? <div className="menu-grid">{results.slice(0, limit).map(item => <FoodCard key={item.id} item={item} onSelect={setSelected} />)}</div> : <div className="empty-state"><Search size={32} /><h3>Nenhum sabor por aqui.</h3><p>Tente outro nome ou busque em todas as categorias.</p><button className="button button-secondary" onClick={() => { setCategory('todos'); setLimit(12); }}>Buscar em todas as categorias</button><button className="text-link" onClick={() => { changeCategory('todos'); }}>Limpar todos os filtros</button></div>}
        {results.length > limit && <button className="button button-secondary show-more" onClick={() => setLimit(limit + 12)}>Ver mais {Math.min(12, results.length - limit)} {results.length - limit === 1 ? 'opção' : 'opções'} <ChevronDown size={18} /></button>}
        <div className="order-note"><ShoppingBag size={23} /><div><strong>Escolha seus itens e finalize pelo WhatsApp.</strong><p>Monte o pedido, informe entrega e pagamento e envie a mensagem pronta para a cozinha.</p></div><button className="text-link" onClick={() => setIsCartOpen(true)}>Ver meu pedido <ArrowRight size={18} /></button></div>
      </div></section>

      <section className="section about-section" id="sobre"><div className="shell about-grid"><div className="about-brand"><img src="/sabore-logo.webp" width="200" height="200" alt="Logo Sabore Gourmet" loading="lazy" /><span>HAMBURGUERIA & PASTELARIA</span><p>Anápolis, GO</p></div><div><p className="eyebrow">BOM É TER OPÇÃO</p><h2>Seu lanche.<br /><span>Do seu jeito.</span></h2><p>Tem dia de hambúrguer. Tem dia de pastel. E tem dia de reunir a turma em volta de uma barca. Na Sabore Gourmet, você encontra as três possibilidades em um só lugar.</p><p>Explore os sabores, inclua observações e decida como receber: delivery ou retirada no balcão.</p><a className="text-link" href="#cardapio">Encontre seu próximo pedido <ArrowDown size={18} /></a></div></div></section>

      <section className="section contact-section" id="contato"><div className="shell"><div className="section-heading"><div><p className="eyebrow">PERTINHO DA SUA FOME</p><h2>Te esperamos <span>em Anápolis.</span></h2></div></div><div className="contact-grid"><article><MapPin /><h3>Venha buscar</h3><p>{STORE_INFO.address}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_INFO.name + ' ' + STORE_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="text-link">Abrir no mapa <ArrowUpRight size={17} /></a></article><article><Clock3 /><h3>Horários da casa</h3><dl><div><dt>Terça a quinta</dt><dd>18h às 23h15</dd></div><div><dt>Sexta a domingo</dt><dd>18h às 23h45</dd></div><div><dt>Segunda-feira</dt><dd>Fechado</dd></div></dl><p className="small-note">Em feriados, confira o atendimento no cardápio oficial.</p></article><article><MessageCircle /><h3>Fale com a Sabore</h3><p>Dúvidas sobre o cardápio ou seu pedido? Converse com a gente.</p><a className="text-link" href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <ArrowUpRight size={17} /></a><a className="contact-phone" href={`tel:+${STORE_INFO.whatsapp}`}>{STORE_INFO.whatsappFormatted}</a></article></div></div></section>

      <section className="final-call"><div className="shell"><div><p className="eyebrow">A PRÓXIMA MORDIDA É SUA</p><h2>Hoje combina com Sabore.</h2></div><button className="button button-primary" onClick={() => setIsCartOpen(true)}>Ver meu pedido <ShoppingBag size={19} /></button></div></section>
    </main>
    <footer className="site-footer"><div className="shell"><p>© {new Date().getFullYear()} Sabore Gourmet <span>· Hamburgueria & Pastelaria</span></p><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    <div className="mobile-order"><button className="button button-primary" onClick={() => setIsCartOpen(true)}><ShoppingBag size={18} /> Meu pedido {totalItems > 0 && <span>({totalItems})</span>}</button></div>
    {selected && <ProductDetails key={selected.id} item={selected} onClose={() => setSelected(null)} />}
  </>;
}


