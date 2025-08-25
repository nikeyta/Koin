"use client";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { CometCard } from "@/components/ui/comet-card";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const Guest = () => {
  return (
    <div className="relative flex md:min-h-screen h-full items-center justify-center bg-emerald-50 dark:bg-[#05241d] py-9  ">
      
      <div className="relative z-20 text-center mt-20 mb-10 px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:mx-15 mx-auto items-center">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold text-start dark:text-white text-[#073127] mb-6 leading-tight">
              <TextGenerateEffect words="Is your money vanishing faster than your weekend?" />
            </h1>

            <p className="md:text-xl text-xs text-start text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
              Say goodbye to financial stress and confusion. KOIN keeps you in
              control, effortlessly managing your daily expenses in just a few
              simple taps.
            </p>

            <div className="flex justify-start">
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition font-semibold">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </div>


<CometCard >
          <div className="relative px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm mx-auto">
              <div className="mb-6">
                <h3 className="text-gray-900 font-semibold mb-4">
                  Your Expenses
                </h3>
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="60, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      68%
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-sm px-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Food</span>
                    </div>
                    <span className="font-medium text-black">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-gray-600 mr-2">Entertainment</span>
                    </div>
                    <span className="font-medium text-black">72%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-gray-600">Bills</span>
                    </div>
                    <span className="font-medium text-black">84%</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-500 text-sm">Save for rainy day</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* sub cards */}
            <div className="absolute md:-top-4 -top-10 -right-4  text-[10px] mr-2 bg-white rounded-2xl shadow-lg md:p-4 p-1 md:max-w-48 max-w-36">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="md:text-xs  font-bold text-emerald-600">
                    #1
                  </span>
                </div>
                <span className="md:text-sm font-semibold text-emerald-500">
                  AI Savio
                </span>
              </div>
              <p className="md:text-xs text-gray-500">
                Take charge with AI-powered tracking designed for clarity and
                growth.
              </p>
            </div>

            <div className="absolute -bottom-7 md:-left-1 -left-4 ml-2 text-[10px] bg-white rounded-2xl shadow-lg md:p-4 p-1 max-w-48">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="md:text-xs font-bold text-emerald-600">
                    #2
                  </span>
                </div>
                <span className="md:text-sm font-semibold text-emerald-500">
                  Get Started
                </span>
              </div>
              <p className="md:text-xs text-gray-500">
                Sign up with your email and start tracking your expenses
                hassle-free!
              </p>
            </div>
          </div>
          </CometCard>
        </div>
      </div>
    </div>
  );
};

export default Guest;
