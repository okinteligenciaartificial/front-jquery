// Configuração do Fullbar
$.fullbar.defaults = CONFIG.FULLBAR;

// Inicialização da aplicação
$(document).ready(() => {
    // Configura interceptor para tokens expirados
    $(document).ajaxError((event, jqXHR) => {
        if (jqXHR.status === 401) {
            Auth.logout();
        }
    });

    // Registra rotas
    Router.add('login', {
        async init() {
            const response = await fetch('pages/login.html');
            const html = await response.text();
            $('#main-content').html(html);
            this.addEventListeners();
        },
        addEventListeners() {
            $('#login-form').on('submit', async (e) => {
                e.preventDefault();
                try {
                    await Auth.login(
                        $('#email').val(),
                        $('#password').val()
                    );
                } catch (error) {
                    console.error('Erro no login:', error);
                }
            });
        },
        destroy() {
            $('#login-form').off('submit');
        }
    });

    // Inicializa o router
    Router.init();
});
