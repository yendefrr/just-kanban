# Vue kanban board based on PrimeVue
I can't find a normal board so I made one. All improvments are welcome.

Now you can create cards and columns, drag and drop it.
PrimeVue there cause I am lazy.

## Installation
`npm install just-kanban`

`pnpm install just-kanban`

`yarn add just-kanban`

## Usage
```JavaScript
import Board from "yendefrr/just-kanban"

let editMode = false;
let columns = ["To Do", "In Progress", "Done"];
let cards = [
  {
    id: 1,
    title: "Card 1",
    description: "Description of Card 1",
  },
];

<Board v-model:modelValue="editMode" :cards="cards" :columns="columns"></Board>
```
In `editMode = true`, you can drag columns.

## License
[MIT](https://choosealicense.com/licenses/mit/)
