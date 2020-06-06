window.addEventListener('load', () => {
  carregueExperienciasProfissionais();
});

const carregueExperienciasProfissionais = () => {
  const nameFile = '../JSON/experiencias.json';
  let tbody = $('tbody');
  let itensTable = '';
  lerArquivo(nameFile, (arquive) => {
    const json = JSON.parse(arquive);
    itensTable = '';
    //prettier-ignore
    let profissional = json.experiencias.filter(x => x.experiencia === 'Profissional');
    //prettier-ignore
    let estudos = json.experiencias.filter(x => x.experiencia === 'Estudos');
    //prettier-ignore
    profissional = profissional.sort((a,b) => b.tipo.localeCompare(a.tipo));
    //prettier-ignore
    estudos = estudos.sort((a,b) => b.tipo.localeCompare(a.tipo));

    json.experiencias = [...profissional, ...estudos];

    json.experiencias.forEach((x) => {
      itensTable += `
        <tr>
          <td scope="col">${x.tipo}</td>
          <td>${x.descricao}</th>          
          <td>${x.experiencia}</td>
        </tr>`;
    });
    //<td>${x.nivel}</td>
    tbody.append(itensTable);
  });
};

// <tr>
//                               <th scope="row">1</th>
//                               <td>Mark</td>
//                               <td>Otto</td>
//                             </tr>

function lerArquivo(arquivo, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', arquivo, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
