const previousButton = document.querySelector<HTMLButtonElement>(
  "button[data-prevbtn]"
);
const nextButton = document.querySelector<HTMLButtonElement>(
  "button[data-nextbtn]"
);
const buttonGroup = document.querySelector<HTMLElement>(".btn-group");

const apiBaseUrl = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";

let currentPage: number;

const getUsers = async (page: number | undefined) => {
  return fetch(`${apiBaseUrl}${page ? `&page=${page}` : ""}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

const getAndPopulateUsers = async (page: number) => {
  const data = await getUsers(page);
  return;
};

const startApp = async () => {
  await getAndPopulateUsers(currentPage);

  if (previousButton) {
    previousButton.disabled = !(currentPage && currentPage > 1);
  }

};

document.addEventListener("DOMContentLoaded", startApp);

buttonGroup?.addEventListener("click", () => {
  if (previousButton)
    previousButton.disabled = !(currentPage && currentPage > 1);
});
