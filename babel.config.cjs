module.exports = {
    presets: [
      ['@babel/preset-env', {modules: 'cjs', targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  };