import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent';

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        console.log(data);
        setLoading(false);
      } catch (error) {

        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if(error){
    return <ErrorComponent message ={"Error While Fetching Exchanges"}/>
  }
  return (
    <Container maxW={'container.lg'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {exchanges.map(i => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;
