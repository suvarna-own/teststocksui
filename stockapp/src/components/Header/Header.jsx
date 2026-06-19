
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import ProfileDropdown from './ProfileDropdown'




export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">

                <h1 className="text-2xl font-bold text-blue-600">
                    Stock Trading App
                </h1>

                
                <>
                    {/* <input
                        placeholder="Search month..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        ref={searchRef}
                    /> */}
                    <SearchBar></SearchBar>

                    
                    {/* <div className="api-msg mb-2">{msg}</div> */}
                </>

                <div className="flex items-center gap-4">


                    
                    <ProfileDropdown></ProfileDropdown>
                </div>
            </div>
        </header>
    );
}

