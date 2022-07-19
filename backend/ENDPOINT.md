## Agora vamos direto ao Endpoint (badum tiss 🥁)


``
IMPORTANTE: Verifique o arquivo README.md da pasta ROOT para obter informações de execução do projeto
``


**POST**  este endpoint irá calcular a quantidade de pintura baseada nos dados enviados no `body` da requisição

```
/v1/calculator/buckets
```

**Body variables**

|          Nome | Obrigatório |  Tipo   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `walls` | Sim | number  | `walls` é um array com as medidas das com as medidas das paredes e os números de portas e de janelas, respectivamente.  <br/><br/> `OBS:` Sempre deve conter 4 paredes | 
|     `height` | Sim | number  | O valor `height` de se refere a altura da parede em metros.  <br/><br/>           `OBS 1:` Paredes com `portas` não podem possuir altura menor que 2,20m <br/><br/>           `OBS 2:` Paredes com `portas` ou `janelas` não podem possuir largura e/ou altura menor que os respectivos items | 
|     `width` | Sim | number  | O valor `width` de se refere a largura da parede em metros. <br/><br/>  | 
|     `numberOfDoors` | Não | number  | O valor `numberOfDoors` de se refere ao número de portas, que será utilizado para obter o cálculo da area em m² com o valor correto. <br/><br/> `OBS:` As portas tem medidas padrão de 0,80m x 1,90m | 
|     `numberOfWindows` | Não | number  |O valor `numberOfWindows` de se refere ao número de janelas, que será utilizado para obter o cálculo da area em m² com o valor correto. <br/><br/> `OBS:` As janelas tem medidas padrão de 2,00m x 1,20m | 

**Exemplo Request Body**

```
{
  "walls": [
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 4,
      "numberOfWindows": 4
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 4,
      "numberOfWindows": 0
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 1,
      "numberOfWindows": 2
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 0,
      "numberOfWindows": 0
    }
  ]
}
```

**Exemplo Response**

```
{
  "walls": [
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 4,
      "numberOfWindows": 4
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 4,
      "numberOfWindows": 0
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 1,
      "numberOfWindows": 2
    },
    {
      "height": 2.2,
      "width": 20,
      "numberOfDoors": 0,
      "numberOfWindows": 0
    }
  ]
}
```