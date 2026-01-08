import React from 'react';
import { ArrowRight, Clock, Truck, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh & Delicious
                <span className="block text-green-700">Food Delivered</span>
                <span className="block text-yellow-600">To Your Door</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the finest selection of artisanal snacks, catering services, and specialty food boxes crafted with love and delivered fresh to your doorstep.
              </p>
            </div>

            

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-green-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">30 Min Delivery</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-yellow-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-yellow-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-green-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">Quality Assured</p>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Food Display */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Food Box */}
              <div className="p-8 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-green-200 to-yellow-200 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">🥗</div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-900">Premium Snack Box</h3>
                  <p className="text-green-700 font-semibold">₹499</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-500 p-4 rounded-2xl shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-3xl">🍪</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-3xl">🥨</div>
              </div>
            </div>

            {/* Background Circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-300 to-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-yellow-300 to-green-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
