import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-sky-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <img src="/pokemon.png" alt="Logo" className="h-8" />
        </Link>

        {/* Navigation Links */}
        <div className="ml-auto flex space-x-4">
          <Link href="/">
            <p className="text-white hover:text-gray-300">Home</p>
          </Link>
          <Link href="/my-pokemon">
            <p className="text-white hover:text-gray-300">My-Pokemon</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
