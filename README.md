# WeatherApp
WeatherApp é um aplicativo desenvolvido em React Native com o intuito de expor informações sobre o clima de uma região selecionada pelo usuário.
O aplicativo faz parte do processo seletivo de estágio da Trackingtrade.

<img src="/assets/prinsts/listFull.png" height='500px'>
<img src="/assets/prinsts/saved.png" height='500px'>

### APK instalável 
```
/android/app/build/outputs/apk/release
```

# Funcionalidades do App
## Tela Inicial
A tela inicial conta com um cabeçalho contendo o nome do app, um botão para ir a tela de pesquisa e uma lista de regiões salvas. 

A lista de itens exibe o nome que o usuário escolheu quando salvou e logo abaixo o nome da cidade e a data que foi salvo o item. 
Ao deslizar para esquerda aparecerá dois botões, o botão com uma caneta serve para editar o item, ao pressionar aparecerá uma janela com uma caixa de texto para o usuário inserir o novo nome. E o com um lixo, para deletar o item, a confirmação do usuário é requisitada ao selecionado. Para esconder esses botões é preciso deslizar de volta para direita. 

Ao pressionar o item o usuário é levado a tela de clima a qual mostra as informções da região do mesmo.

<img src="/assets/prinsts/main.png" height='500px'>
<img src="/assets/prinsts/swipeable.png" height='500px'>

## Pesquisa
Nesta tela é onde o usuário escolhe a reagião com a qual deseja visualizar as informações sobre o clima e posteriormente salvá-la. A tela possui uma barra de pesquisa no top, logo abaixo uma lista e um mapa interativo de background com um marcador na localização do dispositivo. 

A lista pode conter dois itens, inicialmente só aparece o item "My Location", ao selecionada, a região do usuário é o parâmetro para a requisição de clima. Contudo, pode-se também pesquisar por uma cidade, que automaticamente é marcada no mapa e seu nome adicionado a lista. 

Além disso, também é possível marcar um local desejado no mapa, ao pressionar a área, assim, aparecerá o nome da cidade em questão na lista. Ao pressionar a opção que deseja na lista, o usuário é direcionado a tela de exibição do clima.

<img src="/assets/prinsts/search.png" height='500px'>

## Clima
A tela de clima conta com uma mapa de backgound e um container a qual é exibida as informção sobre tal. O display mostra o nome da cidade, a data e hora do mesmo, a temperatuda atual, máxima e mínima, a sensação térmica e uma breve descrição sobre o clima. Além de um botão no canto inferior "Favorite", a qual o usuário pode pressionar e salvar a localização na lista da tela inicial. 

Ainda no display, o icone mostrado ao lado da temperatura atual muda de acordo com a descrição do clima e o horário, de noite mostrará uma lua e de manhã um sol, por exemplo. Porém a descrição influenciará também, fica a surpresa do usuário descobrir todos os icones possíveis. Já no canto superior direito, tem um botão de opções, inicialmente tem apenas uma opção, a mesma do botão "Favorite", porém, posteriormente mudará quando o usuário vier para esta tela ao selecionar o item salvo na lista da tela inicial. Caso isto aconteca ao opções serão de editar e deletar o item. Potua-se que, além da diferença das opções, o nome que o usuário escolheu quando salvou aparecerá na parte superior central.

<img src="/assets/prinsts/weatherViewWithoutSave.png" height='500px'>
<img src="/assets/prinsts/saved.png" height='500px'>

# Erros e bugs que podem acontecer
 - Na tela de pesquisa, caso o nome da cidade esteja escrito corretamente mas o mapa não marcou, apague a ultima letra e a escreva novamente. O servidor pode não ter encontrado as coordenadas da cidade, com essa ação uma nova requisição é realizada e assim ele achará a coordenada certa.
  - Ainda na tela de pesquisa, quando selecionada a cidade pesquisada, o nome escrito deve ser o mesmo do nome marcado no mapa. Se mesmo com os dois nomes aparentarem estar iguais e o alerta mostrar o erro, faça um marcação pressionando o mapa em uma região perto, assim, o nome será atualizado.
  - Por fim, caso ocorra outro erro não listado um alerta aparecerá e o guiará.
  
 # Conclusão
 No mais, divirtam-se utilizando o app pesquisando o clima das variadas cidades pelo mundo, observando as diferenças de horários e descobrindo os variados icones e tipos de clima que uma cidade pode ter. 
 
 # Extra 
 ###  Projeto de seleção para estágio em desenvolvimento Mobile Trackingtrade
  [Trackingtrade](http://trackingtrade.com.br/)
 ### Plataformas:
  - Android
 ### Framework:
  - React Native
 ### Dispositivos testados:
  - Samsung Galaxy M30
  - Samsung Galaxy M20
  - Samsung Galaxy J8
  - Zenfone 3 max
  - Motorola moto G7 Power
 
 ### Simuladores utilizados:
  - Pixel 2
  - Nexus 5x
 ### API utilizada:
  - [OpenWeatherMap](https://openweathermap.org/api)
