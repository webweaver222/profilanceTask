import updateAuth from "./updateAuth";
import updateNews from "./updateNews";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action),
    news: updateNews(state, action),
  };
};

export default reducer;
