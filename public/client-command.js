const socket = io();

socket.on('execute-command', (data) => {
  console.log('Command received:', data);

  if (data === 'clear-local-storage') {
    localStorage.clear();
    window.location.reload();
  }

  if (data === 'clear-cookies') {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "")
                         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.reload();
  }

  if (data === 'show-instructions') {
    window.location.href = 'instructions.html';
  }

  if (data === 'reload-page') {
    window.location.reload();
  }
});
