import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

import { FeedPosts } from "../../src/interfaces/interfaces";
import Feed from "../../src/components/feed";
import MainLayout from "../../src/components/main-layout";

interface FeedProps {
  feedPosts: FeedPosts[];
}

const PostsPage = ({
  feedPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <MainLayout>
      <Feed feedPosts={feedPosts} />
    </MainLayout>
  );
};

export default PostsPage;

export const getServerSideProps: GetServerSideProps<FeedProps> = async () => {
  const res = await fetch(`${process.env.API_URL}/api/feed`);
  const feedPosts: FeedPosts[] = await res.json();

  return {
    props: {
      feedPosts,
    },
  };
};
