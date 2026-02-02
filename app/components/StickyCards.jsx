import Image from "next/image";
import "./StickyCards.css";
const StickyCards = () => {
  const stickyCardsData = [
    {
      id: 1,
      title: "Modularity",
      image: "/sticky-cards/card_1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      id: 2,
      title: "Character",
      image: "/sticky-cards/card_1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      id: 3,
      title: "Character",
      image: "/sticky-cards/card_1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      id: 4,
      title: "Character",
      image: "/sticky-cards/card_1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      id: 5,
      title: "Character",
      image: "/sticky-cards/card_1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
  ];
  return (
    <div className="sticky-cards">
      {stickyCardsData.map((cardData, id) => (
        <div className="sticky-card" key={id}>
          <div className="sticky-card-index" key={id}>
            <h1>{cardData.id}</h1>
          </div>
          <div className="sticky-card-content" key={id}>
            <div className="sticky-card-content-wrapper">
              <div className="sticky-card-header">
                <h1> {cardData.title}</h1>
                <div className="sticky-card-image">
                <img src={cardData.image} alt="" />
                </div>
                <div className="sticky-card-copy">
                  <div className="sticky-card-copy-title">
                    <p>(About this page)</p>
                  </div>
                  <div className="sticky-card-copy-description">
                    <p>{cardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards;
