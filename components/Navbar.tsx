import LinksDropdown from './LinksDropdown';
import { UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="py-6 sm:px-16 lg:px-24 px-4 flex item-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
