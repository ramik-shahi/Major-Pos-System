import { Title } from "@angular/platform-browser";

export interface Cardchild {
  title: string;
  image: string;
}

export interface Order {
  order: string;
  cards: Cardchild[];
}
