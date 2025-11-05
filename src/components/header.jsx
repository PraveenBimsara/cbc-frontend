export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 h-[60px] text-white shadow-md flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold tracking-wide hover:scale-105 transition-transform duration-300">
        My Store
      </h1>
      <nav className="flex space-x-6 text-sm font-medium">
        <a
          href="#home"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#products"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Products
        </a>
        <a
          href="#contact"
          className="hover:text-yellow-300 transition-colors duration-200"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
