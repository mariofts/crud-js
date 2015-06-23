
module.exports = function (app) {
	var Pagamento = app.models.pagamento;
	
	var repositorio = {}; // Sim, isso pode ser um mapa... :P
	var pgto = new Pagamento({valor : 10.0});
	repositorio[pgto.id] = pgto;
	
	var PagamentoController = {};
	
	PagamentoController.lista = function (req,res) {
		var keys = Object.keys(repositorio);
		var values = keys.map(function(v) {return repositorio[v];});		
		res.json(values);
	};
	
	PagamentoController.buscaPorId = function (req,res) {
		var id = req.params.id;
		if(repositorio[id]){
			res.json(repositorio[id]);
		}else{
			res.status(404).send("Not found.");
		}
	};
	
	PagamentoController.novo = function (req, res) {
		var transacao = req.body;
		var pgto = new Pagamento(transacao);
		repositorio[pgto.id] = pgto;
		
		res.location('/pagamento/'+pgto.id);
		res.status(201).json(pgto);
		// res.status(204).end();
	};
	
	PagamentoController.confirma = function (req,res) {
		var id = req.params.id;
		var pgto = repositorio[id];
		pgto.confirma();
		res.json(pgto);
	};
	
	PagamentoController.cancela = function (req,res) {
		var id = req.params.id;
		var pgto = repositorio[id];
		pgto.cancela();
		res.json(pgto);
	};
	
	return PagamentoController;
};