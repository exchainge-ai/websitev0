'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#0C2B31] text-gray-400 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 pr-10">Sign In to ExchAInge</h2>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#04C61B',
                  brandAccent: '#6DF77E',
                  brandButtonText: '#0C2B31',
                  defaultButtonBackground: '#0A1F24',
                  defaultButtonBackgroundHover: '#0C2B31',
                  defaultButtonBorder: '#04C61B',
                  defaultButtonText: 'white',
                  dividerBackground: '#04C61B',
                  inputBackground: '#0C2B31',
                  inputBorder: '#04C61B',
                  inputBorderHover: '#6DF77E',
                  inputBorderFocus: '#04C61B',
                  inputText: 'white',
                  inputLabelText: '#9CA3AF',
                  inputPlaceholder: '#6B7280',
                },
                space: {
                  spaceSmall: '4px',
                  spaceMedium: '8px',
                  spaceLarge: '16px',
                },
                fontSizes: {
                  baseBodySize: '14px',
                  baseInputSize: '14px',
                  baseLabelSize: '14px',
                  baseButtonSize: '14px',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  buttonBorderRadius: '8px',
                  inputBorderRadius: '8px',
                },
              },
            },
            className: {
              container: 'supabase-auth-container',
              button: 'supabase-auth-button',
              input: 'supabase-auth-input',
              label: 'supabase-auth-label',
            },
          }}
          providers={['github']}
          redirectTo={typeof window !== 'undefined' ? window.location.origin : ''}
          onlyThirdPartyProviders={false}
          magicLink={false}
          view="sign_in"
          showLinks={true}
        />

        <div className="mt-6 pt-6 border-t border-[#04C61B]/20">
          <p className="text-gray-400 text-sm text-center">
            Email sign-in is for demo purposes. For production, connect your Supabase project.
          </p>
        </div>
      </div>
    </div>
  );
}
