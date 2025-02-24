// Login Page Component
const LoginPage = {
    render() {
        return `
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h3 class="text-center mb-4">Login</h3>
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">
                                Verificar Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
    },

    afterRender() {
        // Handle form submission
        $('#loginForm').on('submit', async function(e) {
            e.preventDefault();
            const email = $('#email').val();

            try {
                const response = await API.post('/api/verify-email', { email });
                
                if (response.success === 1) {
                    $.fullbar.success('Email verificado com sucesso!');
                    // Redirect to dashboard or next step
                    Router.navigate('/dashboard');
                } else {
                    $.fullbar.error(response.error || 'Email não encontrado');
                }
            } catch (error) {
                $.fullbar.error('Erro ao verificar email');
            }
        });
    }
};
