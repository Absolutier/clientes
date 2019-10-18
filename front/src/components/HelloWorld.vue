<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Node + Vue</h2>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>E-mail</th>
          <th>Rua</th>
          <th>Bairro</th>
          <th>Estado</th>
          <th>CEP</th>
          <th>Área</th>
          <th>Observação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente">
          <td>{{ cliente.clientenome }}</td>
          <td>{{ cliente.clientetelefone }}</td>
          <td>{{ cliente.clienteemail }}</td>
          <td>{{ cliente.clienterua }}</td>
          <td>{{ cliente.clientebairro }}</td>
          <td>{{ cliente.clienteestado }}</td>
          <td>{{ cliente.clientecep }}</td>
          <td>{{ cliente.clientearea }}</td>
          <td>{{ cliente.clienteobs }}</td>

          <td>
            <a href @click.prevent="remove(cliente.clienteid)">x</a>
            -
            <a href @click.prevent="toUpdate(cliente)">update</a>
            -
            <a href @click.prevent="dados(cliente.clienteid)">Teste</a>
          </td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="save()">
      <input type="text" placeholder="Nome" v-model="toSave.clientenome" />
      <input type="text" placeholder="telefone" v-model="toSave.clientetelefone" />
      <input type="text" placeholder="email" v-model="toSave.clienteemail" />
      <input type="text" placeholder="rua" v-model="toSave.clienterua" />
      <input type="text" placeholder="bairro" v-model="toSave.clientebairro" />
      <input type="text" placeholder="estado" v-model="toSave.clienteestado" />
      <input type="text" placeholder="cep" v-model="toSave.clientecep" />
      <input type="text" placeholder="area" v-model="toSave.clientearea" />
      <input type="text" placeholder="obs" v-model="toSave.clienteobs" />
      <input type="submit" value="+" />
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      clientes: { data: [] },
      toSave: {},
      updateStatus: false
    };
  },
  methods: {
    save() {
      if (this.updateStatus) {
        this.update();
      } else {
        this.create();
      }
    },
    getList() {
      window.axios.get("/api/clientes").then(res => {
        this.clientes = res.data;
      });
    },
    remove(clienteid) {
      window.axios.delete("/api/clientes/" + clienteid).then(() => {
        this.getList();
      });
    },
    create() {
      window.axios.post("/api/clientes/", this.toSave).then(() => {
        this.toSave = {};
        this.getList();
      });
    },
    update() {
      window.axios
        .put("/api/clientes/" + this.toSave.clienteid, this.toSave)
        .then(() => {
          this.toSave = {};
          this.updateStatus = false;
          this.getList();
        });
    },
    toUpdate(clientes) {
      this.updateStatus = clientes.clienteid;
      this.toSave = clientes;
      console.log(clientes.clienteid);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
