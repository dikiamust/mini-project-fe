import Navbar from '@/components/Navbar';
import { PokemonList } from '@/components/PokemonList';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="A list of Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <PokemonList />
    </>
  );
}
