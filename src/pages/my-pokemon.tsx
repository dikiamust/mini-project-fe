import { MyPokemonList } from '@/components/MyPokemonList';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { FC } from 'react';

const MyPokemon: FC = () => {
  return (
    <>
      <Head>
        <title>My Pokemon</title>
        <meta name="description" content="A list of My Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <MyPokemonList/>
    </>
  );
}

export default MyPokemon;
