import React, { useState } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { HelpCircle, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Award, RotateCcw } from 'lucide-react';

export default function Stage6Quiz({ onNext, onPrev }) {
  const questions = friendshipConfig.quizQuestions;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered && isCorrect) return; // already solved this question
    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundFx.playUnlock();
      setCompletedQuestions(prev => Math.max(prev, currentQIndex + 1));
      
      if (currentQIndex === questions.length - 1) {
        setTimeout(() => {
          setQuizFinished(true);
        }, 1000);
      }
    } else {
      soundFx.playClick();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      soundFx.playClick();
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    soundFx.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleProceedToHunt = () => {
    soundFx.playUnlock();
    onNext();
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center">
      
      {/* Header */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded-full text-xs font-mono tracking-widest text-charcoal/70">
          <HelpCircle className="w-3.5 h-3.5 text-accentGold" />
          <span>AUTHENTICATION PROTOCOL</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-charcoal font-medium tracking-tight">
          HOW WELL DO YOU KNOW US?
        </h2>

        <p className="font-serif text-lg text-charcoal/70 italic">
          "Answer correctly to prove your access privileges."
        </p>
      </div>

      {!quizFinished ? (
        /* Quiz Active Question Box */
        <div className="w-full bg-paper-50 sketch-border shadow-paper-elevated p-6 sm:p-8 relative">
          <div className="tape-top" />

          {/* Progress Tracker */}
          <div className="flex items-center justify-between border-b border-charcoal/15 pb-4 mb-6">
            <span className="font-mono text-xs text-sepiaTone font-bold uppercase tracking-wider">
              QUESTION {currentQIndex + 1} OF {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < completedQuestions
                      ? 'bg-emerald-700'
                      : i === currentQIndex
                      ? 'bg-accentGold'
                      : 'bg-charcoal/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-6">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isThisSelected = selectedOption === idx;
              let btnStyle = "bg-paper-100 hover:bg-paper-200 border-charcoal/20 text-charcoal";

              if (isAnswered && isThisSelected) {
                btnStyle = isCorrect
                  ? "bg-emerald-100/90 border-emerald-600 text-emerald-950 font-bold"
                  : "bg-rose-100/90 border-rose-500 text-rose-950";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered && isCorrect}
                  className={`w-full p-4 rounded text-left border flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-paper-300 font-mono text-xs flex items-center justify-center font-bold text-charcoal/80">
                      {letter}
                    </span>
                    <span className="font-sans text-sm sm:text-base">{opt}</span>
                  </div>

                  {isAnswered && isThisSelected && (
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

          {/* Feedback & Continue */}
          {isAnswered && (
            <div className="pt-4 border-t border-charcoal/15 animate-fade-in">
              {isCorrect ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-emerald-800 font-mono text-xs sm:text-sm">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> ✓ MEMORY UNLOCKED
                    </p>
                    <p className="text-charcoal/70 mt-0.5">{currentQ.unlockedHint}</p>
                  </div>

                  {currentQIndex < questions.length - 1 ? (
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
                  <div className="text-rose-900 font-mono text-xs sm:text-sm">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> {currentQ.wrongMessage || "Nice try. You know me better than that... probably."}
                    </p>
                  </div>

                  <button
                    onClick={handleRetry}
                    className="px-5 py-2 border border-charcoal/30 hover:border-charcoal bg-paper-200 text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Completed Quiz Screen */
        <div className="w-full bg-paper-50 sketch-border shadow-paper-deep p-8 sm:p-10 text-center space-y-6 animate-fade-in relative">
          <div className="tape-top" />

          <div className="inline-block p-4 bg-paper-200 rounded-full sketch-border-subtle">
            <Award className="w-10 h-10 text-accentGold" />
          </div>

          <div>
            <div className="classified-stamp text-xs font-bold mb-3">
              FRIENDSHIP LEVEL: UNLOCKED ✓
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-charcoal font-semibold">
              "Okay. You know the past."
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-charcoal/80 italic mt-2">
              "Now let's see if you can find the future."
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleProceedToHunt}
              className="px-8 py-4 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
            >
              <span>BEGIN THE TREASURE HUNT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {!quizFinished && (
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={onPrev}
            className="px-5 py-2.5 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Memories</span>
          </button>
        </div>
      )}

    </section>
  );
}
