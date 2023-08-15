import { Flex, Skeleton } from '@chakra-ui/react';
import useVideoDetail from '../hooks/useVideoDetail';
import ProductItem from './ProductItem';

function ProductList() {
  const { detail, isLoading } = useVideoDetail('product');
  const products = detail?.list_products;

  return (
    <Skeleton startColor='pink.500' endColor='orange.500' isLoaded={!isLoading}>
      <Flex>
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            price={product.price_IDR}
            title={product.title}
            url={product.link}
          />
        ))}
      </Flex>
    </Skeleton>
  );
}

export default ProductList;
