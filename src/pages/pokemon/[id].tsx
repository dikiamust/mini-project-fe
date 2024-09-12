import dynamic from 'next/dynamic';

// Use dynamic import for the PokemonDetail component
const PokemonDetail = dynamic(() => import('@/components/PokemonDetail'));

export default function PokemonDetailPage() {
  return <PokemonDetail />;
}
