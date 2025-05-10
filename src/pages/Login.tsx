
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import FormField from '@/components/FormField';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Sucesso!",
          description: "Login realizado com sucesso.",
          duration: 3000,
        });
        
        // Here you would typically store auth token and redirect user
        console.log('Login successful with:', formData);
      }, 1500);
    }
  };
  
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta para continuar"
      linkTo="/register"
      linkText="Criar conta"
      linkDescription="Ainda não tem uma conta?"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          required
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
        />
        
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          required
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
        />
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-auth focus:ring-auth"
            />
            <label htmlFor="remember" className="ml-2 text-gray-700">
              Lembrar-me
            </label>
          </div>
          
          <Link to="/forgot-password" className="text-auth hover:text-auth-hover font-medium">
            Esqueceu a senha?
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-auth hover:bg-auth-hover text-white py-2 px-4 rounded-md transition-colors font-medium"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={18} />
              Entrar
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
