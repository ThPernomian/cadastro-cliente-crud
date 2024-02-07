/*BOTÕES PARA AS AÇÕES DE CADASTRO, NA JANELA MODAL OS BOTÕES SALVAR E CANCELAR*/
const btnCadastrar = document.querySelector(".btn-cadastrar")
const btnCancelar = document.querySelector(".btn-cancelar")
const btnSalvar = document.querySelector(".btn-salvar")

/*BOTÃO PARA CHAMAR A JANELA MODAL DE CADASTRO DO CLIENTE*/
btnCadastrar.addEventListener("click", ()=>{
    let cadastrar = document.querySelector(".modal-active")

    cadastrar.style.display = "block"

})

/*BOTÃO PARA SALVAR OS DADOS DE CADASTRO DO CLIENTE*/
btnSalvar.addEventListener("click", ()=>{
    cliente.salvar()
    cliente.fecharAposSalvar()
    cliente.limparcampos()

    document.querySelector(".btn-salvar").innerText = "Salvar"
})  

/*BOTÃO PARA CANCELAR A AÇÃO DE CADASTRAR*/
btnCancelar.addEventListener("click", ()=>{

    let cadastrar = document.querySelector(".modal-active")
    cadastrar.style.display = "none"

    /*LIMPA OS CAMPOS DE PREENCHIMENTO APOS CANCELAR/FECHAR A JANELA*/
    cliente.limparcampos()    
})



class Clientes{

    constructor(){
        this.id = 1
        this.arrayClientes = []
        this.idEditar = null
    }

    listarTabela(){
        let dadosClientes = document.getElementById("dadosClientes")
        dadosClientes.innerText = ""

        for(let i = 0; i < this.arrayClientes.length; i++){
            let tr = dadosClientes.insertRow()

            let tdId = tr.insertCell()
            let tdNome = tr.insertCell()
            let tdCelular = tr.insertCell()
            let tdEmail = tr.insertCell()
            let tdCidade = tr.insertCell()
            let tdAcoes = tr.insertCell()

            tdId.innerText = this.arrayClientes[i].id
            tdNome.innerText = this.arrayClientes[i].nome
            tdCelular.innerText = this.arrayClientes[i].celular
            tdEmail.innerText = this.arrayClientes[i].email
            tdCidade.innerText = this.arrayClientes[i].cidade

            let imgEditar = document.createElement("img")
            imgEditar.src = "img/edit.svg"
            imgEditar.setAttribute("onclick", "cliente.editar(" + JSON.stringify(this.arrayClientes[i]) +")")

            let imgDelete = document.createElement("img")  
            imgDelete.src = "img/delete.svg"
            imgDelete.setAttribute("onclick", "cliente.excluir("+ this.arrayClientes[i].id +")")

            imgEditar.classList.add("editarDeletar")
            imgDelete.classList.add("editarDeletar")

            tdAcoes.appendChild(imgEditar)
            tdAcoes.appendChild(imgDelete)

        }
        
    }

    /*MÉTODO PARA SALVAR OS DADOS DO CLIENTE*/
    salvar(){
        let cliente = this.lerDados()
/*SE O CLIENTE ESTIVER COM O ID = NULL SERÁ ADICIONADO UM CLIENTE NOVO, SENÃO: SE O ID EXISTIR ELE ATUALIZA O CADASTRO*/
        if(this.idEditar == null){
            this.adicionar(cliente)
        }else{
            this.atualizar(this.idEditar, cliente)
        }   
        this.listarTabela()
    }

    /*ADICIONA O CLIENTE NO FIM DA LISTA DO ARRAY E SOMA O ID*/
    adicionar(cliente){
        this.arrayClientes.push(cliente)
        this.id++   
    }

    lerDados(){
        let cliente = {}

        cliente.id = this.id
        cliente.nome = document.getElementById("iname").value
        cliente.celular = document.getElementById("icelular").value
        cliente.email = document.getElementById("iemail").value
        cliente.cidade = document.getElementById("icidade").value

        return cliente
    }    

    /*LIXEIRA PARA EXCLUIR: AO CLICAR BUSCA O ITEM POR ID, PERGUNTA SE É O ID QUE DESEJA EXCLUIR E
    PERCORRE O ARRAY PARA EXCLUÍ-LO NO ARRAY E NA TELA*/
    excluir(id){
        if(confirm("Deseja realmente deletar este cliente? " + id)){
        let dadosClientes = document.getElementById("dadosClientes")

        for(let i = 0; i < this.arrayClientes.length; i++){
            if(this.arrayClientes[i].id == id){
                this.arrayClientes.splice(i, 1)
                dadosClientes.deleteRow(i)
            }
        }
    }
     
    }

    /*IMG PARA EDITAR: APÓS SELECIONAR O CLIENTE QUE DESEJA ATUALIZAR ELA PERCORRE TODOS OS DADOS DO CLIENTE E MOSTRA NA TELA,
     APÓS ALTERAR E ATUALIZADO NA TELA E NO ARRAY*/
    atualizar(id, cliente){
        for(let i = 0; i < this.arrayClientes.length; i++){
            if(this.arrayClientes[i].id == id){
                this.arrayClientes[i].nome = cliente.nome
                this.arrayClientes[i].celular = cliente.celular
                this.arrayClientes[i].email = cliente.email
                this.arrayClientes[i].cidade = cliente.cidade
            }
        }
    }

    editar(dados){
        this.idEditar = dados.id

        document.getElementById("iname").value = dados.nome 
        document.getElementById("icelular").value = dados.celular
        document.getElementById("iemail").value = dados.email
        document.getElementById("icidade").value = dados.cidade
        
        let cadastrar = document.querySelector(".modal-active")

        cadastrar.style.display = "block"
    
        document.querySelector("#btnAtualizar").innerText = "Atualizar"
    }

    /*LIMPA OS CAMPOS DE INPUT APÓS SALVAR O CADATRO OU CANCELAR */
    limparcampos(){
        document.getElementById("iname").value = ""
        document.getElementById("icelular").value = ""
        document.getElementById("iemail").value = ""
        document.getElementById("icidade").value = ""

        /*Variavel está aqui para zerar o ID e possibilitar a adição de mais itens */
        this.idEditar = null
    }

    /*FECHAR A JANELA APOS SALVAR O CADASTRO DO CLIENTE */
    fecharAposSalvar(){
        let cadastrar = document.querySelector(".modal-active")

        cadastrar.style.display = "none"

    }
}


let cliente = new Clientes()




