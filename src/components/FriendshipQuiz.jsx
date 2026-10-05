import React, { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Award, RotateCcw } from 'lucide-react';

export default function FriendshipQuiz({ onNext, onPrev }) {
  const questions = friendshipData.quizQuestions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (idx) => {
    if (isAnswered && isCorrect) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const correct = idx === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundFx.playUnlock();
      setCompletedCount(prev => Math.max(prev, currentIdx + 1));
      if (currentIdx === questions.length - 1) {
        setTimeout(() => setTestFinished(true), 900);
      }
    } else {
      soundFx.playClick();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      soundFx.playClick();
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    soundFx.playClick();
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleProceed = () => {
    soundFx.playUnlock();
    onNext();
  };

  return (
    <section className="min-h-screen py-24 px-4 max-w-3xl mx-auto flex flex-col justify-center">
      
      {/* Chapter 05 Header */}
      <ChapterHeader
        chapterNum="05"
        title="THE FRIENDSHIP TEST"
        metadata="VERIFICATION PROTOCOL // LEVEL 05"
        subtitle="You remember the story. But how well?"
      />

      {!testFinished ? (
        /* Active Question Card */
        <div className="bg-paper-50 sketch-border shadow-paper-elevated p-6 sm:p-10 relative">
          <div className="tape-top" />

          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-charcoal/15 pb-4 mb-6 font-mono text-xs">
            <span className="text-sepiaTone font-bold uppercase tracking-wider">
              QUERY {currentIdx + 1} OF {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < completedCount
                      ? 'bg-emerald-700'
                      : i === currentIdx
                      ? 'bg-accentGold'
                      : 'bg-charcoal/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="font-editorial text-2xl sm:text-3xl text-charcoal font-semibold mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOpt === idx;
              let style = "bg-paper-100 hover:bg-paper-200 border-charcoal/20 text-charcoal";

              if (isAnswered && isSelected) {
                style = isCorrect
                  ? "bg-emerald-100/90 border-emerald-600 text-emerald-950 font-bold"
                  : "bg-rose-100/90 border-rose-500 text-rose-950";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered && isCorrect}
                  className={`w-full p-4 rounded text-left border flex items-center justify-between transition-all cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-paper-300 font-mono text-xs flex items-center justify-center font-bold text-charcoal/80">
                      {letter}
                    </span>
                    <span className="font-sans text-sm sm:text-base">{opt}</span>
                  </div>

                  {isAnswered && isSelected && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {isAnswered && (
            <div className="pt-4 border-t border-charcoal/15 animate-fade-in">
              {isCorrect ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-emerald-800 font-mono text-xs sm:text-sm">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {currentQ.confirmedMessage || "MEMORY CONFIRMED ✓"}
                    </p>
                  </div>

                  {currentIdx < questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-charcoal-deep shadow-sketch cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4 text-accentGold" />
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-rose-900 font-mono text-xs">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> ARCHIVE ERROR — Try again.
                    </p>
                  </div>

                  <button
                    onClick={handleRetry}
                    className="px-5 py-2 border border-charcoal/30 hover:border-charcoal bg-paper-200 text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Answer</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        /* Test Passed Screen */
        <div className="bg-paper-50 sketch-border shadow-paper-deep p-8 sm:p-12 text-center space-y-6 animate-fade-in relative">
          <div className="tape-top" />

          <div className="inline-block p-4 bg-paper-200 rounded-full sketch-border-subtle">
            <Award className="w-10 h-10 text-accentGold" />
          </div>

          <div>
            <div className="classified-stamp text-xs font-bold mb-3">
              ARCHIVE ACCESS GRANTED ✓
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-charcoal font-semibold uppercase">
              You know the story by heart.
            </h3>
            <p className="font-serif text-xl text-charcoal/80 italic mt-2">
              "Now let's see if you can solve what comes next."
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleProceed}
              className="px-8 py-4 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm tracking-[0.2em] uppercase flex items-center gap-3 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group hover:scale-105"
            >
              <span>ACCESS RESTRICTED FILE</span>
              <ArrowRight className="w-4 h-4 text-accentGold group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      {!testFinished && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={onPrev}
            className="px-5 py-2.5 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vault</span>
          </button>
        </div>
      )}

    </section>
  );
}
