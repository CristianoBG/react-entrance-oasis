
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  linkDescription: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
  linkDescription
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        
        {children}
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {linkDescription}{" "}
            <Link to={linkTo} className="text-auth hover:text-auth-hover font-medium">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
