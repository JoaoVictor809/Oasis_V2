// services/hooks/useRegister.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth/signup"; 

export async function registerUser({ name, cpf, endereco, email, data_nascimento, password }) {
  try {
    const response = await axios.post(API_URL, {
      name,
      cpf,
      endereco,
      email,
      data_nascimento,
      password
    });

    return response.data;
  } catch (error) {
    console.error("Erro no cadastro:", error.response?.data || error.message);
    throw error;
  }
}
