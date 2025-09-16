'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simuler un appel API (à connecter plus tard)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simule 2s de chargement
    console.log('Connexion avec:', { email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 relative overflow-hidden">
      {/* Animation de fond */}
      <div className="absolute inset-0 z-0">
        <div className="animate-float absolute w-20 h-20 bg-blue-100 rounded-full opacity-50 top-10 left-20"></div>
        <div className="animate-float-delayed absolute w-32 h-32 bg-blue-200 rounded-full opacity-50 bottom-20 right-20"></div>
        <div className="animate-float absolute w-16 h-16 bg-blue-300 rounded-full opacity-50 top-40 right-40"></div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Connexion à Promotic_RH</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              placeholder="Entrez votre email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Pas de compte ?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Inscrivez-vous
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou
        </p>
        <button
          className="mt-2 w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center"
          onClick={() => console.log('Connexion avec Google')}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.854L12.545,10.239z"
            />
          </svg>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
