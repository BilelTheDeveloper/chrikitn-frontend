import React from 'react';
import { motion } from 'framer-motion';
import { Server, Lock } from 'lucide-react';

const TunisiaMap = () => {
  // Coordinates are kept exactly as you liked them
  const cities = [
    { name: 'Bizerte', x: 200, y: 55 },
    { name: 'Tunis', x: 248, y: 92 },
    { name: 'Sousse', x: 285, y: 195 },
    { name: 'Sfax', x: 272, y: 270 },
    { name: 'Gabès', x: 245, y: 345 },
    { name: 'Zarzis', x: 335, y: 442 },
    { name: 'Tozeur', x: 105, y: 345 },
    { name: 'Kef', x: 145, y: 165 },
    { name: 'Tataouine', x: 225, y: 485 },
    
  ];

  const center = { x: 190, y: 240 };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
      <svg
        // Responsive ViewBox: Higher height on mobile, original on desktop handled by CSS
        viewBox="0 0 400 680"
        // CSS Scaling: h-[50vh] on mobile, h-[82vh] on large screens
        className="w-auto h-[45vh] sm:h-[60vh] lg:h-[82vh] max-w-full drop-shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. THE PERFECT GEOGRAPHICAL PATH */}
        <motion.path
          d="m254 45 .0781 2.7813c.4942 11.6209.4942 11.6209 6.7422 20.9609 1.2348 1.0448 2.4964 2.059 3.789 3.0312L266 73v2c-1.9615 1.3894-3.9617 2.726-6 4 .3444 2.4727.3444 2.4727 1 5 3.3908 1.6954 6.3567 1.6413 10 1 15.1947-5.6956 28.619-16.503 40.582-27.2344C314 56 314 56 318 56c3.8085 6.2307 2.66 14.5384 1.3477 21.4219C314.5113 94.7748 304.1537 104.3224 289 113a961 961 0 0 1-5 2.6875c-5.7442 3.1562-9.829 7.028-12 13.3125-1.6483 9.9048 1.6266 17.85 7 26 5.5492 7.6884 11.9195 15.1202 19.8125 20.4375.865.5943 1.73 1.1885 2.621 1.8008L304 179c6.7954 4.7742 12.8855 9.542 15 18 2.306 18.0477-7.7748 38.0031-18.539 52.086C294.919 255.648 288.9686 261.828 283 268l-2.582 2.707c-3.787 3.8961-7.6917 7.3297-11.9805 10.668-10.2926 8.3287-19.5985 21.9306-22.1133 35.1875C245.8482 328.0951 251.5465 336.656 259 345c5.7185 5.5823 10.1517 7.389 18.125 7.375l2.2869.004c6.141-.1159 11.1685-1.3962 16.5881-4.379l.1133 2.1953c.3853 5.6666.8712 9.9537 3.8867 14.8047 5.7022-.1462 8.6381-2.826 12.754-6.4062 2.4612-1.7465 4.2791-2.2184 7.246-2.5938 5.5626 6.7135 6.847 15.481 7.375 24 .3145 3.3607.6561 4.0418 2.8125 6.9375 5.258 3.8559 10.2997 4.3345 16.6406 4.7188C349 392 349 392 351 394c.1794 2.9583.1794 2.9583.0898 6.7383q-.0306 2.0888-.0605 4.1777c-.043 2.1806-.091 4.361-.1458 6.5413-.3133 13.4232 2.065 24.9731 6.4446 37.6677.7319 3.1316.715 4.8482-.3281 7.875-6.2735 8.4443-21.9461 9.848-31.5352 11.414-11.5135 2.0713-18.3939 9.0554-25.2968 17.9454-9.5077 11.9982-20.4263 22.937-32.4649 32.3906-3.4075 2.8364-6.559 5.877-9.7031 9l-1.6748 1.6475c-4.3526 4.385-7.4378 7.8144-7.8486 14.2158.1993 6.3284 2.8907 11.1264 5.8984 16.5742 7.8994 14.7061 7.8994 14.7061 7.9375 23.25l.0508 2.621C261.0505 596.6882 254.068 606.7762 249 616l-1.8594 3.3984C240.0011 631.5356 228.5713 637.5854 216 643c-1.6602.364-3.3263.7039-5 1l-.4397-2.0942a6015 6015 0 0 0-2.1228-10.0308l-.819-3.8608c-1.3423-6.2856-2.726-12.553-4.2591-18.7954-5.207-21.242-9.0018-42.6863-12.7781-64.2214-1.2268-6.9951-2.4634-13.9884-3.722-20.9779l-.4753-2.6696C184.9565 513.4594 183.1158 505.734 181 498l-.6367-2.6992c-2.1466-8.053-7.8934-12.9148-14.7383-17.3008-4.7362-2.7022-9.693-4.8313-14.6875-7-14.1246-6.1546-24.0294-13.4984-30.7578-27.8281-1.9646-5.2822-2.575-10.596-3.1797-16.1719-1.4273-12.1297-1.4273-12.1297-8.9375-21.3125-5.8303-3.2126-11.799-4.6555-18.2676-6.0117C85.4042 398.6616 82.4393 397.8895 80 394c-.6901-3.3789-.8832-6.7482-1.0625-10.1875-.5448-9.4774-1.9113-17.371-7.3125-25.375l-1.8437-2.789L68 353a466 466 0 0 1-2.875-4.4375l-1.1797-1.8086c-2.6634-4.9417-2.5083-10.9025-2.8828-16.3789l-.2832-2.871C60.282 319.6855 62.0349 315.0217 67 309c5.0032-5.4722 10.3559-10.6016 15.6875-15.75 21.074-20.3937 41.1484-42.3717 41.7935-73.2878.0788-15.6342-1.9382-29.7107-5.755-44.936C114.5479 157.612 115.732 144.9658 124 129c.8719-2.8451 1.2158-5.5286 1.3125-8.5l.1133-2.2812c-.6111-3.1846-1.8789-4.255-4.4258-6.2188-3.0169-1.1148-3.0169-1.1148-6.25-1.75l-3.2656-.7344L109 109v-2c2.1527-1.7407 4.3011-3.3497 6.5625-4.9375l1.8457-1.3418C121.4462 97.8536 125.3858 95.7994 130 94V81l7.5195-.3906c2.589-.409 2.589-.409 4.2696-2.3985 1.2549-2.2912 1.6212-3.7527 1.7734-6.3359C144 68 144 68 146 66c1.9051-.3594 3.8255-.6404 5.75-.875 6.5511-1.0175 10.3369-2.6805 14.5-8 5.722-7.0996 15.301-10.4755 23.3125-14.375l2.6855-1.3232C213.4514 31.313 232.896 38.1138 254 45"
          stroke="#3b82f6"
          strokeWidth="1.8"
          strokeOpacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="filter drop-shadow-[0_0_10px_#3b82f6]"
        />

        {/* 2. ELITE CONNECTION ARCS */}
        {cities.map((city, i) => (
          <g key={`flow-${i}`}>
            <motion.path
              d={`M ${city.x} ${city.y} Q ${(city.x + center.x) / 2 + 30} ${(city.y + center.y) / 2} ${center.x} ${center.y}`}
              stroke="url(#laserGradient)"
              strokeWidth="1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
            />
          </g>
        ))}

        {/* 3. CITY NODES & LABELS */}
        {cities.map((city) => (
          <g key={city.name}>
            <circle cx={city.x} cy={city.y} r="3.5" fill="#3b82f6" filter="url(#neonGlow)" />
            {/* Responsive text: Smaller font on small screens */}
            <text 
              x={city.x + 12} y={city.y + 4} 
              className="fill-blue-400/50 text-[12px] sm:text-[10px] font-black uppercase tracking-[0.1em] pointer-events-none transition-all duration-500"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* 4. THE SECURE CORE */}
        <g>
          <motion.circle
            cx={center.x} cy={center.y} r="55"
            stroke="#1d4ed8" strokeWidth="0.5" strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <circle cx={center.x} cy={center.y} r="42" fill="rgba(2, 6, 23, 0.85)" className="stroke-blue-500/40" />
          
          <foreignObject x={center.x - 25} y={center.y - 25} width="50" height="50">
            <div className="flex items-center justify-center h-full w-full relative">
              <Server className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" size={32} />
              <motion.div 
                className="absolute"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="text-white bg-blue-600 rounded-lg p-1 shadow-[0_0_15px_#3b82f6]" size={20} />
              </motion.div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default TunisiaMap;