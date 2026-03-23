import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle, User, X, Camera, MapPin, ChevronRight, LayoutGrid, 
  Search, Home, Store, Ticket, Plus, Zap, TrendingUp, Clock, Utensils
} from "lucide-react";

const IMAGE_MAP = {
  BAGELMAN: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
  BINCHO: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&w=800&q=80",
  FALLBACK: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
};

const ALL_VENUES = [
  { id: "O1", name: "The Flour Pot", lat: 50.8256, lng: -0.1396, category: "Bakery", offer: "Free Oat Milk Upgrade", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" },
  { id: "O2", name: "Redroaster", lat: 50.8201, lng: -0.1352, category: "Lunch", offer: "10% Off Bowls", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80" },
  { id: "O3", name: "Purezza", lat: 50.8234, lng: -0.1388, category: "Pizza", offer: "LUNX Meal Deal: £10", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
  { id: "O4", name: "Shelter Hall", lat: 50.8213, lng: -0.1456, category: "Food Hall", offer: "Free Drink", img: "https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&w=800&q=80" },
  { id: "V1", name: "Bagelman", lat: 50.8245, lng: -0.1401, category: "Quick Bite", offer: "Double Points", img: IMAGE_MAP.BAGELMAN }, 
  { id: "V2", name: "Figaros", lat: 50.8261, lng: -0.1398, category: "Healthy", offer: "Free Side", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
  { id: "V3", name: "Fatto a Mano", lat: 50.8281, lng: -0.1355, category: "Pizza", offer: "£8 Lunch Special", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80" },
  { id: "V4", name: "Bond St Coffee", lat: 50.8242, lng: -0.1382, category: "Coffee", offer: "Free Pastry", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
  { id: "V5", name: "The Chilli Pickle", lat: 50.8248, lng: -0.1378, category: "Indian", offer: "20% Off Canteen", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
  { id: "V6", name: "Wolfox Roast", lat: 50.8252, lng: -0.1412, category: "Coffee", offer: "LUNX Loyalty Box", img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80" },
  { id: "V7", name: "Happy Patty", lat: 50.8210, lng: -0.1435, category: "Burgers", offer: "Free Fries", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80" },
  { id: "V8", name: "Giggling Squid", lat: 50.8222, lng: -0.1395, category: "Thai", offer: "Express Lunch: £9", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" },
  { id: "V9", name: "Lost in the Lanes", lat: 50.8228, lng: -0.1410, category: "Bistro", offer: "Complimentary Juice", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" },
  { id: "V10", name: "Moshimo", lat: 50.8215, lng: -0.1408, category: "Sushi", offer: "50% Off Mondays", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80" },
  { id: "V11", name: "Cin Cin", lat: 50.8270, lng: -0.1380, category: "Italian", offer: "Pasta & Drink: £12", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80" },
  { id: "V12", name: "Terre à Terre", lat: 50.8220, lng: -0.1400, category: "Vegetarian", offer: "LUNX Set Menu", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { id: "V13", name: "Pelicano", lat: 50.8265, lng: -0.1385, category: "Bakery", offer: "BOGOF Afternoon", img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80" },
  { id: "N1", name: "The Ivy In The Lanes", lat: 50.8226, lng: -0.1405, category: "Upscale", offer: "Complimentary Dessert", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" },
  { id: "N2", name: "Dishoom Brighton", lat: 50.8224, lng: -0.1380, category: "Indian", offer: "Free Chai Upgrade", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80" },
  { id: "N3", name: "Plateau", lat: 50.8221, lng: -0.1415, category: "Wine Bar", offer: "Sharing Plate: £15", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80" },
  { id: "N4", name: "The Coal Shed", lat: 50.8230, lng: -0.1390, category: "Steak", offer: "Express Steak Lunch", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: "N5", name: "Burnt Orange", lat: 50.8220, lng: -0.1412, category: "Mediterranean", offer: "House Cocktail: £5", img: "https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=800&q=80" },
  { id: "N6", name: "The Salt Room", lat: 50.8210, lng: -0.1440, category: "Seafood", offer: "Daily Catch Special", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80" },
  { id: "N7", name: "Riddle & Finns", lat: 50.8205, lng: -0.1420, category: "Seafood", offer: "Oyster Happy Hour", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80" },
  { id: "N8", name: "Bincho Yakitori", lat: 50.8238, lng: -0.1415, category: "Japanese", offer: "Stick Combo: £10", img: IMAGE_MAP.BINCHO }, 
  { id: "N9", name: "64 Degrees", lat: 50.8225, lng: -0.1418, category: "Tasting", offer: "LUNX Chef's Choice", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: "N10", name: "Etch", lat: 50.8285, lng: -0.1650, category: "Fine Dining", offer: "Wine Pairing Disc.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" }
];

export default function LUNXApp() {
  const [view, setView] = useState("welcome"); 
  const [mode, setMode] = useState("employee"); 
  const [activeTab, setActiveTab] = useState("home"); 
  const [subView, setSubView] = useState("map"); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [balance, setBalance] = useState(228.00);
  const [showControl, setShowControl] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null); 
  const [browsingNode, setBrowsingNode] = useState(null); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const mapRef = useRef(null);
  const API_KEY = "AIzaSyBzuxSdtx4-LHJ7bJE5XuMKKSto1yq5FHE";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const initMap = () => {
    if (!mapRef.current || !window.google) return;
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 50.8225, lng: -0.1372 }, zoom: 15, disableDefaultUI: true
    });
    ALL_VENUES.forEach(v => {
      new window.google.maps.Marker({
        position: { lat: v.lat, lng: v.lng }, map: map,
        icon: { path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#10b981', fillOpacity: 1, scale: 7, strokeColor: 'white', strokeWeight: 2 }
      }).addListener("click", () => setBrowsingNode(v));
    });
  };

  useEffect(() => {
    if (activeTab === "venues" && subView === "map" && !isProfileOpen && mode === 'employee') {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
        script.async = true; script.onload = initMap; document.head.appendChild(script);
      } else { setTimeout(initMap, 100); }
    }
  }, [activeTab, subView, isProfileOpen, mode]);

  if (view === "welcome") {
    return (
      <div className="min-h-screen bg-[#060a13] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-3xl mb-8 flex items-center justify-center shadow-2xl"><span className="text-3xl font-black text-slate-900">L</span></div>
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">LUNX</h1>
        <p className="text-emerald-500 font-bold text-[10px] tracking-widest uppercase mb-12 opacity-80 underline decoration-2 underline-offset-4">v6.2.1 | PITCH READY</p>
        <button onClick={() => setView("app")} className="w-full max-w-xs py-5 bg-white text-black font-black rounded-2xl uppercase text-[10px] tracking-widest shadow-xl">Launch</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a13] text-slate-200 font-sans antialiased relative overflow-x-hidden">
      
      {/* HEADER */}
      <div className="fixed top-6 left-0 right-0 px-6 flex justify-between items-center z-[11000] pointer-events-none">
        <button onClick={() => setShowControl(true)} className="h-10 w-10 bg-slate-900/90 rounded-xl flex items-center justify-center border border-white/10 text-emerald-500 backdrop-blur-md pointer-events-auto active:scale-95 transition-transform"><LayoutGrid size={18}/></button>
        <div className="bg-slate-900/90 px-4 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 backdrop-blur-md pointer-events-auto">
            <Clock size={12} className="text-emerald-500" />
            <span className="text-xs font-black text-white tracking-widest">{timeString}</span>
        </div>
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)} 
          className={`h-10 w-10 rounded-full flex items-center justify-center border border-white/10 transition-all pointer-events-auto active:scale-95 ${isProfileOpen ? 'bg-emerald-500 text-black' : 'bg-slate-900/90 text-emerald-500'}`}
        >
            {isProfileOpen ? <X size={18}/> : <User size={18}/>}
        </button>
      </div>

      {/* PROFILE OVERLAY */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-[#060a13] z-[10500] p-8 pt-32 animate-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="max-w-xs mx-auto text-center space-y-8 pb-32">
            <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center text-slate-900 text-2xl font-black shadow-2xl">A</div>
            <h2 className="text-2xl font-black uppercase text-white tracking-tighter italic">Alex</h2>
            <div className="space-y-4 text-left">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-2">History</p>
              {[{v:"The Flour Pot", a:"8.50"}, {v:"Purezza", a:"12.00"}].map((tx, i) => (
                <div key={i} className="bg-slate-900/50 p-5 rounded-[2rem] border border-white/5 flex justify-between items-center">
                  <p className="text-[10px] font-black text-white uppercase">{tx.v}</p>
                  <p className="text-sm font-black text-white italic">-£{tx.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={`max-w-md mx-auto p-6 pt-24 pb-32 transition-all duration-300 ${isProfileOpen ? 'blur-sm opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {mode === 'employee' ? (
            <>
              {activeTab === 'home' && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="text-center py-6">
                    <span className="text-sm font-black text-emerald-500 uppercase tracking-[0.25em]">Your nosh awaits</span>
                    <div className="text-6xl font-black text-white my-2 tracking-tighter">£{balance.toFixed(2)}</div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {ALL_VENUES.slice(0, 10).map(v => (
                      <div key={v.id} onClick={() => setBrowsingNode(v)} className="flex-none w-24 cursor-pointer active:scale-95 transition-all">
                        <div className="w-20 h-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-lg mb-2 mx-auto bg-slate-900">
                          <img src={v.img} className="w-full h-full object-cover" onError={(e) => {e.target.src = IMAGE_MAP.FALLBACK}} alt="" />
                        </div>
                        <p className="text-[8px] font-black text-center uppercase tracking-tighter text-slate-400 truncate px-1">{v.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-8 rounded-[3rem] bg-emerald-500 shadow-2xl flex items-center justify-between cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedNode(ALL_VENUES[0])}>
                    <div><p className="text-slate-900 font-black text-xs uppercase tracking-tighter leading-none">Scan to Pay</p></div>
                    <div className="bg-white/20 p-4 rounded-3xl"><Camera size={32} className="text-slate-900" /></div>
                  </div>
                </div>
              )}

              {activeTab === 'discover' && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic px-2">Find Food</h2>
                  <div className="grid grid-cols-2 gap-4 pb-12">
                    {ALL_VENUES.map(v => (
                      <div key={v.id} className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-xl cursor-pointer active:scale-95" onClick={() => setBrowsingNode(v)}>
                        <img src={v.img} className="h-32 w-full object-cover" onError={(e) => {e.target.src = IMAGE_MAP.FALLBACK}} alt="" />
                        <div className="p-4"><p className="text-[10px] font-black text-white uppercase truncate">{v.name}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'deals' && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-white px-2 italic">Live Deals</h2>
                  <div className="space-y-4 pb-12">
                    {ALL_VENUES.map(v => (
                      <div key={v.id} className="bg-slate-900 p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-5 cursor-pointer active:scale-95" onClick={() => setBrowsingNode(v)}>
                         <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500"><Ticket size={24}/></div>
                         <div className="flex-1 overflow-hidden"><p className="text-[11px] font-black text-white uppercase truncate mb-1">{v.offer}</p><p className="text-[9px] text-slate-500 uppercase tracking-widest">{v.name}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'venues' && (
                <div className="space-y-6 animate-in fade-in">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">Brighton</h2>
                        <div className="bg-slate-900 p-1 rounded-xl flex border border-white/5">
                            <button onClick={()=>setSubView('map')} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase ${subView==='map'?'bg-white text-black':'text-slate-500'}`}>Map</button>
                            <button onClick={()=>setSubView('list')} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase ${subView==='list'?'bg-white text-black':'text-slate-500'}`}>List</button>
                        </div>
                    </div>
                    {subView === 'map' ? (
                      <div className="h-[450px] w-full rounded-[3rem] overflow-hidden border border-white/10 relative">
                        <div ref={mapRef} className="w-full h-full" />
                      </div>
                    ) : (
                      <div className="space-y-3 pb-12">
                        {ALL_VENUES.map(v => (
                          <div key={v.id} className="bg-slate-900 p-5 rounded-[2rem] flex items-center gap-4 border border-white/5 cursor-pointer active:scale-95" onClick={() => setBrowsingNode(v)}>
                            <img src={v.img} className="w-14 h-14 rounded-2xl object-cover" onError={(e) => {e.target.src = IMAGE_MAP.FALLBACK}} />
                            <div className="flex-1 font-black text-white uppercase text-[11px] truncate">{v.name}</div>
                            <ChevronRight size={16} className="text-slate-700" />
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-8 animate-in fade-in">
              <div className="text-center py-6">
                <span className="text-sm font-black text-emerald-500 uppercase tracking-[0.25em]">Live Revenue</span>
                <div className="text-6xl font-black text-white my-2 tracking-tighter italic">£1,420.50</div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Net Payout after 5% LUNX fee</p>
              </div>
              <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <p className="text-[10px] font-black text-white uppercase">Today's Covers</p>
                  <p className="text-xl font-black text-emerald-500 italic">42</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Recent Activity</p>
                  {["12:45 - £12.00", "12:38 - £8.50", "12:15 - £22.00"].map((log, i) => (
                    <div key={i} className="flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                      <span>Confirmed Payment</span>
                      <span className="text-emerald-500">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </main>

      {/* NAV */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-slate-900/95 backdrop-blur-2xl p-2.5 rounded-full flex border border-white/10 shadow-2xl z-[12000] ${isProfileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity'}`}>
          {[{ id: 'home', icon: Home, label: 'Home' }, { id: 'discover', icon: Search, label: 'Find' }, { id: 'deals', icon: Ticket, label: 'Deals' }, { id: 'venues', icon: Store, label: 'Venues' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 rounded-full flex flex-col items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-black shadow-xl' : 'text-slate-500'}`}><tab.icon size={20}/><span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span></button>
          ))}
      </nav>

      {/* BROWSING MODAL */}
      {browsingNode && (
        <div className="fixed bottom-32 left-8 right-8 bg-white rounded-[3rem] p-8 flex flex-col shadow-2xl z-[13000] animate-in slide-in-from-bottom-20">
            <p className="text-lg font-black uppercase text-slate-900 mb-1">{browsingNode.name}</p>
            <p className="text-[10px] font-black text-emerald-600 uppercase mb-6">{browsingNode.offer}</p>
            <div className="flex gap-4">
                <button onClick={() => { setSelectedNode(browsingNode); setBrowsingNode(null); }} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px]">Select</button>
                <button onClick={() => setBrowsingNode(null)} className="px-6 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase text-[10px]">X</button>
            </div>
        </div>
      )}

      {/* PERSONA CONTROL */}
      {showControl && (
        <div className="fixed inset-0 z-[14000] bg-black/98 flex items-center justify-center p-8" onClick={() => setShowControl(false)}>
          <div className="w-full max-w-xs bg-white rounded-[4rem] p-10 space-y-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setMode('employee'); setShowControl(false); }} className={`w-full p-6 text-left text-[11px] font-black uppercase rounded-[2rem] ${mode === 'employee' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>Employee</button>
            <button onClick={() => { setMode('merchant'); setShowControl(false); }} className={`w-full p-6 text-left text-[11px] font-black uppercase rounded-[2rem] ${mode === 'merchant' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>Partner Venue</button>
          </div>
        </div>
      )}

      {/* PAYMENT SCREEN */}
      {selectedNode && (
        <div className="fixed inset-0 z-[15000] bg-[#060a13] p-10 flex flex-col items-center justify-center text-white text-center animate-in fade-in">
          <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic">{selectedNode.name}</h2>
          <button 
            onClick={() => { setBalance(balance - 12); setShowSuccess(true); setSelectedNode(null); }} 
            className="w-full py-10 bg-emerald-500 text-slate-900 font-black rounded-[3rem] uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-transform"
          >
            Slide to Pay £12.00
          </button>
          <button onClick={()=>setSelectedNode(null)} className="mt-16 text-[10px] font-black text-slate-500 uppercase tracking-widest">Cancel</button>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {showSuccess && (
        <div className="fixed inset-0 z-[16000] bg-emerald-500 flex flex-col items-center justify-center text-white p-10 text-center animate-in zoom-in">
          <CheckCircle size={100} className="mb-10" />
          <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-6 italic">Paid!</h2>
          <button onClick={() => { setShowSuccess(false); setActiveTab('home'); }} className="w-full max-w-xs py-7 bg-slate-900 text-white font-black rounded-[2.5rem] uppercase text-[11px] mt-20 shadow-2xl">Back Home</button>
        </div>
      )}
    </div>
  );
}
