import dynamic from 'next/dynamic';
import { FC } from 'react';


// Use dynamic import for the PokemonDetail component
const PokemonDetail = dynamic(() => import('@/components/PokemonDetail'));

const PokemonDetailPage: FC = () =>  {
  return <PokemonDetail />;
}

export default PokemonDetailPage;
