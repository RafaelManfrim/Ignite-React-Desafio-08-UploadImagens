import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const getImages = ({ pageParam = 0 }): Promise<Response> => {
    return fetch(`/api/projects?cursor=${pageParam}`);
  };

  async function getNextPageParam(): Promise<null> {
    return null;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: (lastPage, pages) => lastPage,
  });

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const dados = data.pages.data.map(img => ({
      title: img.title,
      description: img.description,
      url: img.url,
      ts: img.ts,
      id: img.id,
    }));

    console.log(dados);
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error />}
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
