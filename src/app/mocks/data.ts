export const DATE = new Date(2012, 3, 21);
export const TEST_LOREM_CARD = {
  title: "Angular",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  creationDate: DATE,
  duration: 150,
  authors: ["Dave Haisenverg", "Tony Ja"]
};

export interface CardData {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}
