import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-white shadow">
    <div className="container mx-auto flex justify-between items-center p-4">
      <Link href="/">
        <a className="text-xl font-bold">Skipulag.is</a>
      </Link>
      <nav>
        <Link href="/kort"><a className="mr-4">Kort</a></Link>
        <Link href="/athugasemd"><a className="mr-4">Athugasemd</a></Link>
        <Link href="/login"><a>Innskráning</a></Link>
      </nav>
    </div>
  </header>
);

export default Header;