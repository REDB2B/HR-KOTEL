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
      {/* Верхняя навигация */}
      <Navbar onOpenInstantModal={() => handleOpenInstantModal()} />

      {/* Основной контент */}
      <main>
        {/* Герой-секция с котлом */}
        <Hero onOpenInstantModal={(direction) => handleOpenInstantModal(direction)} />

        {/* Направления и вертикали */}
        <Directions onOpenInstantModal={(direction) => handleOpenInstantModal(direction)} />

        {/* Конфигуратор «Сварить команду» */}
        <CandidateCooker onSuccessSubmit={(_tg, _email) => {}} />

        {/* Кейсы */}
        <Cases onOpenInstantModal={(caseTitle) => handleOpenInstantModal(undefined, caseTitle)} />

        {/* 4-шаговый процесс работы */}
        <Workflow onOpenInstantModal={() => handleOpenInstantModal()} />

        {/* FAQ */}
        <TrustAndFaq onOpenInstantModal={() => handleOpenInstantModal()} />
      </main>

      {/* Футер с быстрой формой */}
      <Footer onOpenInstantModal={(dir) => handleOpenInstantModal(dir)} />

      {/* Глобальная быстрая модалка (Telegram + Email) */}
      <InstantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        presetTitle={presetTitle}
        presetDirection={presetDirection}
      />
    </div>
  );
}
