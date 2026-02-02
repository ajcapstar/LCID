import Image from "next/image";
import "./StickyCards.css";
const StickyCards = () => {
  const stickyCardsData = [
    {
      index: 1,
      title: "Modularity",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 2,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 3,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 4,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 5,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
  ];
  return (
    <div className="sticky-cards">
      {stickyCardsData.map((cardData, id) => (
        <div className="sticky-card" key={index}>
          <div className="sticky-card-index" >
            <h1>{cardData.id}</h1>
          </div>
          <div className="sticky-card-content" key={index}>
            <div className="sticky-card-content-wrapper">
              <div className="sticky-card-header">
                <h1> {cardData.title}</h1>
                <div className="sticky-card-image">
                <Image src={cardData.image} alt="" width={500} height={500} />
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
