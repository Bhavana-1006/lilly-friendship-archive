import React from 'react';
import { Sparkles, X, Heart, Feather } from 'lucide-react';
import { friendshipConfig } from '../config/friendshipConfig';

export default function SecretEasterEggModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper-50 max-w-md w-full p-8 sketch-border shadow-paper-deep text-center relative animate-fade-in">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-charcoal/20 hover:bg-paper-200 text-charcoal transition-all"
          aria-label="Close Easter Egg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-block p-3 bg-paper-200 rounded-full sketch-border-subtle mb-4">
          <Feather className="w-6 h-6 text-accentGold" />
        </div>

        <div className="classified-stamp text-[10px] font-bold mb-3">
          SECRET NOTE UNLOCKED
        </div>

        <p className="font-handwritten text-2xl sm:text-3xl text-charcoal leading-relaxed mb-6">
          {message || friendshipConfig.easterEggs.pencilSecretMessage}
        </p>

        <p className="font-mono text-[11px] text-charcoal/50">
          "Some secrets are only found by those who look closely."
        </p>

        <div className="mt-6 pt-4 border-t border-charcoal/15">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider hover:bg-charcoal-deep shadow-sketch"
          >
            Keep Secret & Close
          </button>
        </div>
      </div>
    </div>
  );
}
