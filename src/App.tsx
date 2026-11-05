/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Directions } from './components/Directions';
import { CandidateCooker } from './components/CandidateCooker';
import { Cases } from './components/Cases';
import { Workflow } from './components/Workflow';
import { TrustAndFaq } from './components/TrustAndFaq';
import { Footer } from './components/Footer';
import { InstantModal } from './components/InstantModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetTitle, setPresetTitle] = useState<string | undefined>();
  const [presetDirection, setPresetDirection] = useState<string | undefined>();

  const handleOpenInstantModal = (direction?: string, title?: string) => {
    setPresetDirection(direction);
    setPresetTitle(title);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0813] text-[#E5E0F5] selection:bg-[#97D700] selection:text-[#0B0813]">
      {/* Top Navigation */}
      <Navbar onOpenInstantModal={() => handleOpenInstantModal()} />

      {/* Main Content */}
      <main>
        {/* Hero Section with Cauldron & Witch Vector Animation */}
        <Hero onOpenInstantModal={(direction) => handleOpenInstantModal(direction)} />

        {/* Directions & Any Verticals (Including Heavy Ones) */}
        <Directions onOpenInstantModal={(direction) => handleOpenInstantModal(direction)} />

        {/* Interactive Candidate Cooker ("Сварить команду в Котел") */}
        <CandidateCooker onSuccessSubmit={(tg, email) => {}} />

        {/* Prominent High-Impact Cases */}
        <Cases onOpenInstantModal={(caseTitle) => handleOpenInstantModal(undefined, caseTitle)} />

        {/* 4-Step Transparent Workflow */}
        <Workflow onOpenInstantModal={() => handleOpenInstantModal()} />

        {/* FAQ Accordion */}
        <TrustAndFaq onOpenInstantModal={() => handleOpenInstantModal()} />
      </main>

      {/* Footer with Instant Fast Form */}
      <Footer onOpenInstantModal={(dir) => handleOpenInstantModal(dir)} />

      {/* Global Fast 2-Field Instant Modal (Telegram + Email) */}
      <InstantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        presetTitle={presetTitle}
        presetDirection={presetDirection}
      />
    </div>
  );
}
