import express from 'express';
export default express().get('/', (_, res) => res.status(200).json({ message: 'Hello, Nina!' }));