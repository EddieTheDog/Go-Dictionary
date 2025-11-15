if (typeof io !== 'undefined') {
    const socket = io();

    // Listen for admin commands
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

        // Example: trigger a custom function
        if (data === 'trigger-custom') {
            alert('Custom function triggered!');
        }
    });

    // Listen for announcements
    socket.on('show-announcement', (message) => {
        alert(`📢 Announcement: ${message}`);
    });
} else {
    console.error('Socket.io not loaded. Admin commands will not work.');
}
