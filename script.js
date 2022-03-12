const divRoot = document.getElementById('root');
var numProd = 1;

function createProduct() {
  var html = document.createElement('div');
  html.innerHTML = `
    <h2>Produto ${numProd}</h2>

    <div>
      <label for='valueProduct${numProd}'>Valor do produto ${numProd}</label>
      <input id='valueProduct${numProd}'/>
    </div>
    <div>
      <label for='aliqInt${numProd}'>Alíquota interna do produto ${numProd}</label>
      <input id='aliqInt${numProd}'/>
    </div>
    <div>
      <label for='mva${numProd}'>MVA do produto ${numProd}</label>
      <input id='mva${numProd}'/>
    </div>
  `;

  numProd++;

  return html;
}

function addProduct() {
}
