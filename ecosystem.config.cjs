/** PM2 app for the production build at /home/ubuntu/prop_f. */
module.exports = {
  apps: [
    {
      name: "propnetra-web",
      cwd: "/home/ubuntu/prop_f",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
