import useMyPokemonList from '@/hooks/use-my-pokemon-list';
import Image from 'next/image';
import Link from 'next/link';
import { BE_API_URL } from '@/constants';
import axiosClient from '@/axios-client';
import { useState } from 'react';
import { RenameModal } from '@/components/RenameModal';

export function MyPokemonList() {
  const { pokemons, isLoading } = useMyPokemonList();
  const [releasing, setReleasing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const handleReleasePokemon = async (id: number) => {
    setReleasing(true);
    setErrorMessage(null);
    try {
      const response = await axiosClient.put(`${BE_API_URL}/pokemons/release/${id}`);
      if (response.data.success) {
        window.location.reload();
      } else {
        setErrorMessage('Failed to release Pokemon');
      }
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || 'Error occurred while releasing the Pokemon';
      setErrorMessage(backendMessage);
    } finally {
      setReleasing(false);
    }
  };

  const openRenameModal = (id: number) => {
    setSelectedPokemonId(id);
    setIsModalOpen(true);
  };

  const closeRenameModal = () => {
    setIsModalOpen(false);
    setSelectedPokemonId(null);
  };

  const handleRenameSuccess = () => {
    // Refresh the Pokemon list after renaming
    window.location.reload();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="bg-blue-600 text-white py-4 px-6 rounded-t-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold">My Pokémon List</h1>
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ) : (
        <div>
          {Array.isArray(pokemons) && pokemons.length > 0 ? (
            <table className="table-auto w-full border border-slate-500 rounded-lg shadow-sm">
              <thead className="bg-slate-400 text-white">
                <tr>
                  <th className="border border-slate-500 px-4 py-2">#</th>
                  <th className="border border-slate-500 px-4 py-2">Name</th>
                  <th className="border border-slate-500 px-4 py-2">Nickname</th>
                  <th className="border border-slate-500 px-4 py-2">Image</th>
                  <th className="border border-slate-500 px-4 py-2">Types</th>
                  <th className="border border-slate-500 px-4 py-2">Moves</th>
                  <th className="border border-slate-500 px-4 py-2">Rename Count</th>
                  <th className="border border-slate-500 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map((pokemon) => (
                  <tr key={pokemon.id} className="hover:bg-slate-100">
                    <td className="border border-slate-500 px-4 py-2 text-center">{pokemon.id}</td>
                    <td className="border border-slate-500 px-4 py-2">
                      <Link href={`/pokemon/${pokemon.id}`} className="text-blue-500 hover:underline">
                        {pokemon.name}
                      </Link>
                    </td>
                    <td className="border border-slate-500 px-4 py-2">{pokemon.nickname}</td>
                    <td className="border border-slate-500 px-4 py-2 text-center">
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={50}
                        height={50}
                        className="inline-block rounded-full"
                      />
                    </td>
                    <td className="border border-slate-500 px-4 py-2">{pokemon.types.join(', ')}</td>
                    <td className="border border-slate-500 px-4 py-2">{pokemon.moves.join(', ')}</td>
                    <td className="border border-slate-500 px-4 py-2 text-center">{pokemon.renameCount}</td>
                    <td className="border border-slate-500 px-4 py-2">
                      <button
                        onClick={() => handleReleasePokemon(pokemon.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        disabled={releasing}
                      >
                        {releasing ? 'Releasing...' : 'Release'}
                      </button>
                      <button
                        onClick={() => openRenameModal(pokemon.id)}
                        className="bg-blue-500 text-white mt-3 px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Rename
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No Pokémon caught yet.</p>
          )}

          {errorMessage && <p className="text-center text-red-500 mt-4">{errorMessage}</p>}
        </div>
      )}

      {selectedPokemonId !== null && (
        <RenameModal
          isOpen={isModalOpen}
          pokemonId={selectedPokemonId}
          onClose={closeRenameModal}
          onRenameSuccess={handleRenameSuccess}
        />
      )}
    </div>
  );
}
