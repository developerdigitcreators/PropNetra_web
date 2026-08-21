#!/usr/bin/env bash
# Replace the production build in /home/ubuntu/prop_f and reload the PM2
# process that already serves it. Never touches other project directories.
set -euo pipefail

APP_DIR="/home/ubuntu/prop_f"
cd "${APP_DIR}"

if [[ "${APP_DIR}" != "/home/ubuntu/prop_f" ]]; then
  echo "Refusing unexpected APP_DIR=${APP_DIR}" >&2
  exit 1
fi

if [[ ! -f "${APP_DIR}/package.json" || ! -d "${APP_DIR}/.next" ]]; then
  echo "Production build missing in ${APP_DIR}" >&2
  exit 1
fi

npm ci --omit=dev --legacy-peer-deps

PM_ID="$(
  node -e '
    const { execSync } = require("child_process");
    const apps = JSON.parse(execSync("pm2 jlist", { encoding: "utf8" }) || "[]");
    const cwd = "/home/ubuntu/prop_f";
    const hit = apps.find((app) => {
      const dir = String((app.pm2_env && app.pm2_env.pm_cwd) || "").replace(/\/$/, "");
      return dir === cwd;
    });
    if (hit && hit.pm_id !== undefined && hit.pm_id !== null) {
      process.stdout.write(String(hit.pm_id));
    }
  '
)"

if [[ -n "${PM_ID}" ]]; then
  echo "Restarting existing PM2 process id ${PM_ID} for ${APP_DIR}"
  pm2 restart "${PM_ID}" --update-env
else
  echo "No PM2 process for ${APP_DIR}; starting ecosystem.config.cjs"
  pm2 start "${APP_DIR}/ecosystem.config.cjs"
fi

pm2 save
echo "Deploy complete for ${APP_DIR}"
