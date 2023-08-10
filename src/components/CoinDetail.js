import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetail = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurruency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'Max'];

  const switchChartStack = key => {
    switch (key) {
      case '24h':
        setDays('24h');
        setLoading('true');
        break;

      case '7d':
        setDays('7d');
        setLoading('true');
        break;

      case '30d':
        setDays('30d');
        setLoading('true');
        break;
      case '14d':
        setDays('14d');
        setLoading('true');
        break;

      case '60d':
        setDays('60d');
        setLoading('true');
        break;

      case '200d':
        setDays('200d');
        setLoading('true');
        break;
      case '1y':
        setDays('365d');
        setLoading('true');
        break;

      case 'max':
        setDays('max');
        setLoading('true');
        break;

      default:
        setDays('24h');
        setLoading('true');

        break;
    }
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [params.id, currency, days]);

  if (error) {
    return <ErrorComponent message={'Error While Fetching Coin'} />;
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'86%'} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} wrap={'wrap'} m={'2'}>
            {btns.map(i => (
              <Button key={i} onClick={() => switchChartStack(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurruency}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>₹</Radio>
              <Radio value={'usd'}>$</Radio>
              <Radio value={'eur'}>€</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'}>
              Last Update On{Date(coin.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={'16'}
              h={'16'}
              objectFit={'cotain'}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item
                title={'Circulating Supply'}
                value={`${currencySymbol}${coin.market_data.circulating_supply}`}
              />
              <Item
                title={'All Time Low'}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={'All Time High'}
                value={`${currencySymbol}${coin.market_data.circulating_supply} `}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={'full'}>
      <Progress value={50} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={'small'}>24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

export default CoinDetail;
