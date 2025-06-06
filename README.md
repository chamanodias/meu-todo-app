
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

- **Qualquer pessoa pode clonar este repositório e rodar o app e o backend localmente**, desde que siga as instruções acima e configure corretamente o arquivo `.env` com uma string de conexão válida do MongoDB Atlas.
- **O backend não fica online automaticamente para o mundo**: ele só estará acessível na sua rede local, a menos que você faça deploy em um serviço de hospedagem (Render, Railway, Heroku, etc).
- **Por segurança, não compartilhe sua string de conexão do MongoDB Atlas publicamente.** Cada usuário deve criar sua própria conta gratuita no MongoDB Atlas e gerar sua própria string de conexão.
- Se quiser que o backend fique acessível de qualquer lugar, faça o deploy em um serviço de nuvem e aponte o `baseURL` do frontend para a URL pública do backend

Utilizamos o MongoDB Atlas, um serviço de banco de dados na nuvem, garantindo segurança, escalabilidade e fácil acesso de qualquer lugar.

## 👨‍💻 Desenvolvedores

| ![Lucas Dias](https://github.com/chamanodias.png?size=80) | ![Lucas Vinícius](https://github.com/Lucavinini.png?size=80) |
|:---------------------------------------------------------:|:------------------------------------------------------------:|
| Lucas Dias <br> [GitHub](https://github.com/chamanodias) <br> [LinkedIn](https://www.linkedin.com/in/lucas-dias-23b75a232/) | Lucas Vinícius <br> [GitHub](https://github.com/Lucavinini) <br> [LinkedIn](https://www.linkedin.com/in/lucasvinini/) |

---

Feito com 💙 por Lucas Dias e Lucas Vinícius


![Imagem do WhatsApp de 2025-06-06 à(s) 19 47 25_4c162cc2](https://github.com/user-attachments/assets/5ace3b0f-e5b7-491b-9c02-47a5b8c93e7b)
![Imagem do WhatsApp de 2025-06-06 à(s) 19 47 25_edee11f4](https://github.com/user-attachments/assets/d3cb01da-6136-485a-b1f7-12fbfc2f2a86)
![Imagem do WhatsApp de 2025-06-06 à(s) 19 47 26_1f3c9f8b](https://github.com/user-attachments/assets/ecbd32d3-aaa0-4f0e-9b33-9dfa2ec78c95)

