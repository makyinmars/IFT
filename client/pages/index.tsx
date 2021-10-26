import { useEffect } from "react";
import Head from "next/head";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser } from "../app/features/user/user-slice";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.auth.userInfo.user.id);
  useEffect(() => {
    dispatch(getUser(Number(id)));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>IFT</title>
        <meta
          name="description"
          content="Post your items you have found on the streets, house, anywhere!"
        />
      </Head>
    </>
  );
};

export default HomePage;
