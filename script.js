const form = document.getElementById("formularioCadastro");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    // Validação mais robusta
    if (validarFormulario(dados)) {
        registrarUsuario(dados);
    }
});

function validarFormulario(dados) {
    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return false;
    }

    if (!validarEmail(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    return true;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function registrarUsuario(dados) {
    // Adiciona metadados
    const usuarioCompleto = {
        ...dados,
        dataRegistro: new Date().toISOString(),
        id: gerarIdUnico()
    };

    // Salva no localStorage
    const registros = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    registros.push(usuarioCompleto);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(registros));

    // Feedback visual
    alert(`Obrigada ${dados.nome}, seu cadastro foi realizado com sucesso!`);
    form.reset();

    console.log('Usuário registrado:', usuarioCompleto);
}

function gerarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Para testar: visualizarRegistros() no console