
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import ProfileDropdown from './ProfileDropdown'
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-2 py-2">
                <Typography variant="h5" component="h5">
                    Stock Trading App
                </Typography>
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

