
const btnCadastrar = document.querySelector(".btn-cadastrar")
const btnCancelar = document.querySelector(".btn-cancelar")
const btnSalvar = document.querySelector(".btn-salvar")


btnCadastrar.addEventListener("click", ()=>{
    let cadastrar = document.querySelector(".modal-active")

    cadastrar.style.display = "block"

})

btnSalvar.addEventListener("click", ()=>{
    cliente.salvar()
    cliente.fecharAposSalvar()
    cliente.limparcampos()

    document.querySelector(".btn-salvar").innerText = "Salvar"
})  


btnCancelar.addEventListener("click", ()=>{

    let cadastrar = document.querySelector(".modal-active")
    cadastrar.style.display = "none"

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

    salvar(){
        let cliente = this.lerDados()

        
        if(this.idEditar == null){
            this.adicionar(cliente)
        }else{
            this.atualizar(this.idEditar, cliente)
        }
    
        
        this.listarTabela()

        console.log(this.arrayClientes)
    }

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

    /*CAMPO DE AÇÃO */
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
        console.log(dadosClientes)
        
    }

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




