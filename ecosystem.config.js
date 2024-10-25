module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'npm',
        args: 'run dev:frontend',
        watch: true,
      },
      {
        name: 'backend',
        script: 'npm',
        args: 'run dev:backend',
        watch: true,
      },
    ],
  };
  