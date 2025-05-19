# mobile-neurahive

How to run the application?

After cloning the directory, make sure you are inside the 'mobile-neurahive' directory of the same name.

```bash
cd mobile-neurahive
```

Folder: '\mobile-neurahive\mobile-neurahive'

Install the application dependencies.

```bash
npm install
```

You need to ensure that Expo CLI is installed globally on your system. To do this, run the following command in the terminal

```bash
npm install -g expo-cli
```

If you are using an older version of Expo, please update to the latest version.

```bash
expo upgrade
```

Copy the env example file and place your local IP:

```bash
cp .env.example .env
```

To get your IP see the sections below:
<details>
<summary>Windows</summary>

Run this:
```bash
ipconfig
```

you will see something like this:

```bash
Configuração de IP do Windows

Adaptador de Rede sem Fio Wi-Fi:

   Sufixo DNS específico de conexão. . . . . . :
   Endereço IPv6 . . . . . . . . . . : 2804:18:d7:ea53:268a:7d20:1657:2f52
   Endereço IPv6 Temporário. . . . . . . . : 2804:18:d7:ea53:d894:cbd1:2b13:9846
   Endereço IPv6 de link local . . . . . . . . : fe80::fb9d:55d3:b895:1ed9%11
   Endereço IPv4. . . . . . . .  . . . . . . . : 192.168.179.78
   Máscara de Sub-rede . . . . . . . . . . . . : 255.255.255.0
   Gateway Padrão. . . . . . . . . . . . . . . : fe80::b830:9bff:fec1:b9ca%11
                                                 192.168.179.97
```
</details>

<details>
<summary>Linux</summary>

Run this:

```bash
ifconfig
```

if you don't have net tools install
```bash
sudo apt install net-tools
```

after run `ìfconfig` you will see something like this:

<!-- TODO: Run this command in linux and paste the result -->
```bash

```
</details>


Finally, to actually run the application, type the command below in the terminal

```bash
npx expo start
```

You can scan the QR Code with Expo Go or open it in the browser, at the address 'localhost:8081'.
