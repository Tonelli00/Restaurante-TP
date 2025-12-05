const personalbtn = document.getElementById('btn_personal');
const userbtn = document.getElementById('btn_user');

personalbtn.addEventListener('click',(event)=>
    {
        event.preventDefault();
        window.location.href='admin.html';
    });
userbtn.addEventListener('click',(event)=>
    {
        event.preventDefault();
        window.location.href='home.html';
    });    