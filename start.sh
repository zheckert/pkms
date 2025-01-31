# #!/bin/bash

# Open a new iTerm2 tab and start the backend server
osascript <<EOF
tell application "iTerm2"
  create window with default profile
  tell current session of current window
    write text "cd $(pwd)/pkms-api && rails server"
  end tell
end tell
EOF

# Open another iTerm2 tab and start the frontend server
osascript <<EOF
tell application "iTerm2"
  tell current window
    create tab with default profile
    tell current session
      write text "cd $(pwd)/pkms-frontend && npm run dev"
    end tell
  end tell
end tell
EOF

echo "Frontend and backend servers started in separate iTerm2 tabs!"
