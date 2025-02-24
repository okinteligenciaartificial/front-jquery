// API Service
const API = {
    // Configuração padrão para requisições
    defaultOptions: {
        headers: {
            'Content-Type': 'application/json'
        }
    },

    // Adiciona token de autenticação se existir
    getHeaders() {
        const headers = { ...this.defaultOptions.headers };
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    // GET request
    async get(endpoint) {
        try {
            $.fullbar.show('Carregando...');
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders()
            });
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    },

    // POST request
    async post(endpoint, data) {
        try {
            $.fullbar.show('Processando...');
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    },

    // PUT request
    async put(endpoint, data) {
        try {
            $.fullbar.show('Atualizando...');
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    },

    // DELETE request
    async delete(endpoint) {
        try {
            $.fullbar.show('Excluindo...');
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    },

    // Trata resposta da API
    async handleResponse(response) {
        $.fullbar.hide();
        
        const data = await response.json();
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Erro ao processar requisição'
            };
        }
        
        return data;
    },

    // Trata erros
    handleError(error) {
        $.fullbar.hide();
        
        if (error.status === 401) {
            // Token expirado ou inválido
            Auth.logout();
            Router.navigateTo('#login');
            $.fullbar.show({
                message: 'Sessão expirada. Por favor, faça login novamente.',
                type: 'error'
            });
        } else {
            $.fullbar.show({
                message: error.message || 'Erro ao processar requisição',
                type: 'error'
            });
        }
        
        throw error;
    }
};
