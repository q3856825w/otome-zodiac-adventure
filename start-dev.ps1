$env:Path = "C:\Users\client\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;" + $env:Path
Set-Location "C:\Users\client\Documents\Codex\2026-06-25\new-chat"
& "C:\Users\client\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd" dev -- --host 127.0.0.1 --port 5173
