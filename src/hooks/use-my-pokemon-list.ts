import axiosClient from '@/axios-client';
import { BE_API_URL } from '@/constants';
import { useQuery } from 'react-query';

export default function useMyPokemonList() {
  const {
    data: response, // API response
    error,
    isLoading,
  } = useQuery(
    ['my-pokemons'],
    () => axiosClient.get<GetMyPokemonListResponse>(`${BE_API_URL}/pokemons/mine`),
    {
      onError(err) {
        console.error('Failed to fetch my pokemons:', err);
      },
    }
  );

  // Extract data from response or fallback to an empty array
  const pokemons = response?.data?.data ?? [];

  return {
    pokemons, // Array of Pokemon
    error,
    isLoading,
  };
}

interface Pokemon {
  id: number;
  name: string;
  nickname: string;
  image: string;
  types: string[];
  moves: string[];
  renameCount: number;
}

interface GetMyPokemonListResponse {
  success: boolean;
  message: string;
  data: Pokemon[];
}
