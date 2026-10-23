import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(Boolean(window.location.hash && window.location.hash !== '#home'));
  useEffect(() => {
    const navigate = () => setShowProductList(Boolean(window.location.hash && window.location.hash !== '#home'));
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  return showProductList ? <ProductList /> : (
    <main className="landing-page">
      <div className="background-image" aria-hidden="true" />
      <div className="landing-brand">❧ Paradise Nursery</div>
      <div className="content">
        <section className="landing-content"><p className="eyebrow">GROW YOUR OWN LITTLE PARADISE</p>
          <h1>Welcome to<br /><em>Paradise Nursery</em></h1>
          <div className="divider" /><p className="tagline">Where Green Meets Serenity</p>
          <a className="button get-started-button" href="#plants">Get Started <span aria-hidden="true">↗</span></a>
        </section>
        <AboutUs />
      </div>
      <p className="landing-footer">Thoughtfully grown. Ready for your home.</p>
    </main>
  );
}
export default App;
