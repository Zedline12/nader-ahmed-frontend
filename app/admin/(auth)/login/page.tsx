"use client";

import React from "react";
import { GoogleLoginButton } from "@/features/auth/components/google-login-button";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="w-full max-w-md bg-background-light p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10 space-y-8 animate-fade-in-up">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in with administrative privileges
          </p>
        </div>

        <div className="space-y-4">
          <GoogleLoginButton
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/admin`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
