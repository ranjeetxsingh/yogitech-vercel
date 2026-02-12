import React from 'react';

const TECH_ITEMS = [
  "Network Security", "•", "Cloud Computing", "•", "Data Recovery", "•",
  "Smart Home IoT", "•", "Web Development", "•", "SEO Optimization", "•",
  "React & Node.js", "•", "Cybersecurity", "•", "IT Consultation", "•",
  "Digital Marketing", "•", "Hardware Repair", "•", "Mobile Apps", "•"
];

const TechMarquee: React.FC = () => {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 overflow-hidden relative z-10">
      {/* 
        Container width is fit-content so it holds both children.
        We translate it by -50% (which is exactly the width of one child) to create the loop.
      */}
      <div className="flex w-max animate-marquee">
        {/* Copy 1 */}
        <div className="flex items-center gap-12 px-6">
            {TECH_ITEMS.map((item, index) => (
                <span 
                key={`1-${index}`} 
                className={`text-lg md:text-xl font-medium whitespace-nowrap ${
                    item === '•' 
                    ? 'text-blue-500' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                >
                {item}
                </span>
            ))}
        </div>
        
        {/* Copy 2 (Identical) */}
        <div className="flex items-center gap-12 px-6">
            {TECH_ITEMS.map((item, index) => (
                <span 
                key={`2-${index}`} 
                className={`text-lg md:text-xl font-medium whitespace-nowrap ${
                    item === '•' 
                    ? 'text-blue-500' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                >
                {item}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;