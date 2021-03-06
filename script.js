const divRoot = document.getElementById('root');
const btnAddProduct = document.getElementById('btnAddProduct');
const btnCalculate = document.createElement('button');
const divContainer = document.querySelector('div.container');
var numProd = 1;

btnCalculate.id = 'btnCalculate';
btnCalculate.innerHTML = 'Calcular';

function createProductForm() {
  var html = document.createElement('div');
  html.className = 'form-produto'
  html.innerHTML = `
    <h2>Produto ${numProd}</h2>

    <div>
      <label for='bcProduto${numProd}'>Base de cálculo do produto ${numProd}</label>
      <input id='bcProduto${numProd}'/>
    </div>
    <div>
      <label for='aliquota${numProd}'>Alíquota interna do produto ${numProd}</label>
      <input id='aliquota${numProd}'/>
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
  if (numProd === 1) {
    divRoot.innerHTML = '';
    divContainer.appendChild(btnCalculate);
    btnAddProduct.innerHTML = 'Adicionar produto'
  }
  divRoot.appendChild(createProductForm());
}

btnCalculate.onclick = () => {
  btnAddProduct.innerHTML = 'Calcular novos produtos';
  var opcaoCalculo = document.getElementById('radioCliente').checked ? "cliente" : "fornecedor";

  var bcProdutosTotal = 0;
  var baseICMSTotal = 0;
  var valorICMSTotal = 0;
  var ICMSProprioTotal = 0;
  var valorARecolherTotal = 0;

  var baseICMS = 0;
  var valorICMS = 0;
  var ICMSProprio = 0;
  var valorARecolher = 0;

  for (let i = 1; i < numProd; i++) {
    let bcProduto = Number.parseFloat(
      document.getElementById(`bcProduto${i}`)
      .value
      .replace(',', '.')
    );
    let aliquota = Number.parseFloat(
      document.getElementById(`aliquota${i}`)
      .value
      .replace(',', '.')
    );
    let mva = Number.parseFloat(
      document.getElementById(`mva${i}`)
      .value
      .replace(',', '.')
    );

    baseICMS = bcProduto * (1 + (mva/100));
    valorICMS = baseICMS * (aliquota/100);

    if (opcaoCalculo === 'cliente') {
      ICMSProprio = bcProduto * (aliquota/100);
      valorARecolher = valorICMS - ICMSProprio;
    } else if (opcaoCalculo === 'fornecedor') {
      valorARecolher = bcProduto * (aliquota/100);
      ICMSProprio = valorICMS - valorARecolher;
    }

    bcProdutosTotal += bcProduto;
    baseICMSTotal += baseICMS;
    valorICMSTotal += valorICMS;
    ICMSProprioTotal += ICMSProprio;
    valorARecolherTotal += valorARecolher
  }

  numProd = 1;

  divRoot.innerHTML = `
    <ul class="result">
      <li>
        <span>Base de cálculo ICMS:</span>
        <span>${bcProdutosTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Base de cálculo ICMS-ST:</span>
        <span>${baseICMSTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS:</span>
        <span>${valorICMSTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS Próprio:</span>
        <span>${ICMSProprioTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
      <li>
        <span>Valor ICMS a recolher do ${opcaoCalculo}:</span>
        <span>${valorARecolherTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
    </ul>
  `;
}
