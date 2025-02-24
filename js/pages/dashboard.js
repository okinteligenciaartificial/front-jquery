// Dashboard Page Component
const DashboardPage = {
    render() {
        return `
        <div class="row">
            <div class="col-12">
                <h2 class="mb-4">Dashboard</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Status do Email</h5>
                        <p class="card-text" id="emailStatus">
                            <i class="fas fa-check-circle text-success"></i> Email verificado
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Ações</h5>
                        <button class="btn btn-primary" id="btnVerifyAgain">
                            Verificar Novamente
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    },

    afterRender() {
        // Handle verify again button
        $('#btnVerifyAgain').on('click', function() {
            Router.navigate('/login');
        });
    }
};
