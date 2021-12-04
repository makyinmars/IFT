import Head from "next/head";

import HomeLayout from "../src/components/home-layout";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>IFT</title>
        <meta
          name="description"
          content="Post your items you have found on the streets, house, anywhere!"
        />
      </Head>
      <HomeLayout />
    </>
  );
};

export default HomePage;
