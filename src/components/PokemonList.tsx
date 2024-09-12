import usePokemonList from '@/hooks/use-pokemon-list';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ItemsPerPage } from './ItemsPerPage';
import { Pagination } from './Pagination';
import Link from 'next/link';

export function PokemonList() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { items, totalPages, isLoading } = usePokemonList({ page, itemsPerPage });

  // Ensure that page is always less than totalPages, even if we change itemsPerPage.
  useEffect(() => {
    if (totalPages !== 0 && page + 1 > totalPages) {
      setPage(totalPages - 1);
    }
  }, [itemsPerPage, page, totalPages]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="bg-blue-600 text-white py-4 px-6 rounded-t-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold">Pokémon List</h1>
      </header>
      
      <div className="p-2 flex justify-between items-center bg-slate-300 mb-4 rounded-lg shadow-sm">
        <Pagination value={page} totalPages={totalPages} onChange={setPage} />
        <ItemsPerPage value={itemsPerPage} onChange={setItemsPerPage} />
      </div>

      <div className="mb-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </p>
        )}
      </div>

      <div className={classNames('overflow-x-auto', { hidden: isLoading })}>
        <table className="table-auto w-full border border-slate-500 rounded-lg shadow-sm">
          <thead className="bg-slate-400 text-white">
            <tr>
              <th className="border border-slate-500 py-2 px-4">#</th>
              <th className="border border-slate-500 py-2 px-4">Image</th>
              <th className="border border-slate-500 py-2 px-4">Pokemon</th>
            </tr>
          </thead>
          <tbody>
            {items.map((pokemon) => (
              <tr key={pokemon.id} className="hover:bg-slate-100">
                <td className="border border-slate-500 py-2 px-4 text-center">{pokemon.id}</td>
                <td className="border border-slate-500 py-2 px-4 text-center">
                  <Image src={pokemon.previewUrl} alt={pokemon.name} width={50} height={50} className="rounded-full" />
                </td>
                <td className="border border-slate-500 py-2 px-4">
                  <Link href={`/pokemon/${pokemon.id}`} className="text-blue-500 hover:underline">
                    {pokemon.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
