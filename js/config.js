const CONFIG = {
    // URL base do backend
    API_URL: 'https://wf.srv-89.okconnect.com.br',
    
    // Tempo de expiração do token em minutos
    TOKEN_EXPIRATION: 60,
    
    // Configurações do Fullbar
    FULLBAR: {
        position: 'top',
        duration: 3000,
        theme: 'dark'
    },
    
    // Rotas que não precisam de autenticação
    PUBLIC_ROUTES: [
        'login',
        'register',
        'forgot-password',
        'reset-password'
    ]
};
