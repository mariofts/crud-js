module.exports = function (app) {
	var pagamento = app.controllers.pagamento;
	app.route('/pagamento')
		.get(pagamento.lista)
		.post(pagamento.novo);
	
	app.route('/pagamento/:id')
		.get(pagamento.buscaPorId)
		.put(pagamento.confirma)
		.delete(pagamento.cancela);
	
};