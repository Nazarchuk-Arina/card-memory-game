import { useState } from "react";
import Card from "./Card.jsx";
import { cardsData } from "./cards.js";

function Game() {
  // States
  const [cardsState, setCardsState] = useState(cardsData);
  const [firstCard, setFirstCard] = useState(null);
  const [secondClick, setSecondClick] = useState(false);
  const [wait, setWait] = useState(false);
  const [gameWon, setGameWon] = useState(false); // Новый стейт для отслеживания выигрыша

  // Проверка, все ли карточки перевернуты
  const checkWin = (updatedCards) => {
    if (updatedCards.every((card) => card.passed)) {
      setGameWon(true);
    }
  };

  const updateCardState = (cardId, updates) => {
    setCardsState((prevState) => {
      const updatedCards = prevState.map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      );
      checkWin(updatedCards); // Проверяем выигрыш после обновления
      return updatedCards;
    });
  };

  const checker = (card) => {
    if (firstCard && card.name === firstCard.name) {
      updateCardState(firstCard.id, { passed: true, isFlipped: true });
      updateCardState(card.id, { passed: true, isFlipped: true });
    } else {
      setWait(true);
      setTimeout(() => {
        updateCardState(firstCard.id, { isFlipped: false });
        updateCardState(card.id, { isFlipped: false });
        setWait(false);
      }, 1500);
    }
    setFirstCard(null);
  };

  const handleClick = (e, clickedCard) => {
    if (wait || clickedCard.isFlipped || clickedCard.passed) return;
    updateCardState(clickedCard.id, { isFlipped: true });

    if (!secondClick) {
      setFirstCard(clickedCard);
      setSecondClick(true);
    } else {
      setSecondClick(false);
      checker(clickedCard);
    }
  };

  const resetGame = () => {
    // Перезапуск игры: сбрасываем состояние карточек и стейты
    setCardsState(
      cardsData.map((card) => ({ ...card, isFlipped: false, passed: false }))
    );
    setFirstCard(null);
    setSecondClick(false);
    setWait(false);
    setGameWon(false);
  };

  return (
    <div>
      <section className="memory-game">
        {cardsState.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={(e) => handleClick(e, card)}
          />
        ))}
      </section>

      {gameWon && (
        <div className="win-message">
          <h2>Супер, ты выиграл!</h2>
          <button onClick={resetGame}>Играть заново</button>
        </div>
      )}
    </div>
  );
}

export default Game;
