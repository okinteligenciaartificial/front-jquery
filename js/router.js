// Router para Single Page Application
const Router = {
    routes: {},
    currentPage: null,

    init() {
        // Intercepta cliques em links para usar navegação SPA
        $(document).on('click', 'a[href^="#"]', this.handleClick.bind(this));
        
        // Lida com navegação pelo histórico do navegador
        window.addEventListener('popstate', this.handlePopState.bind(this));
        
        // Carrega página inicial ou restaura da URL
        this.navigateTo(window.location.hash || '#dashboard');
    },

    // Adiciona uma rota
    add(path, controller) {
        this.routes[path] = controller;
    },

    // Lida com cliques em links
    handleClick(e) {
        e.preventDefault();
        const href = $(e.currentTarget).attr('href');
        this.navigateTo(href);
        history.pushState(null, '', href);
    },

    // Lida com navegação pelo histórico
    handlePopState() {
        this.navigateTo(window.location.hash);
    },

    // Navega para uma rota
    async navigateTo(path) {
        // Remove o # do início
        path = path.replace('#', '');
        
        // Se não houver rota, vai para dashboard
        if (!path) path = 'dashboard';
        
        // Verifica se usuário está autenticado
        if (!Auth.isAuthenticated() && !CONFIG.PUBLIC_ROUTES.includes(path)) {
            this.navigateTo('#login');
            return;
        }

        // Encontra e executa o controller
        const controller = this.routes[path];
        if (controller) {
            // Remove página atual
            if (this.currentPage) {
                this.currentPage.destroy();
            }

            // Carrega nova página
            this.currentPage = controller;
            await controller.init();
        } else {
            console.error(`Rota não encontrada: ${path}`);
            this.navigateTo('#dashboard');
        }
    }
};
