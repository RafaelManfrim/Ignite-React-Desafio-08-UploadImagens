import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card as CardComponent } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose } = useDisclosure();
  const [selectedImg, setSelectedImg] = useState('');

  function handleViewImage(url: string): void {
    setSelectedImg(url);
  }

  return (
    <>
      <SimpleGrid>
        {cards.map(card => (
          <CardComponent
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </SimpleGrid>
      <ModalViewImage imgUrl={selectedImg} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
