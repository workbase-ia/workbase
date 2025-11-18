
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { readJSON, writeJSON } from '../lib/helper.js'; 

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const DB_PATH = path.resolve('data/db.json');
const PERFIL_DB_PATH = path.resolve('data/usuarios.json');


export const register = async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    
    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

   
    let db = readJSON(DB_PATH); 
    let perfisdb = readJSON(PERFIL_DB_PATH);
    
 
    if (!db || !db.users) {
      db = { users: [] };
    }

    if (!perfisdb) {
      perfisdb = [];
    }

    const existingUser = db.users.find(user => user.email === email);
    const perfilExistente = perfisdb.find(perfil => perfil.email === email);
    if (existingUser || perfilExistente) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newId = Date.now();

    const newUser = {
      id: newId.toString(),
      nome,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    const newPerfilUser = {
      Id: newId,
      nome: nome,
      email: email,
      area: "",
      foto: "",
      cargo: "",
      resumo: "",
      localizacao: "",
      habilidadesTecnicas: [],
      softSkills: [],
      experiencias: [],
      formacao: [],
      projetos: [],
      certificacoes: [],
      idiomas: [],
      arealnteresses: [] 
    };
    
    db.users.push(newUser);
    perfisdb.push(newPerfilUser);
    
    writeJSON(DB_PATH, db);
    writeJSON(PERFIL_DB_PATH, perfisdb);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '100h',
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};

/**
 * Autentica um usuário existente
 * Rota: POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

   
    const db = readJSON(DB_PATH); 
    if (!db || !db.users) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
};