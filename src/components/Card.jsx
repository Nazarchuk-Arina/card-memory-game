import backCard from "../assets/images/back-card-min.png";

function Card({ card, onClick }) {
  return (
    <div
      className={`memory-card${card.isFlipped ? " flip" : ""} ${
        card.isShaking ? " shake" : ""
      } ${card.passed ? " connected" : ""}`}
      onClick={onClick}
      style={{ order: card.order }}
      data-testid={card.id}
    >
      <img className="front-face" src={card.image} alt="Card" />
      <img className="back-face" src={backCard} alt="Back card" />
    </div>
  );
}

export default Card;
