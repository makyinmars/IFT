import { Heading, Box } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { FeedPosts } from "../src/interfaces/interfaces";
import Feed from "../src/components/feed";

interface FeedProps {
  feedPosts: FeedPosts[];
}

const Home = ({
  feedPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>IFT</title>
        <meta
          name="description"
          content="Post your items you have found on the streets, house, anywhere!"
        />
      </Head>
      <main>
        <Heading align="center" pt={4}>
          IFT
        </Heading>
        <Feed feedPosts={feedPosts} />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<FeedProps> = async () => {
  const res = await fetch(`${process.env.API_URL}/api/feed?take=10&skip=0`);
  const feedPosts: FeedPosts[] = await res.json();

  return {
    props: {
      feedPosts,
    },
  };
};
