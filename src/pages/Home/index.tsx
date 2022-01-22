import { Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";

export const Home = () => {
  return (
    <>
      <Header />
      <Grid
        w="100%"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        paddingX="8"
        mt="6"
        justifyContent="center"
        justifyItems="center"
      >
        {[1,1,1,1,1,1,1].map(() => (
          <Card key={Math.random()}/>
        ))}
      </Grid>
    </>
  );
};
