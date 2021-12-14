import React, { useEffect } from "react";

import Feed from "../../src/components/feed";
import MainLayout from "../../src/components/main-layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../app/features/feed/feed-slice";

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <MainLayout>
      <Feed feedPosts={posts} />
    </MainLayout>
  );
};

export default PostsPage;
