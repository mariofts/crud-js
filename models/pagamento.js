var ultimoId = 1;

module.exports = function(){

	var Pagamento = function (transacao){
	
		this.id = ultimoId++;
		this.status = "CRIADO";
		this.valor = Number(transacao.valor);
		
		this.confirma = function(){
			this.status = "CONFIRMADO";
		};
		
		this.cancela = function(){
			this.status = "CANCELADO";
		};
	
	};

	return Pagamento;
};