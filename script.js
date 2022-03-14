const divRoot = document.getElementById('root');
var numProd = 1;

function createProductForm() {
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

function addProductForm() {
  if (numProd === 1) divRoot.innerHTML = '';
  divRoot.appendChild(createProductForm());
}

function calculate() {
  var icmsARecolher = 0;
  var icmsST = 0;
  var valorTotalProdutos = 0;

  for (let i = 1; i < numProd; i++) {
    let valueProduct = document.getElementById(`valueProduct${i}`).value;
    let aliqInt = document.getElementById(`aliqInt${i}`).value;
    let mva = document.getElementById(`mva${i}`).value;

    valueProduct = Number.parseFloat(valueProduct.replace(',', '.'));
    aliqInt = Number.parseFloat(aliqInt.replace(',', '.'));
    mva = Number.parseFloat(mva.replace(',', '.'));

    valorTotalProdutos += valueProduct;
    icmsARecolher += valueProduct * (aliqInt / 100);
    icmsST += (valueProduct + (valueProduct * (mva / 100))) * (aliqInt / 100);
  }

  var icmsProprio = icmsST - icmsARecolher;

  numProd = 1;

  divRoot.innerHTML = `
    <ul>
      <li>
        <span>Valor total dos produtos:</span>
        <span>${valorTotalProdutos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS-ST:</span>
        <span>${icmsST.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS Próprio:</span>
        <span>${icmsProprio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS a recolher:</span>
        <span>${icmsARecolher.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
    </ul>
  `;
}
