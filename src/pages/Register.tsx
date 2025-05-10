
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import FormField from '@/components/FormField';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
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
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
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
          description: "Conta criada com sucesso.",
          duration: 3000,
        });
        
        // Here you would typically register the user and redirect
        console.log('Registration successful with:', formData);
      }, 1500);
    }
  };
  
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Preencha as informações abaixo"
      linkTo="/login"
      linkText="Fazer login"
      linkDescription="Já tem uma conta?"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          id="name"
          label="Nome completo"
          type="text"
          placeholder="Digite seu nome"
          required
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
        />
        
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
          placeholder="Crie uma senha"
          required
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
        />
        
        <FormField
          id="confirmPassword"
          label="Confirmar senha"
          type="password"
          placeholder="Repita sua senha"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
        />
        
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-auth focus:ring-auth"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            Concordo com os <a href="#" className="text-auth hover:text-auth-hover">Termos de Serviço</a> e <a href="#" className="text-auth hover:text-auth-hover">Política de Privacidade</a>
          </label>
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
              <UserPlus size={18} />
              Criar conta
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
