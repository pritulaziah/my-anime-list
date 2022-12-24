import Head from "next/head";
import Anime from "components/anime/Anime";

const AnimePage = () => {
  return (
    <div>
      <Head>
        <title>Anime list</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Anime />
    </div>
  );
};

export default AnimePage;
