import { useState } from 'react';
import PasswordValidator from '@/components/PasswordValidator';
import Header from '@/components/Header';

const PasswordValidatorPage = () => {
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Password Validator</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            Test the strength of your passwords and get detailed security analysis
          </p>
          <PasswordValidator
            password={password}
            onLevelChange={setLevel}
            setPassword={setPassword}
          />
        </div>
      </main>
    </div>
  );
};

export default PasswordValidatorPage; 