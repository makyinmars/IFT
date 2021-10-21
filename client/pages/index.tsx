import { Heading, Box } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

// import Feed from "../src/components/feed";

interface FeedProps {
  feedPosts: FeedPosts[];
}

const Home = ({
  feedPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(feedPosts);
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
        {feedPosts.map((post) => (
          <Box key={post.id}>
            <Heading>{post.createdAt}</Heading>
          </Box>
        ))}
      </main>
    </>
  );
};

export default Home;

interface FeedPosts {
  id: number;
  body: string;
  createdAt: Date;
  author: {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const getServerSideProps: GetServerSideProps<FeedProps> = async () => {
  const res = await fetch(`${process.env.API_URL}/api/feed?take=10&skip=0`);
  const feedPosts: FeedPosts[] = await res.json();

  return {
    props: {
      feedPosts,
    },
  };
};
