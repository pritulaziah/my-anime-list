import Head from "next/head";
import Anime from "components/Anime/Anime";

const AnimePage = () => {
  return (
    <div>
      <Head>
        <title>Anime list</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-4">
        <Anime />
      </main>
    </div>
  );
};

export default AnimePage;
