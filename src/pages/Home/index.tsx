import { Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useUserProvider } from "../../providers/UserContext";
import { theme } from "../../styles/theme";

export const Home = () => {
  const {
    productList,
    loadProducts,
    notFound,
    itemSearched,
    searchItem,
    loadCart,
  } = useProductsProvider();

  const { user, accessToken } = useUserProvider();

  useEffect(() => {
    loadProducts();
    loadCart(Number(user.id), accessToken);
  }, []);

  return (
    <>
      <Header />

      {!!itemSearched && (
        <Flex
          alignItems="center"
          justifyContent="center"
          m="20px"
          direction={["column", "column", "row", "row"]}
          textAlign="center"
        >
          {notFound ? (
            <Heading size="md"> Não encontramos resultados para: </Heading>
          ) : (
            <Heading size="md"> Resultados para: </Heading>
          )}
          <Text fontSize="xl" color="gray.300" fontWeight="bold" ml="10px">
            {itemSearched}
          </Text>
          <Button
            bg={theme.colors.grey["0"]}
            color={theme.colors.grey["200"]}
            fontSize="12px"
            h="30px"
            ml="15px"
            _hover={{
              bgColor: theme.colors.grey["100"],
            }}
            onClick={() => searchItem("", accessToken)}
          >
            {" "}
            Limpar pesquisa{" "}
          </Button>
        </Flex>
      )}

      {!notFound && (
        <Grid
          gap={6}
          justifyContent="center"
          justifyItems="center"
          mb='30px'
          mt="6"
          paddingX="8"
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          w="100%"
        >
          {productList.map((item) => (
            <Card product={item} key={item.id} />
          ))}
        </Grid>
      )}
    </>
  );
};
