-- Script para la creación de la estructura de la base de datos 'nodejs_api'

-- Creación de la base de datos si no existe
CREATE DATABASE IF NOT EXISTS nodejs_api;

-- Seleccionar la base de datos para usar
USE nodejs_api;

-- Creación de la tabla 'Users'
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Creación de la tabla 'Products'
CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Fin del script
