interface NavbarProps {
  /** Called when the user clicks the history button */
  onHistoryClick: () => void;
  /** URL of the user's profile image */
  profileUrl: string;
}

export default function Navbar({ onHistoryClick, profileUrl }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      {/* Left: history button */}
      <button
        onClick={onHistoryClick}
        className="px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-800 transition"
      >
        History
      </button>

      {/* Center: site logo */}
      <img
        src="/logo.png"
        alt="Site Logo"
        className="h-8"
        
      />

      {/* Right: user avatar */}
      <img
        src={"/defaultuser.jpeg"}
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
      />
    </nav>
  );
}
