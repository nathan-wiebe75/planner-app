# Planner

## Host on sparrow1.local

The Pi serves the built web frontend and FastAPI backend together at
**http://sparrow1.local:8000**. Other devices only need a browser on the same
network. Production API requests use the page's own address, so the hostname
and IP address both work without rebuilding.

### Install and start on the Pi

The built frontend in `frontend/dist` is included in Git. After cloning the
project or pulling the latest changes on the Pi, run:

```bash
cd ~/PlannerApp
git pull
bash deploy/install-pi.sh
```

Adjust the path if you cloned the project elsewhere.

The installer uses sudo to install Python's virtual environment support and a
systemd service. It starts the app and enables it at boot, so it stays available
after you disconnect SSH. No Node.js installation is needed on the Pi.

Open **http://sparrow1.local:8000** on your Mac or phone. Create an assignment
on one device and refresh another to verify both use the Pi's database. If a
device cannot resolve `.local` names, use the Pi's IP with port `8000` instead.

### Updates and troubleshooting

For later updates, run on the Pi:

```bash
cd ~/PlannerApp
git pull
sudo systemctl restart planner
```

If backend requirements change, run `bash deploy/install-pi.sh` again instead
of just restarting.

On the Pi, view logs with `journalctl -u planner -n 50 --no-pager` or stop the
app with `sudo systemctl stop planner`. Stop any manually started backend on
port 8000 before installing the service.

Data lives in `~/PlannerApp/backend/app.db`. Git ignores databases so updates
preserve the Pi's data. To migrate existing data, stop both backends first and
copy the SQLite database you currently use to that path before starting the
Pi service. Mac and Pi backend instances do not synchronize databases.

This setup is for devices on your local network; the app has no authentication.

### Updating the included frontend

After changing frontend source files, rebuild on your Mac before committing:

```bash
cd frontend
npm ci
npm run build
cd ..
git add frontend/src frontend/dist
```

Include all changed frontend source and configuration files and the rebuilt
`frontend/dist` in the same commit, then push it before pulling on the Pi.
The production build uses `frontend/.env.production`; remove any exported
`VITE_API_URL` from your shell before building if you previously set one.

## Local development

Run `python -m uvicorn app.main:app --reload` from `backend` with its requirements
installed in a virtual environment. In a second terminal, run `npm run dev`
from `frontend`. The development API address defaults to `http://127.0.0.1:8000`
and can be overridden using `VITE_API_URL` in `frontend/.env`.
