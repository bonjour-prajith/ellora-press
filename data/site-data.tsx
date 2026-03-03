import { 
  IconShieldLock, 
  IconPalette, 
  IconRocket, 
  IconBoxMargin 
} from "@tabler/icons-react";


export const PRODUCT_DATA = [
  {
    id: "kit-4",
    label: "Kit 4",
    category: "Books & Publications",
    tagline: "Ideal for educational institutions and publishers.",
    items: [
      { name: "Owner's Manuals", img: "/products/user-manual.webp" },
      { name: "Magazines", img: "/products/magazine.webp" },
      { name: "Notebooks", img: "/products/notebook.webp" },
      { name: "Textbooks", img: "/products/textbook-v2.webp" },
    ],
  },
  {
    id: "kit-3",
    label: "Kit 3",
    category: "Packaging & Bulk Print Materials",
    tagline: "Optimized for large quantities and unit-cost efficiency.",
    items: [
      { name: "Labels", img: "/products/labels.webp" },
      { name: "Cartons", img: "/products/carton.webp" },
      { name: "Inserts & Tags", img: "/products/tags.webp" },
      { name: "Instruction Manuals", img: "/products/instruction.webp" },
    ],
  },
  {
    id: "kit-2",
    label: "Kit 2",
    category: "Corporate & Institutional Printing",
    tagline: "Designed for consistency and long-term usage.",
    items: [
      
      { name: "Envelopes", img: "/products/envelope.webp" },
      { name: "Letterheads", img: "/products/letterhead.webp" },
      { name: "Annual Reports", img: "/products/annual-report.webp" },
      { name: "Training Manuals", img: "/products/training-manuals.webp" },
    ],
  },
  {
    id: "kit-1",
    label: "Kit 1",
    category: "Marketing & Promotional Prints",
    tagline: "Best for campaigns, promotions, and brand communication.",
    items: [
      { name: "Brochures", img: "/products/brochure.webp" },
      { name: "Flyers & Leaflets", img: "/products/flyer.webp" },
      { name: "Catalogs", img: "/products/catalog.webp" },
      { name: "Calendars", img: "/products/calendars.webp" },
    ],
  },
];

export const partners = [
    { src: "/Logos/royal-enfield.svg", name: "Royal Enfield" },
    { src: "/Logos/eicher.svg", name: "Eicher" },
    { src: "/Logos/same.svg", name: "Same" },
    { src: "/Logos/montra.svg", name: "Montra" },
    { src: "/Logos/hero.svg", name: "Hero" },
    { src: "/Logos/srm-university.svg", name: "SRM University" },
  ];

export const bentoItems = [
  {
    tag: "", 
    title: "Why Us?",
    description: "Discover why industry leaders trust Ellora Press.", 
    visual: (
      <div className="flex flex-1 w-full h-full relative items-center justify-center bg-zinc-950 overflow-hidden">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        
        {/* 37 YEAR BADGE */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group cursor-default">
            {/* Rotating Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
            
            <div className="h-48 w-48 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl">
              <span className="text-6xl font-black text-white tracking-tighter italic">37</span>
              <div className="h-[1px] w-12 bg-white/20 my-2" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 text-center px-4 leading-tight">
                Years of <br/> Excellence
              </span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-1 opacity-30">
             <p className="text-[9px] font-mono tracking-[0.5em] uppercase text-white">Est. 1989 / Heritage</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "01 / PRECISION",
    title: "Risk-Free Prototyping",
    description: "Visualize your project before the press rolls. We offer zero-cost design assistance and physical samples.",
    visual: (
      <div className="flex flex-1 w-full h-full items-center justify-center bg-zinc-900/40 border border-white/5">
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-2 gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="h-12 w-12 border border-white" />
            <div className="h-12 w-12 border border-white bg-white/10" />
            <div className="h-12 w-12 border border-white bg-white" />
            <div className="h-12 w-12 border border-white" />
          </div>
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/50">Tactile Sample Grid</p>
        </div>
      </div>
    ),
  },
  {
    tag: "02 / SECURITY",
    title: "Secure IP Protocols",
    description: "Your intellectual property is guarded by bank-grade security protocols and strict NDA handling.",
    visual: (
      <div className="flex flex-1 w-full h-full bg-zinc-950 flex-col items-center justify-center relative border border-white/5">
        <IconShieldLock size={64} stroke={0.5} className="text-white/20" />
        <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    ),
  },
  {
    tag: "03 / CONSISTENCY",
    title: "Pantone Accuracy",
    description: "Zero variance. We match your brand identity across every single run using global matching systems.",
    visual: (
      <div className="flex flex-1 w-full h-full relative bg-black overflow-hidden group">
        {/* PANTONE SPECTRUM (Value pop) */}
        <div className="absolute inset-0 flex">
          {['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#6C4AB6', '#F06292', '#000000'].map((color, i) => (
            <div 
              key={i} 
              className="h-full flex-1 transition-all duration-700 hover:flex-[1.5]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6">
           <p className="text-[10px] font-mono font-bold text-white tracking-[0.5em] uppercase">Vibrant Matching</p>
        </div>
      </div>
    ),
  },
  {
    tag: "04 / SPEED",
    title: "Express Logistics",
    description: "Streamlined bulk processes for the quickest turnaround times in the industry.",
    visual: (
      <div className="flex flex-1 w-full h-full bg-zinc-950 flex-col items-center justify-center border border-white/5">
        <div className="relative h-32 w-[1px] bg-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full border border-white/20 flex items-center justify-center bg-zinc-950">
            <div className="h-1 w-1 rounded-full bg-white animate-ping" />
          </div>
        </div>
        <IconRocket size={32} stroke={1} className="text-white/40 my-4" />
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20">Rapid Dispatch</p>
      </div>
    ),
  },
];
