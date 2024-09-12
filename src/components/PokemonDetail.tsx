import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosClient from '@/axios-client';
import { POKE_API_URL, BE_API_URL } from '@/constants';
import Image from 'next/image';
import Navbar from './Navbar';

interface PokemonDetail {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query; 
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isCaught, setIsCaught] = useState<boolean | null>(null); 

  useEffect(() => {
    if (id) {
      // Fetch detail pokemon by ID from PokeAPI
      axiosClient
        .get<PokemonDetail>(`${POKE_API_URL}/pokemon/${id}`)
        .then((res) => {
          setPokemon(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch pokemon details:', err);
        });
    }
  }, [id]);

  const catchPokemon = () => {
    // Request to API catch pokemon
    axiosClient.post(`${BE_API_URL}/pokemons/catch/${id}`)
      .then((res) => {
        const { success } = res.data;
        setIsCaught(success);
      })
      .catch((err) => {
        console.error('Failed to catch the pokemon:', err);
        setIsCaught(false); 
      });
  };

  if (!pokemon) return <p className="text-center">Loading Pokémon details...</p>;

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 max-w-sm w-full flex flex-col items-center">
        <h1 className="text-3xl mb-4 font-bold text-center">{pokemon.name}</h1>
        <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} className="mb-4" />
        
        <h2 className="text-xl mt-4 font-bold text-center">Types</h2>
        <ul className="list-none p-0 text-center">
          {pokemon.types.map((typeInfo, i) => (
            <li key={i}>{typeInfo.type.name}</li>
          ))}
        </ul>

        <h2 className="text-xl mt-4 font-bold text-center">Moves</h2>
        <ul className="list-none p-0 text-center">
          {pokemon.moves.slice(0, 5).map((moveInfo, i) => ( 
            <li key={i}>{moveInfo.move.name}</li>
          ))}
        </ul>

        <button
          onClick={catchPokemon}
          className="mt-10 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Catch Pokémon
        </button>

        {isCaught !== null && (
          <p className="mt-2 text-center">
            {isCaught ? 'You successfully caught the Pokémon!' : 'Failed to catch the Pokémon.'}
          </p>
        )}
      </div>
    </div>
    </>
  );
}
