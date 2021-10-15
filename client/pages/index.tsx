import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>I Found This</title>
        <meta
          name="description"
          content="Post your items you have found on the streets, house, anywhere!"
        />
      </Head>
      <main>
        <Heading align="center" pt={4}>
          I Found This
        </Heading>
      </main>
    </>
  );
};

export default Home;
