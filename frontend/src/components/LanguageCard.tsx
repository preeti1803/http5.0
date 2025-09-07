import React from 'react';

interface LanguageCardProps {
  language: {
    code: string;
    name: string;
    nativeName: string;
  };
  isSelected: boolean;
  onSelect: (code: string) => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(language.code)}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-500 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <h3 className="text-xl font-bold">{language.nativeName}</h3>
      <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
        {language.name}
      </p>
    </div>
  );
};

export default LanguageCard;