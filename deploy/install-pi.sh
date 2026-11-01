#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$(uname -s)" != Linux ]] || ! command -v systemctl >/dev/null; then
    echo "Run this script on the Pi with Raspberry Pi OS."
    exit 1
fi
if [[ "$EUID" -eq 0 ]]; then
    echo "Run as your normal Pi user, without sudo. The script requests sudo when needed."
    exit 1
fi
if [[ ! -f "$project_dir/frontend/dist/index.html" ]]; then
    echo "Build the frontend on your Mac and copy frontend/dist to the Pi first."
    exit 1
fi
# Keep paths safe to embed in a systemd unit.
if [[ ! "$project_dir" =~ ^/[a-zA-Z0-9_./-]+$ ]]; then
    echo "Place the project in a path without spaces or special characters."
    exit 1
fi

sudo apt-get update
sudo apt-get install -y python3-venv
python3 -m venv "$project_dir/backend/.venv"
"$project_dir/backend/.venv/bin/python" -m pip install -r "$project_dir/backend/requirements.txt"

unit_file="$(mktemp)"
trap 'rm -f "$unit_file"' EXIT
cat > "$unit_file" <<EOF
[Unit]
Description=Planner frontend and API
After=network.target

[Service]
User=$(id -un)
WorkingDirectory=$project_dir/backend
ExecStart=$project_dir/backend/.venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo install -m 644 "$unit_file" /etc/systemd/system/planner.service
sudo systemctl daemon-reload
sudo systemctl enable planner.service
sudo systemctl restart planner.service
sudo systemctl --no-pager status planner.service
echo "Open http://sparrow1.local:8000 on a device on the same network."
