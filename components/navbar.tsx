export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-40 border-b border-valorant-red/20 bg-valorant-dark/90 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 tactical-badge bg-valorant-red/20 flex items-center justify-center border border-valorant-red/40">
                        <span className="text-valorant-red font-bold text-xl">V</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#ECE8E1] uppercase tracking-[0.2em]">ValoCoach</h1>
                        <p className="text-xs text-[#8892A0] uppercase tracking-widest">Tactical Dashboard</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}