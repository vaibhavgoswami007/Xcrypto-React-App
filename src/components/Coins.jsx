import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurruency] = useState('inr');

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const changePage = page => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) {
    return <ErrorComponent message={'Error While Fetching Coins'} />;
  }
  return (
    <Container maxW={'container.lg'}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurruency}>
            <HStack spacing={"4"} >
                <Radio value={"inr"} >₹</Radio>
                <Radio  value={'usd'}>$</Radio>
                <Radio value ={"eur"}>€</Radio>

            </HStack>
        </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {coins.map(i => {
              return (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflowX ={"auto"} p={"8"}>
            {btns.map((item, index) => {
              return (
                <Button
                  bgColor={'blackAlpha.900'}
                  color={'white'}
                  onClick={() => changePage(index + 1)}
                //   css={{"&:hover":{
                //     bgColor: "#bbb"
                //   }}}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
