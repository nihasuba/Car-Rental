import NavbarOwner from '@/components/navbarowner';
import OwnerSidebar from '@/components/ownersidebar';

export default function OwnerLayout({ children }) {
  return (
    <>
    <NavbarOwner />
    <div className="flex min-h-screen">
      <OwnerSidebar />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
    </>
    
  );
}
