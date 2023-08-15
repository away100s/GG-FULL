import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  LinkOverlay,
} from '@chakra-ui/react';

function ProductItem({ price, title, url }) {
  const currency = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);

  return (
    <Card
      // direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      bg={'gray.900'}
      display={'flex'}
      flexDir={'row'}
      flex={'1 1 100%'}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '150px' }}
        src='https://picsum.photos/seed/picsum/200/150'
        alt={title}
        color={'gray.300'}
      />

      <Stack>
        <LinkOverlay href={url} isExternal>
          <CardBody>
            <Heading size='sm' color={'gray.300'}>
              {title}
            </Heading>
            <Text color={'green.300'} fontSize={'sm'}>
              {currency}
            </Text>
          </CardBody>
        </LinkOverlay>
      </Stack>
    </Card>
  );
}

export default ProductItem;
