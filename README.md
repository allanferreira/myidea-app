# myIdea APP
> Esse repositório faz parte do projeto myIdea.
> Esse é um aplicativo **nativo** e **sem uso de webview** escrito em Javascript
 
### Tecnologias
Requer [Node] versão 8.10.0 ou superior
* [React] - Biblioteca para montar interfaces
* [React Native] - Biblioteca para montar interfaces nativas
* [Expo] - Montador de aplicativos nativos
* [Webpack] - Bundler para EcmaScript
* [Axios]   - Promises baseado em HTTP Client

### Instalação
 myIdea requer [Npm] para instalação das dependências
```sh
$ git clone https://github.com/allanferreira/myidea-app.git
$ cd myidea-app
$ npm i
```
É necessário o [Android Studio], [XCode] e [Expo] para montar as aplicações nativas Android e iOS
```sh
$ npm install -g expo-cli
```
### Servidor
Rode para abrir um servidor de exposição antes de fazer a build para os dispositivos Nativos
```sh
$ expo start
```
### Nativo
Para montar as aplicações
```sh
$ expo build:android
$ expo build:ios
```
### APIs
Esse projeto consome as seguintes APIs:
* [myIdea API] - Backend do myIdea
* [IBM Watson] - Inteligência Artificial

Em /src/services/api.js você encontra o endereço base da API de Backend, caso queira rodar a
API localmente basta rodar o projeto [myIdea API] e editar o valor de baseURL para:
```sh
...
baseURL: 'http://127.0.0.1:8000/api/',
...
```
Ou deixe o valor de IP da máquina em Cloud da Digital Ocean
```sh
...
baseURL: 'http://142.93.158.20/api/',
...
```
[XCode]: <https://developer.apple.com/xcode/>
[Android Studio]: <https://developer.android.com/studio/>
[Expo]: <https://expo.io/>
[Digital Ocean]: <https://www.digitalocean.com/>
[myIdea API]: <https://github.com/allanferreira/myidea-api>
[Node]: <https://nodejs.org/en/>
[Npm]: <https://www.npmjs.com/>
[Axios]: <https://github.com/axios/axios>
[Webpack]: <https://webpack.js.org/>
[React]: <https://reactjs.org/>
[React Native]: <https://facebook.github.io/react-native/>
[IBM Watson]: <https://www.ibm.com/watson/br-pt/>
[Laravel]: <https://laravel.com/>