// Prevent right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable key combinations
document.addEventListener('keydown', function (e) {
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.ctrlKey && (
        (e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
        (e.key === 'U' || e.key === 'u')
    )) {
        e.preventDefault();
        return false;
    }
});

// Prevent source view
document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}

// Clear console on open
console.clear();
setInterval(function(){
    console.clear();
}, 1000);

// Disable developer tools
function detectDevTools() {
    // Temporarily disabled for debugging
    /*
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if(widthThreshold || heightThreshold) {
        document.body.innerHTML = 'Developer tools are not allowed on this site.';
    }
    */
}

window.addEventListener('resize', detectDevTools);
// setInterval(detectDevTools, 1000);

// Disable view-source
if(window.location.href.indexOf('view-source:') !== -1) {
    window.location.href = window.location.href.replace('view-source:', '');
}

// Add debugger traps
setInterval(function() {
    debugger;
}, 100);




// Hide source code structure
// setTimeout(() => {
//     const style = document.createElement('style');
//     style.innerHTML = '* { display: none !important; }';
//     document.head.appendChild(style);
//     setTimeout(() => document.head.removeChild(style), 0);
// }, 0); 