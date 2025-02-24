// Authentication Service
const Auth = {
    // Verifica se usuário está autenticado
    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        // Verifica se token expirou
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(tokenData.exp * 1000);
        
        return expirationDate > new Date();
    },

    // Faz login
    async login(email, password) {
        try {
            const response = await API.post('/api/login', { email, password });
            
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                $.fullbar.show({
                    message: 'Login realizado com sucesso!',
                    type: 'success'
                });
                
                Router.navigateTo('#dashboard');
            }
        } catch (error) {
            throw error;
        }
    },

    // Faz logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Router.navigateTo('#login');
    },

    // Obtém dados do usuário
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Atualiza dados do usuário no localStorage
    updateUser(userData) {
        localStorage.setItem('user', JSON.stringify({
            ...this.getUser(),
            ...userData
        }));
    }
};
