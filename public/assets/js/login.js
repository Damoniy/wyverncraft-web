async function fetchToken(event) {
    event.preventDefault();

    try {
        const username = document.getElementById('loginInput').value;
        const password = document.getElementById('passwordInput').value;
        const response = await fetch('http://localhost:5000/api/v1/wyvern/page/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname: username, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);

            console.log('Token armazenado com sucesso:', token);

            // Aguardar o término do saveImage() antes de redirecionar
            await saveImage();

            // Redirecionar após o término da execução das operações assíncronas
            window.location.href = 'index.html'; // Redirecionamento
        } else {
            console.error('Erro ao obter o token:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function saveImage() {
    const token = localStorage.getItem('authToken');
    const nickname = localStorage.getItem('username');

    try {
        const response = await fetch(`http://localhost:5000/api/v1/wyvern/page/avatar?nickname=${nickname}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const base64String = await response.text(); // Obter diretamente a string base64
            console.log(base64String)
            localStorage.setItem('avatar', base64String);
            console.log('Imagem salva no localStorage.');
        } else {
            console.error('Erro ao salvar imagem:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    try {
        await fetchToken(event);
    } catch (error) {
        console.error('Erro ao processar o formulário:', error);
    }
});
