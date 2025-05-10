
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo ao Sistema</h1>
        <p className="text-xl text-gray-600 mb-8">Faça login ou crie uma conta para começar</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link 
            to="/login" 
            className="bg-auth hover:bg-auth-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Entrar
          </Link>
          <Link 
            to="/register" 
            className="bg-white border-2 border-auth text-auth hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Registrar-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
