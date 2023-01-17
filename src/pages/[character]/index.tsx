import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Hola = ({ data }: any) => {
  const { query } = useRouter();
  const id = query.id;
  const character = query.category;

  console.log(data);

  return (
    <>
      <Head>
        <title>Character - {character}</title>
      </Head>
      <div>
        <Link href={'/'}>
          <button>Home</button>
        </Link>

        <h1>Search: {character}</h1>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              gap: '70px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            {data.results ? (
              data.results.map((char: any) => (
                <div key={char.name}>
                  <h4>{char.name}</h4>
                  <Image
                    width={100}
                    height={100}
                    src={char.image}
                    alt={char.name}
                  />
                </div>
              ))
            ) : (
              <h2>No results</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hola;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { character } = ctx.query;
  // const host = process.env.HOST || 'http://localhost:3000';
  const host = `http://${ctx.req.headers.host}` || 'http://localhost:3000';
  const getCharacher = await fetch(`${host}/api/${character}`);
  const result = await getCharacher.json();

  return {
    props: {
      data: result
    }
  };
}
