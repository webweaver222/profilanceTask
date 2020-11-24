const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
};

const mockUsers = () => {
  const users = [
    { id: 0, login: "admin", password: "admin", role: "admin" },
    {
      id: 1,
      login: "user",
      password: "user",
      role: "user",
    },
    {
      id: 2,
      login: "user2",
      password: "user2",
      role: "user",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
};

const mockNews = () => {
  const news = [
    {
      id: 1,
      title: "Коронавирус побежден!",
      body:
        'Утром 22 ноября в городе Пермь на заборе кто-то написал "Коронавирус побежден" ',
      date: "23 ноября 2020г",
      approved: true,
      user: 0,
    },
  ];

  localStorage.setItem("news", JSON.stringify(news));
};

const getDateString = () =>
  new Date().toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export { compose, mockUsers, mockNews, getDateString };
