import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  
  
  const observer = useRef(null);

  useEffect(() => {
    
    const cardArray = Array.from({ length: 200 }, (_, index) => index + 1);
    setCards(cardArray);
  }, []);

  useEffect(() => {
   
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.dataset.index);
          setVisibleCards((prev) => {
            
            if (!prev.includes(cardIndex)) {
              return [...prev, cardIndex];
            }
            return prev;
          });
        }
      });
    }, { threshold: 0.1 });

   
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card) => observer.current.observe(card));

    
    return () => observer.current.disconnect();
  }, [cards]);

  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="card-container">
        {cards.map((index) => (
          <div
            key={index}
            className="card"
            data-index={index}
            style={{ minHeight: '100px', marginBottom: '20px' }}
          >
           
            {visibleCards.includes(index) && <Card index={index} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
