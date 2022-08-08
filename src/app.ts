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

const populateTable = (data, page: number) => {
  const tableBody = document.querySelector<HTMLElement>("tbody[data-sink]");
  const pageView = document.querySelector<HTMLElement>("label[data-pageview]");

  console.log({page});
  

  if (pageView) pageView.innerHTML = `Showing page ${page || 1}`;
};

const getAndPopulateUsers = async (page: number) => {
  const data = await getUsers(page);
  populateTable(data, page);
  return;
};

const goToPage = async (page: number) => {
  currentPage = page;

  await getAndPopulateUsers(page);
};

const handlePreviousPage = () => {
  const previousPageNumber = currentPage > 1 ? currentPage - 1 : 1;

  goToPage(previousPageNumber);
};

const handleNextPage = () => {
  const nextPageNumber = currentPage ? currentPage + 1 : 2;
  goToPage(nextPageNumber);
};

const startApp = async () => {
  await getAndPopulateUsers(currentPage);

  if (previousButton) {
    previousButton.addEventListener("click", handlePreviousPage);
    previousButton.disabled = !(currentPage && currentPage > 1);
  }

  nextButton?.addEventListener("click", handleNextPage);
};

document.addEventListener("DOMContentLoaded", startApp);

buttonGroup?.addEventListener("click", () => {
  if (previousButton)
    previousButton.disabled = !(currentPage && currentPage > 1);
});
