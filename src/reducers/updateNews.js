import News from "../components/News";
import { updateList } from "./funcs";

const initialNews = {
  list: [
    {
      id: 1,
      title: "Коронавирус побежден!",
      body:
        'Утром 22 ноября в городе Пермь на заборе кто-то написал "Коронавирус побежден" ',
      date: "23 ноября 2020г",
      approved: true,
      user: 0,
    },
  ],

  title: "",
  body: "",
  searchTerm: "",
};

const updateNews = (state, action) => {
  if (typeof state === "undefined") {
    return initialNews;
  }

  const {
    news,
    news: { list },
  } = state;

  switch (action.type) {
    case "ADD_NEWS": {
      const newItem = {
        id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
        title: news.title,
        body: news.body,
        approved: false,
        date: new Date(),
        user: "",
      };

      console.log(updateList(list, newItem));

      return {
        ...news,
        title: initialNews.title,
        body: initialNews.body,
        list: updateList(list, newItem),
      };
    }

    case "APPROVE_NEWS": {
      const idx = list.findIndex((item) => item.id === action.payload.id);

      const newItem = {
        ...list[idx],
        approved: true,
      };

      return {
        ...news,
        list: updateList(list, newItem, idx),
      };
    }

    case "DELETE_NEWS": {
      const idx = list.findIndex((item) => item.id === action.payload.id);

      return {
        ...news,
        list: updateList(list, "remove", idx),
      };
    }

    case "CHANGE_POST_INPUT": {
      return {
        ...news,
        [action.payload.name]: action.payload.value,
      };
    }

    default:
      return news;
  }
};

export default updateNews;
