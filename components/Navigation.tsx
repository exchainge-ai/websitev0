'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Database, Wallet, Mail, User, LogOut } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Navigation = () => {
  const pathname = usePathname();
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);

  const navItems = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'My Requests', path: '/my-requests' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Docs', path: '/docs' },
  ];

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

    connection.getBalance(publicKey).then((lamports) => {
      setBalance(lamports / LAMPORTS_PER_SOL);
    }).catch(() => {
      setBalance(null);
    });
  }, [publicKey]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        setAuthModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSupabaseUser(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C2B31]/95 backdrop-blur-md border-b border-[#04C61B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Database className="w-9 h-9 text-[#04C61B] transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#04C61B]/20 blur-xl group-hover:blur-2xl transition-all" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
              ExchAInge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#04C61B] text-[#0C2B31] shadow-lg shadow-[#04C61B]/30'
                      : 'text-gray-300 hover:bg-[#04C61B]/10 hover:text-[#04C61B]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth & Wallet Connection */}
          <div className="hidden md:flex items-center space-x-3">
            {publicKey || supabaseUser ? (
              <div className="flex items-center space-x-3">
                {/* SOL Balance (if wallet connected) */}
                {publicKey && balance !== null && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#04C61B]/10 to-[#6DF77E]/5 rounded-lg border border-[#04C61B]/30">
                    <Wallet className="w-4 h-4 text-[#04C61B]" />
                    <span className="text-sm font-bold text-[#04C61B]">
                      {balance.toFixed(2)} SOL
                    </span>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-[#04C61B]/10 rounded-lg border border-[#04C61B]/30">
                  {publicKey ? (
                    <>
                      <div className="w-2 h-2 bg-[#04C61B] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300 font-mono">
                        {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                      </span>
                    </>
                  ) : supabaseUser ? (
                    <>
                      <User className="w-4 h-4 text-[#04C61B]" />
                      <span className="text-sm text-gray-300">
                        {supabaseUser.email?.split('@')[0] || 'User'}
                      </span>
                    </>
                  ) : null}
                </div>

                {/* Disconnect/Sign Out */}
                <button
                  onClick={publicKey ? disconnect : handleSignOut}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-all"
                  title={publicKey ? "Disconnect Wallet" : "Sign Out"}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setVisible(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-xl hover:shadow-[#04C61B]/30 transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Phantom</span>
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[#04C61B]/10 text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navigation;
