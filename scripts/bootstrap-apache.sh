#!/usr/bin/env bash
# Idempotent Apache bootstrap for a free sslip.io hostname on this droplet IP.
# Does NOT rewrite the live propnetra.devsol.in vhost, ServerName, or SSL paths.
set -euo pipefail

LIVE_DOMAIN="propnetra.devsol.in"
APP_PORT="3000"
SITES_AVAILABLE="/etc/apache2/sites-available"
SITES_ENABLED="/etc/apache2/sites-enabled"

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo -E bash "$0" "$@"
fi

HOST_IP="${1:-}"
if [[ -z "${HOST_IP}" ]]; then
  echo "Usage: bootstrap-apache.sh <droplet-ipv4>" >&2
  exit 1
fi

SSLIP="$(echo "${HOST_IP}" | tr '.' '-').sslip.io"
SSLIP_CONF="propnetra-sslip.conf"
DENY_CONF="000-unknown-deny.conf"

contains_live_domain() {
  local file="$1"
  [[ -f "${file}" ]] && grep -Eq "Server(Name|Alias).*${LIVE_DOMAIN}" "${file}"
}

a2enmod proxy proxy_http headers rewrite ssl >/dev/null

# Never rewrite any vhost that is bound to the live domain.
for conf in "${SITES_AVAILABLE}"/*.conf "${SITES_ENABLED}"/*.conf; do
  [[ -e "${conf}" ]] || continue
  if contains_live_domain "${conf}"; then
    echo "Leaving live vhost untouched: ${conf}"
  fi
done

# New vhost only. Live site is already:
#   ServerName propnetra.devsol.in
#   ProxyPass / http://127.0.0.1:3000/
#   SSLCertificateFile /etc/letsencrypt/live/propnetra.devsol.in/fullchain.pem
# Those files/paths are never opened for write.
cat > "${SITES_AVAILABLE}/${SSLIP_CONF}" <<EOF
# Backup hostname for the same PM2 app (127.0.0.1:${APP_PORT}) as ${LIVE_DOMAIN}.
<VirtualHost *:80>
    ServerAdmin devsol.app@gmail.com
    ServerName ${SSLIP}
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:${APP_PORT}/
    ProxyPassReverse / http://127.0.0.1:${APP_PORT}/
    ErrorLog \${APACHE_LOG_DIR}/propnetra-sslip-error.log
    CustomLog \${APACHE_LOG_DIR}/propnetra-sslip-access.log combined
</VirtualHost>
EOF

a2ensite "${SSLIP_CONF}" >/dev/null

# Default unknown-Host deny, but never replace a live-domain default vhost.
DEFAULT_CANDIDATE="${SITES_ENABLED}/000-default.conf"
if contains_live_domain "${DEFAULT_CANDIDATE}" || contains_live_domain "${SITES_AVAILABLE}/000-default.conf"; then
  echo "000-default.conf serves ${LIVE_DOMAIN}; not replacing it"
else
  cat > "${SITES_AVAILABLE}/${DENY_CONF}" <<'EOF'
# Catch-all: unknown Host headers must not land on another project.
<VirtualHost *:80>
    ServerName _
    <Location />
        Require all denied
    </Location>
</VirtualHost>
EOF
  a2ensite "${DENY_CONF}" >/dev/null || true
  if [[ -f "${SITES_ENABLED}/000-default.conf" ]] && ! contains_live_domain "${SITES_ENABLED}/000-default.conf"; then
    a2dissite 000-default >/dev/null || true
  fi
fi

apache2ctl configtest
systemctl reload apache2

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw deny 3000/tcp >/dev/null || true
  ufw deny 3001/tcp >/dev/null || true
  ufw allow 22/tcp >/dev/null || true
  ufw allow 80/tcp >/dev/null || true
  ufw allow 443/tcp >/dev/null || true
fi

if command -v certbot >/dev/null 2>&1; then
  # Isolated cert name so Let's Encrypt does not expand/rewrite the live domain cert.
  certbot --apache -d "${SSLIP}" --cert-name propnetra-sslip \
    --non-interactive --agree-tos --register-unsafely-without-email --redirect \
    || echo "certbot skipped or failed for ${SSLIP}; HTTP vhost remains"
else
  echo "certbot not installed; sslip.io is HTTP-only until certbot is available"
fi

echo "Apache bootstrap complete. Backup host: https://${SSLIP} (or http://)"
echo "Live domain ${LIVE_DOMAIN} vhost/certs were not rewritten."
