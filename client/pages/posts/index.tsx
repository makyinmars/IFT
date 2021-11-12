import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";

import { FeedPosts } from "../../src/interfaces/interfaces";
import Feed from "../../src/components/feed";
import MainLayout from "../../src/components/main-layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../app/features/feed/feed-slice";

interface FeedProps {
  feedPosts: FeedPosts[];
}

const PostsPage = ({
  feedPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
