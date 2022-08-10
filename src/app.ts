type User = {
  age: string;
  gender: string;
  id: string;
  row: string;
};

type FetchedData = {
  [key: string]: User[];
};

const previousButton = document.querySelector<HTMLButtonElement>(
  "button[data-prevbtn]"
);
const nextButton = document.querySelector<HTMLButtonElement>(
  "button[data-nextbtn]"
);
const buttonGroup = document.querySelector<HTMLElement>(".btn-group");
const errorSection = document.querySelector<HTMLElement>(".error");
const canShowLoading = document.querySelectorAll(".hasLoader");

const apiBaseUrl = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
const url = new URL(window.location.href);
let currentPage = Number(url.searchParams.get("page"));
let fetchedPageNumber: number, fetchedData: FetchedData;

if (!currentPage || isNaN(currentPage)) {
  url.searchParams.delete("page");
  window.history.pushState({}, "", url);
}

const setLoading = (isLoading: boolean) => {
  if (isLoading) {
    for (const element of canShowLoading) {
      element.classList.add("loading");
    }
  } else {
    for (const element of canShowLoading) {
      element.classList.remove("loading");
    }
  }
};

const getUsers = async (page?: number) => {
  setLoading(true);

  return fetch(`${apiBaseUrl}${page ? `&page=${page}` : ""}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
};

const populateTable = (users: User[], page: number) => {
  const tableBody =
    document.querySelector<HTMLTableSectionElement>("tbody[data-sink]");
  const pageView = document.querySelector<HTMLElement>("label[data-pageview]");

  const columns = ["row", "gender", "age"];

  if (tableBody) {
    for (let i = 0; i < tableBody.rows.length; i++) {
      tableBody.rows[i].dataset.entryid = users[i].id;

      for (let j = 0; j < tableBody.rows[i].cells.length; j++) {
        const field = columns[j];

        tableBody.rows[i].cells[j].innerHTML = users[i][field];
      }
    }
  }

  if (pageView) pageView.innerHTML = `Showing Page ${page || 1}`;
};

const getAndPopulateUsers = async (page: number) => {
  errorSection?.classList.remove("show");
  const data = await getUsers(page);

  if (data?.error) {
    errorSection?.classList.add("show");
    return;
  }

  fetchedPageNumber = +data?.info?.page;
  fetchedData = data?.results?.[0];

  const users: User[] = fetchedData[page || 1];

  populateTable(users, page);
};

const goToPage = async (direction: "next" | "previous" = "next") => {
  let page: number = currentPage;

  if (direction === "previous") page = currentPage > 1 ? currentPage - 1 : 1;
  if (direction === "next") page = currentPage ? currentPage + 1 : 2;

  if (page) {
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url);
    currentPage = page;

    if (direction === "next" && page === fetchedPageNumber + 1) {
      populateTable(fetchedData[page], page);
      return;
    }

    if (direction === "previous" && page === fetchedPageNumber) {
      populateTable(fetchedData[page], page);
      return;
    }

    await getAndPopulateUsers(page);
  }
};

const startApp = async () => {
  await getAndPopulateUsers(currentPage);

  if (previousButton) {
    previousButton.addEventListener("click", () => goToPage("previous"));
    previousButton.disabled = !(currentPage && currentPage > 1);
  }

  nextButton?.addEventListener("click", () => goToPage("next"));

  buttonGroup?.addEventListener("click", () => {
    if (previousButton)
      previousButton.disabled = !(currentPage && currentPage > 1);
  });
};

document.addEventListener("DOMContentLoaded", startApp);
