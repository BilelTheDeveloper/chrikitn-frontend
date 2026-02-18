import React from 'react';

const ServicesPage = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-950 min-h-screen text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8">
          The <span className="text-blue-500">Ecosystem</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg mb-16">
          Chriki TN operates on a three-tier trust system. Whether you are building, 
          executing, or scaling, we have a dedicated path for you.
        </p>

        <div className="space-y-20">
          {/* Detailed Section: Standard Users */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">01. Standard (Founders)</h2>
              <p className="text-gray-400 leading-relaxed">
                For individuals with a vision for the Tunisian market. You get access to the "Public Pitch Feed" 
                where you can share your ideas and find partners without worrying about intellectual property theft 
                because every viewer is biometric-verified.
              </p>
            </div>
            <div className="h-64 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-500 font-black">IDENTITY SECURED</span>
            </div>
          </div>

          {/* Detailed Section: Freelancers */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-20">
            <div className="order-2 lg:order-1 h-64 bg-indigo-600/10 rounded-3xl border border-indigo-500/20 flex items-center justify-center">
               <span className="text-indigo-500 font-black">PORTFOLIO VETTED</span>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-4">02. Verified Freelancers</h2>
              <p className="text-gray-400 leading-relaxed">
                Not everyone can be a Chriki Freelancer. We manually review your portfolio and 
                require a live face-match. Once in, you unlock the VIP Feed where high-ticket 
                Brand contracts are posted daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;