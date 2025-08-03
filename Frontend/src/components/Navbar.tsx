interface NavbarProps {
  /** Called when the user clicks the history button */
  onHistoryClick: () => void;
  /** URL of the user's profile image */
  profileUrl: string;
}

export default function Navbar({ onHistoryClick}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-zinc-500 p-4 shadow-2xl margin-bottom-5">
      {/* Left: history button */}
      <button
        onClick={onHistoryClick}
      >
        <img src="/chat-history.svg" className="h-8 hover:opacity-20"></img>
      </button>

      {/* Center: site logo */}
      <img
        src="/logo.png"
        alt="Site Logo"
        className="h-9 rounded hover:opacity-20"
        
      />

      {/* Right: user avatar */}
      <img
        src={"/defaultuser.jpeg"}
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover hover:opacity-20"
      />
    </nav>
  );
}
