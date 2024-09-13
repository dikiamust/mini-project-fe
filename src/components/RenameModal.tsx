import { useState } from 'react';
import axiosClient from '@/axios-client';
import { BE_API_URL } from '@/constants';

interface RenameModalProps {
  isOpen: boolean;
  pokemonId: number;
  onClose: () => void;
  onRenameSuccess: () => void;
}

export function RenameModal({ isOpen, pokemonId, onClose, onRenameSuccess }: RenameModalProps) {
  const [newName, setNewName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleRename = async () => {
    setIsRenaming(true);
    setErrorMessage(null);
    try {
      const response = await axiosClient.put(`${BE_API_URL}/pokemons/rename/${pokemonId}`, { newName });
      if (response.data.success) {
        onRenameSuccess();
        onClose();
      } else {
        setErrorMessage('Failed to rename Pokemon');
      }
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || 'Error occurred while renaming the Pokemon';
      setErrorMessage(backendMessage);
    } finally {
      setIsRenaming(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Rename Pokémon</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleRename}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isRenaming}
          >
            {isRenaming ? 'Renaming...' : 'Rename'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
