
- Instale as dependências do backend:

```bash
cd backend
npm install
```

- Inicie o backend:

```bash
npx ts-node-dev src/index.ts
```

### 4. Rode o app mobile

- Volte para a raiz do projeto e rode:

```bash
npx expo start
```

- Escaneie o QR code com o app Expo Go no seu celular.

> **Importante:** O backend e o app devem estar rodando ao mesmo tempo.  
> Certifique-se de que o IP do backend em `services/api.ts` corresponde ao IP da sua máquina na rede.

## 💡 Dificuldades enfrentadas

- Integração entre app mobile e backend rodando localmente
- Configuração do MongoDB Atlas e string de conexão segura
- Tratamento de autenticação JWT e persistência do token no AsyncStorage
- Ajuste de permissões de rede para acesso via celular real

## 🗄️ Banco de dados

Utilizamos o MongoDB Atlas, um serviço de banco de dados na nuvem, garantindo segurança, escalabilidade e fácil acesso de qualquer lugar.

## 👨‍💻 Desenvolvedores

| ![Lucas Dias](https://github.com/chamanodias.png?size=80) | ![Lucas Vinícius](https://github.com/Lucavinini.png?size=80) |
|:---------------------------------------------------------:|:------------------------------------------------------------:|
| Lucas Dias <br> [GitHub](https://github.com/chamanodias) <br> [LinkedIn](https://www.linkedin.com/in/lucas-dias-23b75a232/) | Lucas Vinícius <br> [GitHub](https://github.com/Lucavinini) <br> [LinkedIn](https://www.linkedin.com/in/lucasvinini/) |

---

Feito com 💙 por Lucas Dias e Lucas Vinícius
