# Sanain

A word guessing game in Finnish.

## Development

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Word list

The words used in the game are a subset of [KOTUS](https://kaino.kotus.fi/sanat/nykysuomi/). The xml list itself is not included in this repository. The derivative word list is released in this repository under LGPL.

The script `./scripts/wordlist.sh` can be used to read a content xml in the project root and generate a json list of words of the length 5.
