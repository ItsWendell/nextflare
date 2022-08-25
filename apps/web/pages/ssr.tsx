import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export interface PageProps {
  isServer?: boolean;
  runtime?: string;
  generatedAt: number;
  payload?: string;
}

const HomePage: NextPage<PageProps> = (props) => {
  return (
    <div>
      <h1>This is a Next.js SSR Page!</h1>
      <div>{JSON.stringify(props)}</div>
      <div>
        <Link href="/" passHref>
          <a>Go to Static page!</a>
        </Link>
      </div>
      <div>
        <Link href="/api/info" passHref>
          <a>Visit API endpoint</a>
        </Link>
      </div>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};

export default HomePage;

export const config = {
  runtime: "experimental-edge",
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      isServer: true,
      runtime: "edge",
      generatedAt: Date.now(),
    },
  };
};
