import News from "../components/News";
import { updateList } from "./funcs";

const initialNews = {
  list: [],
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
      return {
        ...news,
        title: initialNews.title,
        body: initialNews.body,
        list: updateList(list, action.payload.newNews),
      };
    }

    case "CHANGE_NEWS": {
      return {
        ...news,
        list: action.payload.newNewsList,
      };
    }

    case "CHANGE_POST_INPUT": {
      return {
        ...news,
        [action.payload.name]: action.payload.value,
      };
    }

    case "LOAD_NEWS": {
      return {
        ...news,
        list: action.payload.storedNews,
      };
    }

    default:
      return news;
  }
};

export default updateNews;
