import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

export interface PageProps {
  isServer?: boolean;
  runtime?: string;
  generatedAt: number;
}

const HomePage: NextPage<PageProps> = (props) => {
  return (
    <div>
      <h1>This is a Next.js Static Page!</h1>
      <div>{JSON.stringify(props, null, 4)}</div>
      <div>
        <Link href="/ssr" passHref>
          <a>Go to SSR page!</a>
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      isStatic: true,
    },
  };
};

export default HomePage;
