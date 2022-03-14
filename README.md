# Calculadora de ICMS-ST
 Script utilizado para calcular ICMS-ST de notas fiscais
 Nesta versão, considera-se o seguinte cenário:
 * Uma indústria optante pelo regime tributário Simples Nacional, onde não é possível realizar o pagamento do ICMS
 * Um varejo (lucro real ou presumido) que deve fazer a regularização do ICMS e precisa efetuar a cobrança da diferença do mesmo ao fornecedor (indústria)

 O cálculo se dá da seguinte forma:
 * ICMS-ST = (Valor total do produto + MVA original (%)) X Alíquota interna
 * ICMS a cobrar da indústria = Valor total do produto X Alíquota interna
 * ICMS Próprio = ICMS-ST - ICMS a cobrar
