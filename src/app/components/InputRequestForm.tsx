import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface InputRequestFormProps {
  prompt: string;
  inputType: 'text' | 'multichoice' | 'confirmation' | 'choice';
  elicitationId: string;
  choices?: string[];
  context?: string;
  onSubmit: (elicitationId: string, response: any) => void;
}

export function InputRequestForm({
  prompt,
  inputType,
  elicitationId,
  choices = [],
  context,
  onSubmit
}: InputRequestFormProps) {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');

  const handleSubmit = () => {
    let response;
    
    switch (inputType) {
      case 'text':
        response = { text: textInput };
        break;
      case 'multichoice':
        response = { choices: selectedChoices };
        break;
      case 'confirmation':
        response = { confirmed: true };
        break;
      case 'choice':
        response = { choice: selectedChoices[0] || null };
        break;
    }
    
    onSubmit(elicitationId, response);
    
    // Reset form
    setSelectedChoices([]);
    setTextInput('');
  };

  const handleCancel = () => {
    onSubmit(elicitationId, { cancelled: true });
    setSelectedChoices([]);
    setTextInput('');
  };

  const toggleChoice = (choice: string) => {
    if (inputType === 'multichoice') {
      setSelectedChoices(prev =>
        prev.includes(choice)
          ? prev.filter(c => c !== choice)
          : [...prev, choice]
      );
    } else if (inputType === 'choice') {
      setSelectedChoices([choice]);
    }
  };

  return (
    <div className="bg-[#F8F8F8] border border-[#e5e5e5] rounded-lg p-4 max-w-[800px] space-y-4">
      {/* Prompt */}
      <div>
        <p className="text-[15px] text-[#212223] leading-[1.5] mb-1">{prompt}</p>
        {context && (
          <p className="text-[13px] text-[#8a8a8a] leading-[1.4]">{context}</p>
        )}
      </div>

      {/* Form Elements Based on Input Type */}
      {inputType === 'text' && (
        <div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your response here..."
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg text-[14px] text-[#212223] resize-y focus:outline-none focus:ring-2 focus:ring-[#D64000] focus:border-transparent"
          />
        </div>
      )}

      {inputType === 'multichoice' && (
        <div className="space-y-2">
          {choices.map((choice, index) => {
            const isSelected = selectedChoices.includes(choice);
            return (
              <button
                key={`multichoice-${choice}-${index}`}
                onClick={() => toggleChoice(choice)}
                className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-[#FFF5F0] border-[#D64000] text-[#212223]'
                    : 'bg-white border-gray-300 text-[#212223] hover:border-gray-400'
                }`}
              >
                {isSelected ? (
                  <CheckCircle className="size-5 text-[#D64000] shrink-0" />
                ) : (
                  <Circle className="size-5 text-gray-400 shrink-0" />
                )}
                <span className="text-[14px]">{choice}</span>
              </button>
            );
          })}
        </div>
      )}

      {inputType === 'choice' && (
        <div className="space-y-2">
          {choices.map((choice, index) => {
            const isSelected = selectedChoices.includes(choice);
            return (
              <button
                key={`choice-${choice}-${index}`}
                onClick={() => toggleChoice(choice)}
                className={`w-full flex items-center gap-3 px-4 py-3 border rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-[#FFF5F0] border-[#D64000] text-[#212223]'
                    : 'bg-white border-gray-300 text-[#212223] hover:border-gray-400'
                }`}
              >
                <div className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-[#D64000]' : 'border-gray-400'
                }`}>
                  {isSelected && <div className="size-2 rounded-full bg-[#D64000]" />}
                </div>
                <span className="text-[14px]">{choice}</span>
              </button>
            );
          })}
        </div>
      )}

      {inputType === 'confirmation' && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <span className="text-xl">?</span>
          </div>
          <p className="text-[14px] text-blue-900">Click "Confirm" to proceed with this action.</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={
            (inputType === 'text' && !textInput.trim()) ||
            ((inputType === 'multichoice' || inputType === 'choice') && selectedChoices.length === 0)
          }
          className="px-4 py-2 bg-[#D64000] text-white text-[14px] font-medium rounded-lg hover:bg-[#B83600] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {inputType === 'confirmation' ? 'Confirm' : 'Submit'}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-white border border-gray-300 text-[#212223] text-[14px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}